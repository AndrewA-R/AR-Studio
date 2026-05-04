import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.a-r.studio"),
  title: {
    default: "A+R Studio — Work. Together.",
    template: "%s · A+R Studio",
  },
  description:
    "An integrated marketing studio built around Carousel — our AI-driven operating system — and a roster of senior specialists. One retainer. No media markups.",
  openGraph: {
    type: "website",
    siteName: "A+R Studio",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
