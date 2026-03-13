import Image from "next/image";

import { FadeIn } from "@/components/animations/fade-in";
import { SiteHeader } from "@/components/site/site-header";
import { profile } from "@/content/profile";

import styles from "./page.module.css";

export default function ResumePage() {
  return (
    <main className={styles.page}>
      <div className={styles.canvas}>
        <SiteHeader current="resume" />

        <section className={styles.hero}>
          <FadeIn className={styles.summaryCard}>
            <div className={styles.identity}>
              <div className={styles.avatarWrap}>
                <Image
                  src="/images/profile/portrait-side.jpg"
                  alt="Портрет Виталия Унаняна"
                  fill
                  sizes="96px"
                  className={styles.avatar}
                />
              </div>

              <div className={styles.identityText}>
                <p className={styles.eyebrow}>Резюме</p>
                <h1 className={styles.name}>{profile.name}</h1>
                <p className={styles.role}>{profile.role}</p>
              </div>
            </div>

            <p className={styles.summary}>{profile.summary}</p>

            <div className={styles.contacts}>
              <a href={`mailto:${profile.contacts.email}`}>{profile.contacts.email}</a>
              <a href={profile.contacts.telegramUrl} target="_blank" rel="noreferrer">
                {profile.contacts.telegramLabel}
              </a>
              <span>{profile.contacts.phone}</span>
            </div>
          </FadeIn>
        </section>

        <section className={styles.timelineSection}>
          <FadeIn className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>Опыт</p>
            <h2 className={styles.sectionTitle}>Последние роли и то, за что я отвечал.</h2>
          </FadeIn>

          <div className={styles.timeline}>
            {profile.experience.map((item, index) => (
              <FadeIn key={item.company} className={styles.timelineCard} delay={0.08 * (index + 1)}>
                <div className={styles.timelineHeader}>
                  <div>
                    <h3 className={styles.company}>{item.company}</h3>
                    <p className={styles.position}>{item.role}</p>
                  </div>
                  <p className={styles.period}>{item.period}</p>
                </div>

                <div className={styles.tagRow}>
                  {item.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <p className={styles.description}>{item.description}</p>

                <ul className={styles.highlights}>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
