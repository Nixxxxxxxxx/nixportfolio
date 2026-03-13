import Image from "next/image";

import { FadeIn } from "@/components/animations/fade-in";
import type { CaseStudyData } from "@/content/cases";

import styles from "./case-study-page.module.css";

const tagToneClassNames = {
  warning: styles.tagWarning,
  positive: styles.tagPositive,
  lavender: styles.tagLavender,
  pink: styles.tagPink,
  teal: styles.tagTeal,
  red: styles.tagRed
} as const;

const browserVariantClassNames = {
  hero: styles.heroBrowser,
  before: styles.beforeBrowser,
  after: styles.afterBrowser
} as const;

const browserImageTransformClassNames = {
  hero: "",
  before: styles.beforeImageTransform,
  after: styles.afterImageTransform
} as const;

type BrowserShotProps = {
  browserAddress: string;
  showBrowserChrome?: boolean;
  src: string;
  alt: string;
  viewportAspectRatio?: string;
  fit?: "cover" | "contain";
  position?: string;
  background?: string;
  disableTransform?: boolean;
  priority?: boolean;
  className?: string;
  sizes: string;
  variant: keyof typeof browserVariantClassNames;
};

type SectionHeaderProps = {
  id: string;
  title: string;
  description: string;
};

type ResultSummaryProps = {
  id: string;
  results: CaseStudyData["results"];
};

function BrowserShot({
  browserAddress,
  showBrowserChrome = true,
  src,
  alt,
  viewportAspectRatio,
  fit = "cover",
  position = "left top",
  background,
  disableTransform = false,
  priority = false,
  className,
  sizes,
  variant
}: BrowserShotProps) {
  return (
    <div
      className={[
        styles.browserShot,
        browserVariantClassNames[variant],
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showBrowserChrome ? (
        <div className={styles.browserChrome}>
          <div className={styles.browserControls} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className={styles.browserAddress}>{browserAddress}</div>
        </div>
      ) : null}
      <div
        className={styles.browserViewport}
        style={{
          ...(background ? { background } : {}),
          ...(viewportAspectRatio ? { aspectRatio: viewportAspectRatio } : {})
        }}
      >
        <Image
          className={[
            styles.browserImage,
            disableTransform
              ? ""
              : browserImageTransformClassNames[variant]
          ]
            .filter(Boolean)
            .join(" ")}
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{
            objectFit: fit,
            objectPosition: position
          }}
        />
      </div>
    </div>
  );
}

function SectionHeader({ id, title, description }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <h2 id={id} className={styles.sectionTitle}>
        {title}
      </h2>
      <p className={styles.sectionDescription}>{description}</p>
    </div>
  );
}

function ResultSummary({ id, results }: ResultSummaryProps) {
  return (
    <div className={styles.resultSummary}>
      <FadeIn>
        <div className={styles.resultIntro}>
          <h2 id={id} className={styles.sectionTitle}>
            {results.title}
          </h2>
          <div className={styles.metrics}>
            {results.metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <p className={styles.metricLabel}>{metric.label}</p>
                <div className={styles.metricValueRow}>
                  <p className={styles.metricValue}>{metric.value}</p>
                  <span className={styles.metricArrow} aria-hidden="true">
                    ↑
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <div className={styles.resultDivider} aria-hidden="true" />

      <div className={styles.resultColumns}>
        <FadeIn className={styles.resultColumn} delay={0.08}>
          <h3 className={styles.subsectionTitle}>Что сработало?</h3>
          <div className={styles.resultTextStack}>
            {results.worked.map((item) => (
              <p key={item} className={styles.resultParagraph}>
                {item}
              </p>
            ))}
          </div>
        </FadeIn>
        <FadeIn className={styles.resultColumn} delay={0.14}>
          <h3 className={styles.subsectionTitle}>Что не сработало?</h3>
          <div className={styles.resultTextStack}>
            {results.didntWork.map((item) => (
              <p key={item} className={styles.resultParagraph}>
                {item}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

type CaseStudyPageProps = {
  study: CaseStudyData;
};

export function CaseStudyPage({ study }: CaseStudyPageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.canvas}>
        <header className={styles.intro} aria-label="Вводный блок кейса">
          <FadeIn className={styles.introTitle}>
            <p>{study.intro.title}</p>
          </FadeIn>

          <FadeIn className={styles.logoWrap} delay={0.08}>
            <Image
              className={styles.logo}
              src={study.assets.logo.src}
              alt={study.assets.logo.alt}
              width={study.assets.logo.width ?? 451}
              height={study.assets.logo.height ?? 165}
            />
          </FadeIn>

          <FadeIn className={styles.introSummary} delay={0.14}>
            <p>{study.intro.summary}</p>
          </FadeIn>
        </header>

        <section className={styles.heroSection} aria-label="Главный экран кейса">
          <FadeIn className={styles.heroVisual}>
            <div className={styles.heroBackdrop} aria-hidden="true" />
            <BrowserShot
              browserAddress={study.browserAddress}
              showBrowserChrome={study.showBrowserChrome}
              src={study.assets.hero.src}
              alt={study.assets.hero.alt}
              viewportAspectRatio={study.assets.hero.viewportAspectRatio}
              fit={study.assets.hero.fit}
              position={study.assets.hero.position}
              background={study.assets.hero.background}
              disableTransform={study.assets.hero.disableTransform}
              priority
              sizes="(max-width: 1100px) 100vw, 60vw"
              className={styles.heroShot}
              variant="hero"
            />
          </FadeIn>

          <div className={styles.overviewGrid}>
            {study.overview.map((item, index) => (
              <FadeIn
                key={item.title}
                className={styles.overviewCard}
                delay={0.06 * (index + 1)}
              >
                <h2 className={styles.cardTitle}>{item.title}</h2>
                {"body" in item ? (
                  <p className={styles.cardText}>{item.body}</p>
                ) : (
                  <div className={styles.cardMetrics}>
                    {item.metrics.map((metric) => (
                      <div key={metric.label} className={styles.cardMetric}>
                        <p className={styles.cardMetricLabel}>{metric.label}</p>
                        <p className={styles.cardMetricValue}>{metric.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </section>

        <section
          className={`${styles.contentSection} ${styles.resultsSection}`}
          aria-labelledby="results-title"
        >
          <ResultSummary id="results-title" results={study.results} />

          <div className={styles.comparisonBlock}>
            <FadeIn>
              <p className={styles.comparisonLabel}>
                {study.comparisonLabel ?? "До — после"}
              </p>
            </FadeIn>
            <div
              className={[
                styles.comparisonGrid,
                study.comparisonLayout === "portrait"
                  ? styles.comparisonGridPortrait
                  : ""
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <FadeIn delay={0.08}>
                <div className={styles.comparisonCell}>
                  <BrowserShot
                    browserAddress={study.browserAddress}
                    showBrowserChrome={study.showBrowserChrome}
                    src={study.assets.before.src}
                    alt={study.assets.before.alt}
                    viewportAspectRatio={study.assets.before.viewportAspectRatio}
                    fit={study.assets.before.fit}
                    position={study.assets.before.position}
                    background={study.assets.before.background}
                    disableTransform={study.assets.before.disableTransform}
                    sizes="(max-width: 1100px) 100vw, 48vw"
                    variant="before"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.14}>
                <div className={styles.comparisonCell}>
                  <BrowserShot
                    browserAddress={study.browserAddress}
                    showBrowserChrome={study.showBrowserChrome}
                    src={study.assets.after.src}
                    alt={study.assets.after.alt}
                    viewportAspectRatio={study.assets.after.viewportAspectRatio}
                    fit={study.assets.after.fit}
                    position={study.assets.after.position}
                    background={study.assets.after.background}
                    disableTransform={study.assets.after.disableTransform}
                    sizes="(max-width: 1100px) 100vw, 48vw"
                    variant="after"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section
          className={`${styles.contentSection} ${styles.standardSection}`}
          aria-labelledby="insights-title"
        >
          <FadeIn>
            <SectionHeader
              id="insights-title"
              title={study.insights.title}
              description={study.insights.description}
            />
          </FadeIn>
          <div className={`${styles.twoColumnGrid} ${styles.insightsGrid}`}>
            {study.insights.items.map((item, index) => (
              <FadeIn
                key={`${item.title}-${index}`}
                className={styles.storyCard}
                delay={0.08 * (index + 1)}
              >
                <div className={styles.storyHeader}>
                  <h3 className={styles.storyTitle}>{item.title}</h3>
                  <p className={styles.storyText}>{item.description}</p>
                </div>
                <div className={styles.storyDivider} aria-hidden="true" />
                <div
                  className={`${styles.quoteGroup} ${
                    item.quotes.length > 1
                      ? styles.quoteGroupCompact
                      : styles.quoteGroupWide
                  }`}
                >
                  {item.quotes.map((quote) => (
                    <p key={quote.text} className={styles.quoteLine}>
                      <span className={styles.quoteAccent}>{quote.accent}</span>{" "}
                      <span className={styles.quoteText}>{quote.text}</span>
                    </p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section
          className={`${styles.contentSection} ${styles.standardSection}`}
          aria-labelledby="hypotheses-title"
        >
          <FadeIn>
            <SectionHeader
              id="hypotheses-title"
              title={study.hypotheses.title}
              description={study.hypotheses.description}
            />
          </FadeIn>
          <div className={`${styles.twoColumnGrid} ${styles.hypothesesGrid}`}>
            {study.hypotheses.items.map((item, index) => (
              <FadeIn
                key={item.title}
                className={styles.storyCard}
                delay={0.08 * (index + 1)}
              >
                <div className={styles.storyHeader}>
                  <h3 className={styles.storyTitle}>{item.title}</h3>
                  <p className={styles.storyText}>{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {study.showTaskFlow === false ? null : (
          <section className={styles.flowSection} aria-labelledby="task-flow-title">
            <FadeIn className={styles.flowHeader}>
              <h2 id="task-flow-title" className={styles.sectionTitle}>
                Task Flow
              </h2>
            </FadeIn>
            <FadeIn className={styles.flowFrame} delay={0.08}>
              <div className={styles.flowScroller}>
                <Image
                  src={study.assets.taskFlow.src}
                  alt={study.assets.taskFlow.alt}
                  width={study.assets.taskFlow.width ?? 1800}
                  height={study.assets.taskFlow.height ?? 1218}
                  className={styles.flowImage}
                  sizes="(max-width: 900px) 1800px, 100vw"
                />
              </div>
            </FadeIn>
          </section>
        )}

        <section
          className={`${styles.contentSection} ${styles.standardSection} ${styles.processSection}`}
          aria-labelledby="process-title"
        >
          <FadeIn>
            <SectionHeader
              id="process-title"
              title={study.process.title}
              description={study.process.description}
            />
          </FadeIn>

          <div className={styles.processGrid}>
            {study.process.stages.map((stage, index) => (
              <FadeIn
                key={stage.label}
                className={styles.processCard}
                delay={0.05 * (index + 1)}
              >
                <span
                  className={`${styles.tag} ${tagToneClassNames[stage.tone]}`}
                >
                  {stage.label}
                </span>
                <ul className={styles.bulletList}>
                  {stage.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </section>

        <section
          className={`${styles.contentSection} ${styles.standardSection} ${styles.finalResultsSection}`}
          aria-labelledby="final-results-title"
        >
          <ResultSummary id="final-results-title" results={study.results} />
        </section>
      </div>
    </main>
  );
}
