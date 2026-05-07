import { caseStudy } from "./caseStudy";
import { article } from "./article";
import { founder } from "./founder";
import { clientLogo } from "./clientLogo";
import { faq } from "./faq";
import { homepage } from "./homepage";
import { carouselPage } from "./carouselPage";
import { siteSettings } from "./siteSettings";
import { service } from "./service";
import { carouselCapability } from "./carouselCapability";

// Body block schemas referenced from caseStudy.body[]
import metricsBlock     from "./blocks/metricsBlock";
import strategyBlock    from "./blocks/strategyBlock";
import diagnosisBlock   from "./blocks/diagnosisBlock";
import galleryBlock     from "./blocks/galleryBlock";
import quoteBlock       from "./blocks/quoteBlock";
import brandSystemBlock from "./blocks/brandSystemBlock";
import videoBlock       from "./blocks/videoBlock";

export const schemaTypes = [
  caseStudy, article, founder, clientLogo, faq, homepage, carouselPage, siteSettings, service, carouselCapability,
  metricsBlock, strategyBlock, diagnosisBlock, galleryBlock, quoteBlock, brandSystemBlock, videoBlock,
];
