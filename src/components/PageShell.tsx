import { Masthead } from "./Masthead";
import { SiteFooter } from "./SiteFooter";
import { getSettings } from "@/lib/data";

export async function PageShell({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <Masthead tagline={settings.tagline} />
      {children}
      <SiteFooter signoff={settings.footerSignoff} signoffAccent={settings.footerSignoffAccent} />
    </>
  );
}
