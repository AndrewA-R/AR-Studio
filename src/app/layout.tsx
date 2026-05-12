import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";

const GA_MEASUREMENT_ID = "G-2LL8WQG3NS";

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
      <body>
        {children}
        {/* Google Analytics 4 — loads on every route via the App Router root layout. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
