"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";

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

const placementClassNames = {
  above: styles.panelAbove,
  below: styles.panelBelow
} as const;

const alignClassNames = {
  center: styles.panelAlignCenter,
  end: styles.panelAlignEnd
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
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

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
          placementClassNames[placement],
          alignClassNames[align],
          isOpen ? styles.panelOpen : ""
        ]
          .filter(Boolean)
          .join(" ")}
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

      <button
        type="button"
        className={[
          styles.menuButton,
          isOpen ? styles.menuButtonActive : ""
        ]
          .filter(Boolean)
          .join(" ")}
        aria-expanded={isOpen}
        aria-controls={menuId}
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
    </div>
  );
}
