import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { apiVersion, dataset, projectId, readToken, useCdn } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token: readToken,
  perspective: "published",
});

const builder = imageUrlBuilder({ projectId, dataset });
export const urlFor = (src: SanityImageSource) => builder.image(src);
