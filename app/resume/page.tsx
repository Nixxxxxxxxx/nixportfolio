import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/animations/fade-in";
import { BottomMenuDock } from "@/components/site/bottom-menu-dock";
import type { ResumeBadge, ResumeBulletLine } from "@/content/resume";
import { resumeData } from "@/content/resume";

import styles from "./page.module.css";

function MapPinIcon() {
  return (
    <svg className={styles.mapPinIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22C12 22 19 15.5 19 10A7 7 0 1 0 5 10C5 15.5 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg className={styles.briefcaseIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 7V5.5C9 4.67 9.67 4 10.5 4H13.5C14.33 4 15 4.67 15 5.5V7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 9.5C4 8.67 4.67 8 5.5 8H18.5C19.33 8 20 8.67 20 9.5V17.5C20 18.33 19.33 19 18.5 19H5.5C4.67 19 4 18.33 4 17.5V9.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg className={styles.backIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 6L8.5 12L14.5 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function renderBulletLine(line: ResumeBulletLine) {
  return line.map((part, index) =>
    part.strong ? (
      <strong key={`${part.text}-${index}`}>{part.text}</strong>
    ) : (
      <span key={`${part.text}-${index}`}>{part.text}</span>
    )
  );
}

function ExperienceBadge({ badge }: { badge: ResumeBadge }) {
  if (badge.type === "image") {
    return (
      <div className={styles.companyBadge}>
        <Image
          src={badge.src}
          alt={badge.alt}
          fill
          sizes="61px"
          className={styles.companyBadgeImage}
        />
      </div>
    );
  }

  if (badge.type === "magnit") {
    return (
      <div className={`${styles.companyBadge} ${styles.magnitBadge}`}>
        <Image
          src="/images/resume/magnit-badge.svg"
          alt="Magnit Tech badge"
          width={51}
          height={18}
          className={styles.magnitBadgeImage}
        />
      </div>
    );
  }

  return (
    <div
      className={`${styles.companyBadge} ${
        badge.variant === "goodgoose" ? styles.goodgooseBadge : styles.feedomBadge
      }`}
    >
      <span>{badge.text}</span>
    </div>
  );
}

export default function ResumePage() {
  const phoneHref = `tel:${resumeData.contacts.phone.replace(/[^\d+]/g, "")}`;
  const telegramUserUrl = `https://t.me/${resumeData.contacts.telegram.replace("@", "")}`;
  const telegramChannelUrl = `https://t.me/${resumeData.contacts.channel.replace("@", "")}`;

  return (
    <main className={styles.page}>
      <div className={styles.canvas}>
        <div className={styles.topBarLayer}>
          <div className={styles.topBar}>
            <Link href="/" className={styles.backButton} aria-label="Назад на главную">
              <BackArrowIcon />
            </Link>
          </div>
        </div>

        <section className={styles.layout}>
          <FadeIn className={styles.contactColumn} animatePosition={false}>
            <aside className={styles.contactCard}>
              <div className={styles.contactTop}>
                <div className={styles.avatarWrap}>
                  <Image
                    src="/images/resume/avatar.png"
                    alt="Портрет Виталия Унаняна"
                    fill
                    sizes="80px"
                    className={styles.avatar}
                  />
                </div>

                <div className={styles.contactList}>
                  <div className={styles.contactRow}>
                    <p className={styles.contactLabel}>E-mail</p>
                    <a className={styles.contactValueLink} href={`mailto:${resumeData.contacts.email}`}>
                      {resumeData.contacts.email}
                    </a>
                  </div>

                  <div className={styles.contactRow}>
                    <p className={styles.contactLabel}>Телефон</p>
                    <a className={styles.contactValueAction} href={phoneHref}>
                      {resumeData.contacts.phone}
                    </a>
                  </div>

                  <div className={styles.contactRow}>
                    <p className={styles.contactLabel}>Telegram</p>
                    <a
                      className={styles.contactValueAction}
                      href={telegramUserUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {resumeData.contacts.telegram}
                    </a>
                  </div>

                  <div className={styles.separator} />

                  <div className={styles.contactRow}>
                    <p className={styles.contactLabel}>Telegram канал</p>
                    <a
                      className={styles.contactValueAction}
                      href={telegramChannelUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {resumeData.contacts.channel}
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.contactBottom}>
                <a
                  className={styles.contactValueLink}
                  href={telegramUserUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {resumeData.contacts.telegram}
                </a>
              </div>
            </aside>
          </FadeIn>

          <div className={styles.mainColumn}>
            <FadeIn className={styles.nameBlock} animatePosition={false}>
              <h1 className={styles.name}>
                <span>{resumeData.fullName}</span>
                <span className={styles.role}>{resumeData.role}</span>
              </h1>
              <p className={styles.location}>
                <MapPinIcon />
                <span>{resumeData.location}</span>
              </p>
            </FadeIn>

            <FadeIn className={styles.introCard} delay={0.04} animatePosition={false}>
              <p className={styles.introText}>{resumeData.intro}</p>
            </FadeIn>

            <section className={styles.experienceStack}>
              {resumeData.experience.map((work, index) => (
                <FadeIn
                  key={work.company}
                  className={styles.workReveal}
                  delay={0.06 * (index + 1)}
                  animatePosition={false}
                >
                  <article className={styles.workItem}>
                    <header className={styles.workHeader}>
                      <div className={styles.workHeaderMain}>
                        <h2 className={styles.workCompany}>{work.company}</h2>
                        <p className={styles.workRole}>{work.role}</p>
                        <p className={styles.period}>
                          <BriefcaseIcon />
                          <span>{work.period}</span>
                        </p>
                        <div className={styles.tags}>
                          {work.tags.map((tag) => (
                            <span key={`${work.company}-${tag}`} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ExperienceBadge badge={work.badge} />
                    </header>

                    {work.projects ? (
                      <div className={styles.projectStack}>
                        {work.projects.map((project) => (
                          <section key={`${work.company}-${project.title}`} className={styles.projectBlock}>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <ul className={styles.bulletList}>
                              {project.bullets.map((line, lineIndex) => (
                                <li key={`${project.title}-${lineIndex}`} className={styles.bulletItem}>
                                  {renderBulletLine(line)}
                                </li>
                              ))}
                            </ul>
                          </section>
                        ))}
                      </div>
                    ) : null}

                    {work.intro ? <p className={styles.workIntro}>{work.intro}</p> : null}

                    {work.bullets ? (
                      <ul className={styles.bulletList}>
                        {work.bullets.map((line, lineIndex) => (
                          <li key={`${work.company}-line-${lineIndex}`} className={styles.bulletItem}>
                            {renderBulletLine(line)}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>

                  {index < resumeData.experience.length - 1 ? <div className={styles.divider} /> : null}
                </FadeIn>
              ))}
            </section>
          </div>
        </section>

        <FadeIn delay={0.16} duration={0.38} animatePosition={false}>
          <BottomMenuDock />
        </FadeIn>
      </div>
    </main>
  );
}
