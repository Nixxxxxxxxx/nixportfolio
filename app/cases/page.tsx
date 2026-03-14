import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/animations/fade-in";
import { caseStudies } from "@/content/cases";

import styles from "./page.module.css";

const CASE_METRIC_LIMIT = 2;

export default function CasesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.canvas}>
        <section className={styles.listSection} aria-labelledby="cases-title">
          <h1 id="cases-title" className={styles.visuallyHidden}>
            Кейсы
          </h1>

          <div className={styles.caseList}>
            {caseStudies.map((study, index) => (
              <FadeIn
                key={study.slug}
                className={styles.listItem}
                delay={0.06 * index}
              >
                <Link
                  href={`/cases/${study.slug}`}
                  className={styles.caseRow}
                  aria-label={`${study.indexCard.title}. ${study.indexCard.summary}`}
                >
                  <div className={styles.caseLogoWrap}>
                    <Image
                      src={study.assets.logo.src}
                      alt={study.assets.logo.alt}
                      width={study.assets.logo.width ?? 451}
                      height={study.assets.logo.height ?? 165}
                      priority={index === 0}
                      className={styles.caseLogo}
                    />
                  </div>

                  <div className={styles.caseSummaryWrap}>
                    <p className={styles.caseSummary}>{study.indexCard.summary}</p>
                  </div>

                  <div className={styles.impactMetrics}>
                    {study.results.metrics.slice(0, CASE_METRIC_LIMIT).map((metric) => (
                      <div key={metric.label} className={styles.impactMetric}>
                        <span className={styles.impactMetricValue}>{metric.value}</span>
                        <span className={styles.impactMetricLabel}>{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
