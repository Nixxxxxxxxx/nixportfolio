export type CaseMetric = {
  label: string;
  value: string;
};

export type CaseOverviewTextItem = {
  title: string;
  body: string;
};

export type CaseOverviewMetricsItem = {
  title: string;
  metrics: readonly CaseMetric[];
};

export type CaseOverviewItem = CaseOverviewTextItem | CaseOverviewMetricsItem;

export type CaseQuote = {
  accent: string;
  text: string;
};

export type CaseInsightItem = {
  title: string;
  description: string;
  quotes: readonly CaseQuote[];
};

export type CaseHypothesisItem = {
  title: string;
  description: string;
};

export type CaseProcessTone =
  | "warning"
  | "positive"
  | "lavender"
  | "pink"
  | "teal"
  | "red";

export type CaseProcessStage = {
  label: string;
  tone: CaseProcessTone;
  items: readonly string[];
};

export type CaseImageAsset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  viewportAspectRatio?: string;
  fit?: "cover" | "contain";
  position?: string;
  background?: string;
  disableTransform?: boolean;
};

export type CaseStudyData = {
  slug: string;
  browserAddress: string;
  showBrowserChrome?: boolean;
  showTaskFlow?: boolean;
  comparisonLabel?: string;
  comparisonLayout?: "default" | "portrait";
  indexCard: {
    title: string;
    summary: string;
    tags: readonly string[];
    highlightMetric: string;
    highlightLabel: string;
    eyebrow: string;
    ctaLabel: string;
  };
  intro: {
    title: string;
    summary: string;
  };
  overview: readonly CaseOverviewItem[];
  results: {
    title: string;
    metrics: readonly CaseMetric[];
    worked: readonly string[];
    didntWork: readonly string[];
  };
  insights: {
    title: string;
    description: string;
    items: readonly CaseInsightItem[];
  };
  hypotheses: {
    title: string;
    description: string;
    items: readonly CaseHypothesisItem[];
  };
  process: {
    title: string;
    description: string;
    stages: readonly CaseProcessStage[];
  };
  assets: {
    logo: CaseImageAsset;
    hero: CaseImageAsset;
    before: CaseImageAsset;
    after: CaseImageAsset;
    taskFlow: CaseImageAsset;
  };
};
