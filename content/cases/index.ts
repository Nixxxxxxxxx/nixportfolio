import type { CaseStudyData } from "./types";
import { edtechAdminPanelCaseStudy } from "./edtech-admin-panel";
import { hrlinkNewsEditorCaseStudy } from "./hrlink-news-editor";
import { hrlinkNewsFeedCaseStudy } from "./hrlink-news-feed";
import { yandexOnlineExamCaseStudy } from "./yandex-online-exam";

export type { CaseStudyData } from "./types";

export const caseStudies: readonly CaseStudyData[] = [
  edtechAdminPanelCaseStudy,
  yandexOnlineExamCaseStudy,
  hrlinkNewsFeedCaseStudy,
  hrlinkNewsEditorCaseStudy
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
