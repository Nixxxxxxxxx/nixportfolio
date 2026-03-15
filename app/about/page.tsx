import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/animations/fade-in";
import { BottomMenuDock } from "@/components/site/bottom-menu-dock";
import { aboutContent } from "@/content/about";

import styles from "./page.module.css";

function BackIcon() {
  return (
    <svg className={styles.backIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.75 18.5L8.25 12L14.75 5.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg className={styles.socialSvg} viewBox="0 0 33.3333 33.3333" aria-hidden="true">
      <path
        d="M16.6667 0C7.46667 0 0 7.46667 0 16.6667C0 25.8667 7.46667 33.3333 16.6667 33.3333C25.8667 33.3333 33.3333 25.8667 33.3333 16.6667C33.3333 7.46667 25.8667 0 16.6667 0ZM24.4 11.3333C24.15 13.9667 23.0667 20.3667 22.5167 23.3167C22.2833 24.5667 21.8167 24.9833 21.3833 25.0333C20.4167 25.1167 19.6833 24.4 18.75 23.7833C17.2833 22.8167 16.45 22.2167 15.0333 21.2833C13.3833 20.2 14.45 19.6 15.4 18.6333C15.65 18.3833 19.9167 14.5 20 14.15C20.0116 14.097 20.01 14.042 19.9955 13.9897C19.981 13.9374 19.9539 13.8894 19.9167 13.85C19.8167 13.7667 19.6833 13.8 19.5667 13.8167C19.4167 13.85 17.0833 15.4 12.5333 18.4667C11.8667 18.9167 11.2667 19.15 10.7333 19.1333C10.1333 19.1167 9 18.8 8.15 18.5167C7.1 18.1833 6.28333 18 6.35 17.4167C6.38333 17.1167 6.8 16.8167 7.58333 16.5C12.45 14.3833 15.6833 12.9833 17.3 12.3167C21.9333 10.3833 22.8833 10.05 23.5167 10.05C23.65 10.05 23.9667 10.0833 24.1667 10.25C24.3333 10.3833 24.3833 10.5667 24.4 10.7C24.3833 10.8 24.4167 11.1 24.4 11.3333Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DprofileIcon() {
  return (
    <svg className={styles.socialSvg} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M24 0H8C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0Z"
        fill="#4772FF"
      />
      <path
        d="M17.4003 7.57017C19.7309 6.50427 22.109 6.3807 23.9408 7.5522C25.9596 8.85757 26.6711 11.3157 26.6339 13.6069C26.5922 16.182 25.663 19.1425 23.8725 21.8957H26.6023V25.2781H5.36473V21.8957H8.10177C8.11953 19.3262 9.0282 16.3623 10.8009 13.6003C12.4287 11.0883 14.6488 8.8286 17.4003 7.57017ZM21.9251 10.6419C21.0704 10.1138 19.7867 10.2722 18.3207 11.1289C16.5011 12.1924 15.0507 13.8501 13.9151 15.6015C12.4819 17.8305 11.7254 20.1221 11.6822 21.8957H19.2297C21.1269 19.7749 22.6721 17.0434 23.0048 14.1914C23.1459 12.9822 23.0743 11.3715 21.9251 10.6419Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function VcRuIcon() {
  return (
    <svg className={styles.socialSvg} viewBox="0 0 30 32" aria-hidden="true">
      <path
        d="M24.0108 14.9142C26.2192 14.9142 27.8817 13.9942 29.1075 12.3925L27.4692 11.1425C27.0645 11.6758 26.5415 12.1079 25.9413 12.4047C25.3412 12.7014 24.6803 12.8547 24.0108 12.8525C21.6142 12.8525 19.8775 10.9 19.8775 8.50416C19.8775 6.10832 21.5858 4.04584 24.0792 4.04584C25.1875 4.04584 25.9708 4.3075 26.6542 4.73084V6.83749H28.7158V3.76585L28.3208 3.455C27.1875 2.56333 25.4567 2.09 24.01 2.09C20.4733 2.09 17.5967 4.96668 17.5967 8.50334C17.5967 12.0367 20.4725 14.9142 24.0108 14.9142ZM28.2883 27.5642L28.215 24.6117V17.4067H23.915V19.4692H26.0433V24.3575C26.0433 26.4633 24.435 27.9542 22.8125 27.9542C21.19 27.9542 20.3433 26.8292 20.3433 24.7242V17.4058H16.3267V19.4683H18.1717V25.0817C18.1717 27.9383 19.7733 29.9067 22.63 29.9067C24.2717 29.9067 25.5217 28.9958 26.2675 27.5917H26.3008L26.595 29.555H29.8992V27.5667H28.2908V27.5625L28.2883 27.5642ZM17.1217 2.3925H13.5383L10.4217 11.4425H10.3733L7.27333 2.3925H3.455V4.45582H5.6025L9.29833 14.7708H11.2617V14.7683L15.1158 4.45666H17.12V2.39334L17.1217 2.3925ZM0.101667 29.5817H2.225V27.4592H0.1025V29.5817H0.101667ZM8.30167 19.7983H8.27833L8.145 17.4067H4.355V19.2867H6.37167V27.565H4.355V29.5542H13.7217V27.6042H8.50667V22.6083C8.7425 20.8 10.0983 19.2558 11.9483 19.2558H11.9817L11.9442 21.1042H14.0058V17.3725H12.3758C10.5092 17.3675 9.12417 18.3775 8.30083 19.7992L8.30167 19.7983Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.topBarLayer}>
        <div className={styles.topBar}>
          <Link href="/" className={styles.backButton} aria-label="Назад на главную">
            <BackIcon />
          </Link>
        </div>
      </div>

      <div className={styles.canvas}>
        <header className={styles.intro} aria-labelledby="about-intro-title">
          <FadeIn className={styles.introTitle} animatePosition={false}>
            <h1 id="about-intro-title" className={styles.introHeading}>
              {aboutContent.shortTitle}
            </h1>
            <p className={styles.introText}>{aboutContent.shortText}</p>
          </FadeIn>

          <FadeIn className={styles.photoColumn} delay={0.08} animatePosition={false}>
            <div className={styles.photoWrap}>
              <Image
                src="/images/profile/portrait-court.jpg"
                alt="Виталий Унанян на баскетбольной площадке"
                fill
                sizes="(max-width: 960px) 112px, 451px"
                className={styles.photo}
              />
            </div>
          </FadeIn>

          <FadeIn className={styles.introSummary} delay={0.14} animatePosition={false}>
            <p>{aboutContent.heroSummary}</p>
          </FadeIn>
        </header>

        <section className={styles.section} aria-labelledby="about-skills-title">
          <FadeIn className={styles.sectionHeader} animatePosition={false}>
            <h2 id="about-skills-title" className={styles.sectionTitle}>
              {aboutContent.skillsTitle}
            </h2>
            <p className={styles.sectionDescription}>{aboutContent.skillsText}</p>
          </FadeIn>
        </section>

        <section className={styles.section} aria-labelledby="about-experience-title">
          <FadeIn className={styles.sectionHeader} animatePosition={false}>
            <h2 id="about-experience-title" className={styles.sectionTitle}>
              {aboutContent.experienceTitle}
            </h2>
            <p className={styles.sectionDescription}>{aboutContent.experienceText}</p>
          </FadeIn>
        </section>

        <section className={styles.section} aria-labelledby="about-media-title">
          <FadeIn className={styles.sectionHeader} animatePosition={false}>
            <h2 id="about-media-title" className={styles.sectionTitle}>
              {aboutContent.mediaTitle}
            </h2>
            <p className={styles.sectionDescription}>{aboutContent.mediaText}</p>
          </FadeIn>

          <FadeIn className={styles.socials} delay={0.08} animatePosition={false}>
            <a
              className={`${styles.socialItem} ${styles.socialTelegram}`}
              href={aboutContent.socialLinks.telegram}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
            >
              <TelegramIcon />
            </a>
            <a
              className={`${styles.socialItem} ${styles.socialDprofile}`}
              href={aboutContent.socialLinks.dprofile}
              target="_blank"
              rel="noreferrer"
              aria-label="Dprofile"
            >
              <DprofileIcon />
            </a>
            <a
              className={`${styles.socialItem} ${styles.socialVcru}`}
              href={aboutContent.socialLinks.vc}
              target="_blank"
              rel="noreferrer"
              aria-label="VC.ru"
            >
              <VcRuIcon />
            </a>
          </FadeIn>
        </section>

        <BottomMenuDock />
      </div>
    </main>
  );
}
