"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import { BottomMenuDock } from "@/components/site/bottom-menu-dock";
import { caseStudies } from "@/content/cases";
import type { CaseMetric, CaseOverviewItem, CaseStudyData } from "@/content/cases/types";
import { profile } from "@/content/profile";

import styles from "./page.module.css";

const HOME_ENTRY_MIN_DELAY_MS = 280;
const HOME_ENTRY_MEDIA_FALLBACK_MS = 1600;
const HERO_LOOP_START_OFFSET_S = 0.05;
const HERO_LOOP_GUARD_S = 0.08;
const HOME_CASE_METRIC_LIMIT = 2;
const HOME_CASE_SNAP_TOP_OFFSET_PX = 112;
const HOME_CASE_SNAP_TOLERANCE_PX = 32;
const HOME_CASE_SNAP_LOCK_MS = 760;
const HOME_CASE_SNAP_REDUCED_LOCK_MS = 120;
const HOME_CASE_WHEEL_IDLE_MS = 220;

type HomeCaseSlide = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  metrics: readonly CaseMetric[];
  browserAddress: string;
  before: CaseStudyData["assets"]["before"];
  after: CaseStudyData["assets"]["after"];
};

function getOverviewMetrics(item: CaseOverviewItem): item is Extract<CaseOverviewItem, { metrics: readonly CaseMetric[] }> {
  return "metrics" in item;
}

function getHomeCaseMetrics(study: CaseStudyData) {
  const overviewMetricsItem = study.overview.find(getOverviewMetrics);

  return (overviewMetricsItem?.metrics ?? study.results.metrics).slice(0, HOME_CASE_METRIC_LIMIT);
}

const homeCaseSlides: readonly HomeCaseSlide[] = caseStudies.map((study) => ({
  slug: study.slug,
  href: `/cases/${study.slug}`,
  title: study.indexCard.title,
  summary: study.indexCard.summary,
  metrics: getHomeCaseMetrics(study),
  browserAddress: study.browserAddress,
  before: study.homepagePreview?.before ?? study.assets.before,
  after: study.homepagePreview?.after ?? study.assets.after
}));

function HomeCasePreview({
  address,
  asset,
  priority = false
}: {
  address: string;
  asset: HomeCaseSlide["before"];
  priority?: boolean;
}) {
  return (
    <div className={styles.previewCard}>
      <div className={styles.previewChrome}>
        <div className={styles.previewControls} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.previewAddress}>{address}</div>
      </div>

      <div
        className={styles.previewViewport}
        style={
          asset.background || asset.viewportAspectRatio
            ? {
                background:
                  asset.background ?? (asset.viewportAspectRatio ? "#f5f5f5" : undefined)
              }
            : undefined
        }
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 525px"
          className={styles.previewImage}
          style={{
            objectFit: asset.fit ?? (asset.viewportAspectRatio ? "contain" : "cover"),
            objectPosition: asset.position ?? "center top"
          }}
        />
      </div>
    </div>
  );
}

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const casesSectionRef = useRef<HTMLElement | null>(null);
  const caseRowRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const caseCursorRef = useRef<HTMLSpanElement | null>(null);
  const cursorPositionRef = useRef({ x: 0, y: 0 });
  const cursorFrameRef = useRef(0);
  const snapLockTimeoutRef = useRef<number | null>(null);
  const wheelGestureTimeoutRef = useRef<number | null>(null);
  const snapLockRef = useRef(false);
  const wheelGestureLockRef = useRef(false);
  const activeCaseIndexRef = useRef(0);

  const [entryReady, setEntryReady] = useState(false);
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [isDesktopCases, setIsDesktopCases] = useState(false);
  const [hasPointerCursor, setHasPointerCursor] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  const hideCaseCursor = useCallback(() => {
    setIsCursorVisible(false);
  }, []);

  const queueCursorPosition = useCallback((clientX: number, clientY: number) => {
    cursorPositionRef.current = { x: clientX, y: clientY };

    if (cursorFrameRef.current) {
      return;
    }

    cursorFrameRef.current = window.requestAnimationFrame(() => {
      cursorFrameRef.current = 0;

      if (!caseCursorRef.current) {
        return;
      }

      caseCursorRef.current.style.left = `${cursorPositionRef.current.x}px`;
      caseCursorRef.current.style.top = `${cursorPositionRef.current.y}px`;
    });
  }, []);

  const clearSnapLock = useCallback(() => {
    snapLockRef.current = false;

    if (snapLockTimeoutRef.current) {
      window.clearTimeout(snapLockTimeoutRef.current);
      snapLockTimeoutRef.current = null;
    }
  }, []);

  const clearWheelGestureLock = useCallback(() => {
    wheelGestureLockRef.current = false;

    if (wheelGestureTimeoutRef.current) {
      window.clearTimeout(wheelGestureTimeoutRef.current);
      wheelGestureTimeoutRef.current = null;
    }
  }, []);

  const keepWheelGestureLocked = useCallback(() => {
    wheelGestureLockRef.current = true;

    if (wheelGestureTimeoutRef.current) {
      window.clearTimeout(wheelGestureTimeoutRef.current);
    }

    wheelGestureTimeoutRef.current = window.setTimeout(() => {
      wheelGestureLockRef.current = false;
      wheelGestureTimeoutRef.current = null;
    }, HOME_CASE_WHEEL_IDLE_MS);
  }, []);

  const getClosestCaseIndex = useCallback(() => {
    if (!caseRowRefs.current.length) {
      return null;
    }

    let nextIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    caseRowRefs.current.forEach((row, index) => {
      if (!row) {
        return;
      }

      const distance = Math.abs(
        row.getBoundingClientRect().top - HOME_CASE_SNAP_TOP_OFFSET_PX
      );

      if (distance < minDistance) {
        minDistance = distance;
        nextIndex = index;
      }
    });

    return nextIndex;
  }, []);

  const scrollToCaseIndex = useCallback(
    (index: number) => {
      const row = caseRowRefs.current[index];

      if (!row) {
        return;
      }

      hideCaseCursor();
      clearSnapLock();

      snapLockRef.current = true;
      activeCaseIndexRef.current = index;
      setActiveCaseIndex(index);

      row.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });

      snapLockTimeoutRef.current = window.setTimeout(() => {
        snapLockRef.current = false;
        snapLockTimeoutRef.current = null;
      }, reduceMotion ? HOME_CASE_SNAP_REDUCED_LOCK_MS : HOME_CASE_SNAP_LOCK_MS);
    },
    [clearSnapLock, hideCaseCursor, reduceMotion]
  );

  useEffect(() => {
    if (reduceMotion) {
      setEntryReady(true);
      return undefined;
    }

    let isCancelled = false;
    let minDelayPassed = false;
    let mediaReady = false;

    const revealIfReady = () => {
      if (!isCancelled && minDelayPassed && mediaReady) {
        setEntryReady(true);
      }
    };

    const markMediaReady = () => {
      mediaReady = true;
      revealIfReady();
    };

    const minDelayTimer = window.setTimeout(() => {
      minDelayPassed = true;
      revealIfReady();
    }, HOME_ENTRY_MIN_DELAY_MS);

    const fallbackTimer = window.setTimeout(() => {
      markMediaReady();
    }, HOME_ENTRY_MEDIA_FALLBACK_MS);

    const video = videoRef.current;

    if (video) {
      if (video.readyState >= 2) {
        markMediaReady();
      }

      video.addEventListener("loadeddata", markMediaReady);
      video.addEventListener("canplay", markMediaReady);
    } else {
      markMediaReady();
    }

    return () => {
      isCancelled = true;
      window.clearTimeout(minDelayTimer);
      window.clearTimeout(fallbackTimer);

      if (video) {
        video.removeEventListener("loadeddata", markMediaReady);
        video.removeEventListener("canplay", markMediaReady);
      }
    };
  }, [reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    let isSeekingLoop = false;

    const seekToLoopStart = () => {
      if (isSeekingLoop) {
        return;
      }

      isSeekingLoop = true;
      video.currentTime = HERO_LOOP_START_OFFSET_S;
      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Ignore autoplay restrictions; video may need explicit user gesture.
        });
      }

      window.requestAnimationFrame(() => {
        isSeekingLoop = false;
      });
    };

    const handleLoadedMetadata = () => {
      if (video.currentTime < HERO_LOOP_START_OFFSET_S) {
        video.currentTime = HERO_LOOP_START_OFFSET_S;
      }
    };

    const handleTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) {
        return;
      }

      if (video.currentTime >= video.duration - HERO_LOOP_GUARD_S) {
        seekToLoopStart();
      }
    };

    const handleEnded = () => {
      seekToLoopStart();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 769px)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const syncMedia = () => {
      setIsDesktopCases(desktopQuery.matches);
      setHasPointerCursor(pointerQuery.matches);
    };

    syncMedia();

    desktopQuery.addEventListener("change", syncMedia);
    pointerQuery.addEventListener("change", syncMedia);

    return () => {
      desktopQuery.removeEventListener("change", syncMedia);
      pointerQuery.removeEventListener("change", syncMedia);
    };
  }, []);

  useEffect(() => {
    activeCaseIndexRef.current = activeCaseIndex;
  }, [activeCaseIndex]);

  useEffect(() => {
    if (!isDesktopCases) {
      setActiveCaseIndex(0);
      return undefined;
    }

    let rafId = 0;

    const updateCaseIndex = () => {
      rafId = 0;
      if (snapLockRef.current) {
        return;
      }

      const nextIndex = getClosestCaseIndex();

      if (nextIndex === null) {
        return;
      }

      setActiveCaseIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex
      );
    };

    const requestUpdate = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(updateCaseIndex);
    };

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [getClosestCaseIndex, isDesktopCases]);

  useEffect(() => {
    hideCaseCursor();
  }, [activeCaseIndex, hideCaseCursor]);

  const entryClassNames = (stageClassName: string) =>
    [styles.entryItem, stageClassName, entryReady ? styles.entryReady : ""]
      .filter(Boolean)
      .join(" ");

  const revealDelayClassName = entryClassNames(styles.entryCases);

  useEffect(() => {
    if (!isDesktopCases || !hasPointerCursor) {
      clearSnapLock();
      clearWheelGestureLock();
      return undefined;
    }

    const handleWheel = (event: WheelEvent) => {
      const section = casesSectionRef.current;

      if (!section || !caseRowRefs.current.length) {
        return;
      }

      const sectionBounds = section.getBoundingClientRect();
      const isAnchorInsideSection =
        sectionBounds.top <= HOME_CASE_SNAP_TOP_OFFSET_PX &&
        sectionBounds.bottom >= HOME_CASE_SNAP_TOP_OFFSET_PX;

      if (!isAnchorInsideSection) {
        return;
      }

      const currentIndex = activeCaseIndexRef.current;
      const currentRow = caseRowRefs.current[currentIndex];

      if (!currentRow) {
        return;
      }

      const direction = Math.sign(event.deltaY);

      if (!direction) {
        return;
      }

      const nextIndex = currentIndex + (direction > 0 ? 1 : -1);
      const hasSnapTarget =
        nextIndex >= 0 && nextIndex < caseRowRefs.current.length;

      if (wheelGestureLockRef.current || snapLockRef.current) {
        if (hasSnapTarget) {
          event.preventDefault();
          keepWheelGestureLocked();
        }
        return;
      }

      if (!hasSnapTarget) {
        clearWheelGestureLock();
        return;
      }

      const currentBounds = currentRow.getBoundingClientRect();
      const isCurrentRowAligned =
        Math.abs(currentBounds.top - HOME_CASE_SNAP_TOP_OFFSET_PX) <=
        HOME_CASE_SNAP_TOLERANCE_PX;

      if (!isCurrentRowAligned) {
        return;
      }

      keepWheelGestureLocked();

      event.preventDefault();
      scrollToCaseIndex(nextIndex);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [
    clearSnapLock,
    clearWheelGestureLock,
    hasPointerCursor,
    isDesktopCases,
    keepWheelGestureLocked,
    scrollToCaseIndex
  ]);

  useEffect(() => {
    if (!hasPointerCursor) {
      return undefined;
    }

    const handleScroll = () => {
      hideCaseCursor();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasPointerCursor, hideCaseCursor]);

  useEffect(() => {
    return () => {
      if (cursorFrameRef.current) {
        window.cancelAnimationFrame(cursorFrameRef.current);
      }

      clearSnapLock();
      clearWheelGestureLock();
    };
  }, [clearSnapLock, clearWheelGestureLock]);

  const handleDotClick = (index: number) => {
    scrollToCaseIndex(index);
  };

  const handleCasePointerMove = (
    index: number,
    event: ReactMouseEvent<HTMLAnchorElement>
  ) => {
    if (!hasPointerCursor || snapLockRef.current) {
      hideCaseCursor();
      return;
    }

    if (index !== activeCaseIndexRef.current) {
      hideCaseCursor();
      return;
    }

    queueCursorPosition(event.clientX, event.clientY);

    if (!isCursorVisible) {
      setIsCursorVisible(true);
    }
  };

  return (
    <main id="top" className={styles.page}>
      <div className={styles.canvas}>
        <section className={styles.hero} aria-labelledby="homepage-title">
          <h1 id="homepage-title" className={styles.visuallyHidden}>
            Главная страница Виталия Унаняна
          </h1>

          <div className={entryClassNames(styles.heroVideoStage)}>
            <div className={styles.videoShell} aria-hidden="true">
              <video
                ref={videoRef}
                className={styles.video}
                src="/videos/home/hero.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
              />
            </div>
          </div>

          <div className={entryClassNames(styles.heroIdentity)}>
            <div className={styles.identity}>
              <p className={styles.name}>{profile.name}</p>
              <p className={styles.role}>{profile.subtitle}</p>
            </div>
          </div>
        </section>

        <BottomMenuDock
          placement="top"
          className={entryClassNames(styles.homeDock)}
        />

        <section
          ref={casesSectionRef}
          id="cases"
          className={`${styles.casesSection} ${revealDelayClassName}`}
          aria-labelledby="homepage-cases-title"
        >
          <h2 id="homepage-cases-title" className={styles.visuallyHidden}>
            Кейсы
          </h2>

          <div className={styles.desktopCaseFlow}>
            <div className={styles.desktopCaseRows}>
              {homeCaseSlides.map((slide, index) => (
                <Link
                  key={slide.slug}
                  href={slide.href}
                  ref={(node) => {
                    caseRowRefs.current[index] = node;
                  }}
                  className={[
                    styles.desktopCaseLink,
                    styles.desktopCaseRowLink,
                    hasPointerCursor && index === activeCaseIndex
                      ? styles.desktopCaseLinkCursor
                      : ""
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-label={`${slide.title}. ${slide.summary}`}
                  onMouseEnter={(event) => handleCasePointerMove(index, event)}
                  onMouseMove={(event) => handleCasePointerMove(index, event)}
                  onMouseLeave={hideCaseCursor}
                >
                  <article className={styles.desktopCaseSlide}>
                    <div className={styles.caseNarrative}>
                      <div className={styles.caseIntro}>
                        <p className={styles.caseKicker}>{slide.title}</p>
                        <p className={styles.caseSummary}>{slide.summary}</p>
                      </div>

                      <div className={styles.caseMetrics}>
                        {slide.metrics.map((metric) => (
                          <div key={metric.label} className={styles.caseMetric}>
                            <p className={styles.caseMetricLabel}>{metric.label}</p>
                            <p className={styles.caseMetricValue}>{metric.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.casePreviewGrid}>
                      <HomeCasePreview
                        address={slide.browserAddress}
                        asset={slide.before}
                        priority={index === 0}
                      />
                      <HomeCasePreview
                        address={slide.browserAddress}
                        asset={slide.after}
                        priority={index === 0}
                      />
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div
              className={styles.desktopCaseDotsRail}
              onMouseEnter={hideCaseCursor}
            >
              <div className={styles.caseDots} aria-label="Навигация по кейсам">
                {homeCaseSlides.map((slide, index) => (
                  <button
                    key={slide.slug}
                    type="button"
                    className={[
                      styles.caseDot,
                      index === activeCaseIndex ? styles.caseDotActive : ""
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-label={`Показать кейс ${index + 1}`}
                    aria-pressed={index === activeCaseIndex}
                    onClick={() => handleDotClick(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {hasPointerCursor ? (
            <span
              ref={caseCursorRef}
              className={[
                styles.caseCursorChip,
                isCursorVisible ? styles.caseCursorChipVisible : ""
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden="true"
            >
              Посмотреть кейсы
            </span>
          ) : null}

          <div className={styles.mobileCaseStack}>
            {homeCaseSlides.map((slide, index) => (
              <Link
                key={slide.slug}
                href={slide.href}
                className={styles.mobileCaseCard}
                aria-label={`${slide.title}. ${slide.summary}`}
              >
                <div className={styles.mobileCaseText}>
                  <p className={styles.caseKicker}>{slide.title}</p>
                  <p className={styles.mobileCaseSummary}>{slide.summary}</p>
                </div>

                <div className={styles.mobileMetricGrid}>
                  {slide.metrics.map((metric) => (
                    <div key={metric.label} className={styles.mobileMetric}>
                      <p className={styles.mobileMetricLabel}>{metric.label}</p>
                      <p className={styles.mobileMetricValue}>{metric.value}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.mobilePreviewGrid}>
                  <HomeCasePreview
                    address={slide.browserAddress}
                    asset={slide.before}
                    priority={index === 0}
                  />
                  <HomeCasePreview
                    address={slide.browserAddress}
                    asset={slide.after}
                    priority={false}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
