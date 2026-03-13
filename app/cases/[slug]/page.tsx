import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/cases/case-study-page";
import { caseStudies, getCaseStudyBySlug } from "@/content/cases";

type CaseStudyRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug
  }));
}

export async function generateMetadata({
  params
}: CaseStudyRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {};
  }

  return {
    title: `${study.indexCard.title} | Виталий Унанян`,
    description: study.indexCard.summary
  };
}

export default async function CaseStudyRoute({ params }: CaseStudyRouteProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyPage study={study} />;
}
