import { urlFor } from "@/sanity/client";

// Build a usable image URL from a Sanity image ref (or null).
// `fallback` is a path under /public used when the image isn't set yet.
export function imgSrc(image: unknown, fallback: string, width = 1600): string {
  if (!image || typeof image !== "object") return fallback;
  // Already-resolved placeholder shape
  if ((image as { _placeholder?: string })._placeholder) {
    return (image as { _placeholder: string })._placeholder;
  }
  try {
    return urlFor(image as never).width(width).fit("max").auto("format").url();
  } catch {
    return fallback;
  }
}
