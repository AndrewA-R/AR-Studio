import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title("Homepage").id("homepage")
        .child(S.document().schemaType("homepage").documentId("homepage").title("Homepage")),
      S.listItem().title("Carousel page").id("carouselPage")
        .child(S.document().schemaType("carouselPage").documentId("carouselPage").title("Carousel page")),
      S.listItem().title("Site settings").id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site settings")),
      S.divider(),
      S.documentTypeListItem("caseStudy").title("Case studies"),
      S.documentTypeListItem("article").title("Essays"),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("carouselCapability").title("Carousel capabilities"),
      S.divider(),
      S.documentTypeListItem("founder").title("Founders"),
      S.documentTypeListItem("clientLogo").title("Clients (logo wall)"),
      S.documentTypeListItem("faq").title("FAQs"),
    ]);
