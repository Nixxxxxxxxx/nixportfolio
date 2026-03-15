"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

import styles from "./site-menu.module.css";

type MenuPlacement = "above" | "below";
type MenuAlign = "center" | "end";

type SiteMenuProps = {
  placement?: MenuPlacement;
  align?: MenuAlign;
  className?: string;
};

type MenuCard = {
  href: string;
  title: string;
  imageSrc: string;
};

type MenuPanelStyle = Pick<CSSProperties, "top" | "left" | "right">;
type FloatingButtonStyle = Pick<CSSProperties, "top" | "left" | "width" | "height">;

const menuCards: readonly MenuCard[] = [
  {
    href: "/cases",
    title: "Кейсы",
    imageSrc: "/images/home/menu/cases.png"
  },
  {
    href: "/about",
    title: "Обо мне",
    imageSrc: "/images/home/menu/about.png"
  },
  {
    href: "/resume",
    title: "Резюме",
    imageSrc: "/images/home/menu/resume.png"
  }
];

const alignClassNames = {
  center: {
    above: styles.panelAboveCenter,
    below: styles.panelBelowCenter
  },
  end: {
    above: styles.panelAboveEnd,
    below: styles.panelBelowEnd
  }
} as const;

function CloseIcon() {
  return (
    <svg
      className={styles.menuCloseIcon}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuCardPreview({ imageSrc }: Pick<MenuCard, "imageSrc">) {
  return (
    <div className={styles.menuCardVisual}>
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="168px"
        className={styles.menuCardArt}
      />
    </div>
  );
}

export function SiteMenu({
  placement = "above",
  align = "center",
  className
}: SiteMenuProps) {
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<MenuPanelStyle>({});
  const [floatingButtonStyle, setFloatingButtonStyle] = useState<FloatingButtonStyle>({});
  const menuId = useId();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      setFloatingButtonStyle({
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`
      });

      const top = placement === "above" ? rect.top - 32 : rect.bottom + 24;

      if (align === "center") {
        setPanelStyle({
          top: `${top}px`,
          left: `${rect.left + rect.width / 2}px`,
          right: "auto"
        });
        return;
      }

      setPanelStyle({
        top: `${top}px`,
        left: "auto",
        right: `${Math.max(window.innerWidth - rect.right, 20)}px`
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [align, isOpen, placement]);

  const portalContent =
    isMounted
      ? createPortal(
          <>
            {isOpen ? (
              <button
                type="button"
                className={[
                  styles.menuButton,
                  styles.menuButtonActive,
                  styles.menuButtonFloating
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={floatingButtonStyle}
                aria-expanded={isOpen}
                aria-controls={menuId}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.menuIconWrap} aria-hidden="true">
                  <CloseIcon />
                </span>
                <span className={styles.menuLabel}>Закрыть</span>
              </button>
            ) : null}

            <div
              className={[
                styles.overlay,
                isOpen ? styles.overlayOpen : ""
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <button
                type="button"
                className={styles.scrim}
                aria-label="Закрыть меню"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => setIsOpen(false)}
              />
            </div>

            <nav
              id={menuId}
              aria-hidden={!isOpen}
              className={[
                styles.panel,
                alignClassNames[align][placement],
                isOpen ? styles.panelOpen : ""
              ]
                .filter(Boolean)
                .join(" ")}
              style={panelStyle}
              aria-label="Раскрытое меню сайта"
            >
              {menuCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className={styles.menuCard}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => setIsOpen(false)}
                >
                  <MenuCardPreview imageSrc={card.imageSrc} />
                  <div className={styles.menuCardText}>
                    <p className={styles.menuCardLabel}>{card.title}</p>
                  </div>
                </Link>
              ))}
            </nav>
          </>,
          document.body
        )
      : null;

  return (
    <div
      className={[
        styles.root,
        isOpen ? styles.rootOpen : "",
        className ?? ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        ref={buttonRef}
        type="button"
        className={[
          styles.menuButton,
          isOpen ? styles.menuButtonHidden : ""
        ]
          .filter(Boolean)
          .join(" ")}
        aria-expanded={isOpen}
        aria-controls={menuId}
        tabIndex={isOpen ? -1 : undefined}
        aria-hidden={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className={styles.menuIconWrap} aria-hidden="true">
          {isOpen ? (
            <CloseIcon />
          ) : (
            <Image
              className={styles.menuIcon}
              src="/images/home/menu-icon.png"
              alt=""
              width={32}
              height={26}
              priority
            />
          )}
        </span>
        <span className={styles.menuLabel}>{isOpen ? "Закрыть" : "Меню"}</span>
      </button>

      {portalContent}
    </div>
  );
}
