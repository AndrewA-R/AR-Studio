import { NewsletterForm } from "./NewsletterForm";

export function SiteFooter(_props: { signoff?: string; signoffAccent?: string } = {}) {
  return (
    <footer className="bg-purple-950 text-bone pt-24 pb-12 px-[clamp(24px,4vw,56px)]">
      <div className="max-w-wide mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-12 border-t border-bone/15">
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/55">General</div>
            <div className="mt-4 font-ui text-[15px] leading-[1.6]">
              <a href="/contact" className="text-bone no-underline border-b border-bone/15 pb-0.5">Schedule a call</a>
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/55">Roster</div>
            <div className="mt-4 font-ui text-[15px] leading-[1.6]">
              Freelance and specialist network<br />
              <a href="/join-our-roster" className="text-bone no-underline border-b border-bone/15 pb-0.5">Join our roster</a>
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/55">Studio</div>
            <div className="mt-4 font-ui text-[15px] leading-[1.6]">
              Los Angeles
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/55">Elsewhere</div>
            <div className="mt-4 font-ui text-[15px] leading-[1.8]">
              <a href="https://www.linkedin.com/company/aandr-studio" target="_blank" rel="noopener noreferrer" className="text-bone no-underline border-b border-bone/15 pb-0.5">LinkedIn</a>
            </div>
            <div className="mt-5">
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/55 mb-2">Newsletter</div>
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-bone/15 flex justify-between items-baseline font-mono text-[11px] tracking-[0.18em] uppercase text-bone/55">
          <span>© {new Date().getFullYear()} A+R Studio · Los Angeles</span>
          <span>v1.1 · April 2026</span>
        </div>
      </div>
    </footer>
  );
}
