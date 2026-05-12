import type { Metadata } from "next";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const base = await buildMetadata();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.a-r.studio"),
    ...base,
    // Sub-pages with their own title fall through `%s · A+R Studio`.
    title: { default: base.title as string, template: "%s · A+R Studio" },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
