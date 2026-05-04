import { groq } from "next-sanity";

export const homepageQuery = groq`*[_type == "homepage"][0]{
  ...,
  forthcomingArticle->{title, "slug": slug.current, number, tag, readTime, publishedAt, status}
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const featuredCasesQuery = groq`*[_type == "caseStudy" && featured == true] | order(order asc){
  _id, title, "slug": slug.current, caseNumber, client, tier, sector, dates,
  headline, result, heroImage, clientLogo, logoIsWhite
}`;

export const allCasesQuery = groq`*[_type == "caseStudy"] | order(order asc){
  _id, title, "slug": slug.current, caseNumber, client, tier, sector, dates, headline, result, heroImage
}`;

export const caseBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  ..., "slug": slug.current
}`;

export const articleArchiveQuery = groq`*[_type == "article" && status == "published"] | order(publishedAt desc){
  _id, title, "slug": slug.current, number, tag, readTime, publishedAt, excerpt
}`;

export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0]{
  ..., "slug": slug.current
}`;

export const foundersQuery = groq`*[_type == "founder"] | order(order asc)`;

export const clientLogosQuery = groq`*[_type == "clientLogo"] | order(order asc)`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc)`;

export const faqsQuery = groq`*[_type == "faq"] | order(order asc)`;

export const carouselCapabilitiesQuery = groq`*[_type == "carouselCapability"] | order(order asc){
  _id, title, summary, order,
  "videoUrl": video.asset->url,
  "videoType": video.asset->mimeType,
  poster
}`;
