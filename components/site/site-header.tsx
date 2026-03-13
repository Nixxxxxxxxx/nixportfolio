import Link from "next/link";

import styles from "./site-header.module.css";

const navigationItems = [
  { key: "cases", href: "/cases", label: "Кейсы" },
  { key: "about", href: "/about", label: "Обо мне" },
  { key: "resume", href: "/resume", label: "Резюме" }
] as const;

type SiteHeaderProps = {
  current: (typeof navigationItems)[number]["key"];
};

export function SiteHeader({ current }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.homeLink}>
        На главную
      </Link>

      <nav className={styles.nav} aria-label="Навигация по сайту">
        {navigationItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            aria-current={item.key === current ? "page" : undefined}
            className={[
              styles.navLink,
              item.key === current ? styles.navLinkActive : ""
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
