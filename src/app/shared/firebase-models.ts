export interface CarouselSlide {
  id: string;
  title: string;
  titleHighlight: string;
  body: string;
  ctaLabel: string;
  ctaLink: string;
  order: number;
}

export interface ServiceItem {
  id: string;
  /** Bootstrap icon class e.g. 'bi-activity'. */
  icon: string;
  title: string;
  description: string;
  link: string;
  downloadUrl: string;
  downloadLabel: string;
  /** Firebase Storage path — used to delete the old file when replacing. */
  downloadStoragePath: string;
  order: number;
}

export interface ServiceSectionMeta {
  title: string;
  subtitle: string;
}

export interface CtaContent {
  backgroundImageUrl: string;
  backgroundImageWidth: number;
  backgroundImageHeight: number;
  /** Storage path for the background image file. */
  backgroundStoragePath: string;
  title: string;
  description: string;
  buttonLabel: string;
  /** Firebase Storage download URL for the CTA download file. */
  buttonLink: string;
  /** Storage path for the CTA download file. */
  downloadStoragePath: string;
}
