// Studio layout — `metadata` and `viewport` exports must live here (server component),
// not on the client-only Studio page.
export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
