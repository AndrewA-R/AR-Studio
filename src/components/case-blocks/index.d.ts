// TypeScript declarations for the .jsx case-block components.
// Each component accepts loose, optional props matching the Sanity schemas.
import type { ReactNode } from "react";

type GlanceRow = { k?: string; v?: string } | [string, string];

type GalleryItem = {
  span?: number;
  ratio?: string;
  caption?: string;
  label?: string;
  src?: string;
  image?: unknown;
};

type GalleryChapter = {
  title?: string;
  note?: string;
  items?: GalleryItem[];
};

type FrameworkRow = { label?: string; lines?: string[] };

type Swatch = { name?: string; hex?: string; fg?: string };

type TypographyDef = {
  display?: { family?: string; italic?: boolean; sample?: string; label?: string; weight?: number };
  body?: { family?: string; sample?: string; label?: string };
};

type Callout = { label?: string; body?: string };

export interface CaseSectionHeaderProps {
  n?: string;
  kicker?: string;
  title?: string;
  lede?: ReactNode;
  dark?: boolean;
  align?: "split" | "stack";
}

export interface CaseMastheadProps {
  caseNo?: string;
  sector?: string;
  tier?: string;
  dates?: string;
  wordmark?: string;
  logo?: string;
  headline?: string;
  italic?: string;
  lede?: ReactNode;
  atGlance?: GlanceRow[];
  image?: string;
}

export interface CaseMetricsProps {
  n?: string;
  kicker?: string;
  title?: string;
  lede?: ReactNode;
  footnote?: string;
  items?: Array<{ num?: string; unit?: string; label?: string; note?: string } | [string, string, string, string]>;
}

export interface CaseStrategyProps {
  n?: string;
  kicker?: string;
  title?: string;
  body?: ReactNode;
  positioning?: string;
  framework?: FrameworkRow[];
  dark?: boolean;
}

export interface CaseDiagnosisProps {
  n?: string;
  kicker?: string;
  title?: string;
  paragraphs?: ReactNode[];
  callout?: Callout;
}

export interface CaseGalleryProps {
  n?: string;
  kicker?: string;
  title?: string;
  lede?: ReactNode;
  items?: GalleryItem[];
  chapters?: GalleryChapter[];
  dark?: boolean;
}

export interface CaseQuoteProps {
  quote?: string;
  attribution?: string;
  role?: string;
}

export interface CaseBrandSystemProps {
  n?: string;
  kicker?: string;
  title?: string;
  body?: ReactNode;
  palette?: Swatch[];
  typography?: TypographyDef;
  layoutSlots?: string[];
}

export interface CaseCTAProps {
  headline?: string;
  italic?: string;
  body?: ReactNode;
  href?: string;
}

export interface PlaceholderProps {
  label?: string;
  caption?: string;
  dark?: boolean;
}

export const CaseSectionHeader: (props: CaseSectionHeaderProps) => JSX.Element | null;
export const CaseMasthead:      (props: CaseMastheadProps) => JSX.Element;
export const CaseMetrics:       (props: CaseMetricsProps) => JSX.Element;
export const CaseStrategy:      (props: CaseStrategyProps) => JSX.Element;
export const CaseDiagnosis:     (props: CaseDiagnosisProps) => JSX.Element;
export const CaseGallery:       (props: CaseGalleryProps) => JSX.Element;
export const CaseQuote:         (props: CaseQuoteProps) => JSX.Element;
export const CaseBrandSystem:   (props: CaseBrandSystemProps) => JSX.Element;
export const CaseCTA:           (props: CaseCTAProps) => JSX.Element;
export const Placeholder:       (props: PlaceholderProps) => JSX.Element;

export const AR_PURPLE: string;
export const AR_PURPLE_INK: string;
export const AR_PURPLE_950: string;
export const AR_PURPLE_300: string;
export const AR_PURPLE_100: string;
export const AR_INK: string;
export const AR_INK_600: string;
export const AR_INK_400: string;
export const AR_PAPER: string;
export const AR_WHITE: string;
