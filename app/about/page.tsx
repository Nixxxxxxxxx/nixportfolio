import Image from "next/image";

import { FadeIn } from "@/components/animations/fade-in";
import { BottomMenuDock } from "@/components/site/bottom-menu-dock";
import { profile } from "@/content/profile";

import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.canvas}>
        <section className={styles.hero}>
          <FadeIn className={styles.copy}>
            <p className={styles.eyebrow}>Обо мне</p>
            <h1 className={styles.title}>
              Дизайнер, которому важно, чтобы интерфейс выдерживал реальную
              жизнь продукта.
            </h1>
            <p className={styles.summary}>{profile.summary}</p>
            <p className={styles.about}>{profile.about}</p>
          </FadeIn>

          <FadeIn className={styles.visual} delay={0.08}>
            <div className={`${styles.photoCard} ${styles.photoBack}`}>
              <Image
                src="/images/profile/portrait-side.jpg"
                alt="Портрет Виталия Унаняна"
                fill
                sizes="(max-width: 960px) 100vw, 34vw"
                className={styles.photoImage}
              />
            </div>
            <div className={`${styles.photoCard} ${styles.photoFront}`}>
              <Image
                src="/images/profile/portrait-court.jpg"
                alt="Портрет Виталия Унаняна на фоне баскетбольного кольца"
                fill
                sizes="(max-width: 960px) 100vw, 32vw"
                className={styles.photoImage}
              />
            </div>
          </FadeIn>
        </section>

        <section className={styles.section}>
          <FadeIn className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>Как я работаю</p>
            <h2 className={styles.sectionTitle}>Три принципа, на которых держится мой процесс.</h2>
          </FadeIn>

          <div className={styles.principlesGrid}>
            {profile.principles.map((item, index) => (
              <FadeIn key={item.title} className={styles.principleCard} delay={0.08 * (index + 1)}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <FadeIn className={styles.bottomGrid}>
            <div className={styles.strengthsCard}>
              <p className={styles.sectionLabel}>Сильные стороны</p>
              <div className={styles.strengthsList}>
                {profile.strengths.map((item) => (
                  <span key={item} className={styles.strengthTag}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.contactCard}>
              <p className={styles.sectionLabel}>Связаться</p>
              <div className={styles.contactRows}>
                <a href={`mailto:${profile.contacts.email}`}>{profile.contacts.email}</a>
                <a href={profile.contacts.telegramUrl} target="_blank" rel="noreferrer">
                  {profile.contacts.telegramLabel}
                </a>
                <span>{profile.contacts.phone}</span>
              </div>
            </div>
          </FadeIn>
        </section>

        <BottomMenuDock />
      </div>
    </main>
  );
}
