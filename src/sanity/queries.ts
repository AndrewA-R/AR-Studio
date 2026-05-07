import { groq } from "next-sanity";

export const homepageQuery = groq`*[_type == "homepage"][0]`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

// Tile-shape fields for the homepage Work section. We pull the new
// schema's masthead fields and alias them to the tile component's
// expected props (caseNumber/client/headline/result), with sensible
// fallbacks so a half-filled doc still renders.
export const featuredCasesQuery = groq`*[_type == "caseStudy" && featured == true] | order(order asc){
  _id,
  "slug": slug.current,
  "caseNumber": caseNo,
  "client": wordmark,
  tier, sector, dates,
  "headline": coalesce(tileHeadline, headline + select(defined(italic) => " " + italic, "")),
  "result": tileResult,
  "heroImage": heroImage,
  "clientLogo": logo,
  "logoIsWhite": false
}`;

export const allCasesQuery = groq`*[_type == "caseStudy"] | order(order asc){
  _id,
  "slug": slug.current,
  "caseNumber": caseNo,
  "client": wordmark,
  tier, sector, dates,
  "headline": coalesce(tileHeadline, headline),
  "result": tileResult,
  heroImage
}`;

// Full case-study fetch — expands all image refs in body blocks so the
// frontend can render <img src> directly without secondary requests.
export const caseBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  "logoUrl": logo.asset->url,
  "heroImageUrl": heroImage.asset->url,
  "heroVideoUrl": heroVideo.asset->url,
  "heroVideoType": heroVideo.asset->mimeType,
  body[]{
    ...,
    _type == "galleryBlock" => {
      ...,
      items[]{
        ...,
        "src": image.asset->url,
        "videoSrc": video.asset->url,
        "videoType": video.asset->mimeType
      },
      chapters[]{
        ...,
        items[]{
          ...,
          "src": image.asset->url,
          "videoSrc": video.asset->url,
          "videoType": video.asset->mimeType
        }
      }
    },
    _type == "brandSystemBlock" => {
      ...,
      "logoSrc": logoSample.asset->url,
      templates[]{
        ...,
        "src": image.asset->url,
        "videoSrc": video.asset->url,
        "videoType": video.asset->mimeType
      }
    },
    _type == "strategyBlock" => {
      ...,
      "imageSrc": image.asset->url
    },
    _type == "videoBlock" => {
      ...,
      "videoSrc": video.asset->url,
      "videoType": video.asset->mimeType,
      "posterSrc": poster.asset->url
    }
  }
}`;

export const articleArchiveQuery = groq`*[_type == "article" && status != "forthcoming"] | order(publishedAt desc){
  _id, title, "slug": slug.current, number, tag, readTime, publishedAt, excerpt
}`;

export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0]{
  ..., "slug": slug.current,
  body[]{
    ...,
    _type == "image" => { ..., "url": asset->url }
  }
}`;

export const foundersQuery = groq`*[_type == "founder"] | order(order asc)`;

export const clientLogosQuery = groq`*[_type == "clientLogo"] | order(order asc){_id, name, logo, order, opticalScale}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc)`;

export const faqsQuery = groq`*[_type == "faq"] | order(order asc)`;

export const carouselCapabilitiesQuery = groq`*[_type == "carouselCapability"] | order(order asc){
  _id, title, summary, order,
  "videoUrl": video.asset->url,
  "videoType": video.asset->mimeType,
  poster
}`;
