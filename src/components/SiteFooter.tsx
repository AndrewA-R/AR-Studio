import { NewsletterForm } from "./NewsletterForm";

const LINKEDIN_URL = "https://www.linkedin.com/company/aandr-studio";

function LinkedInIcon({ className = "" }: { className?: string }) {
  // Inline SVG so we don't pull in an icon library. Currentcolor for fill.
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" width="14" height="14" className={className} style={{ fill: "currentColor" }}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function MetaRow() {
  return (
    <div className="pt-6 border-t border-bone/15 flex justify-between items-center gap-4 font-mono text-[11px] tracking-[0.18em] uppercase text-bone/55">
      <span>© {new Date().getFullYear()} A+R Studio · Los Angeles</span>
      <span className="flex items-center gap-3">
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="A+R Studio on LinkedIn"
          className="text-bone/55 hover:text-bone inline-flex items-center"
        >
          <LinkedInIcon />
        </a>
        <span>v1.1 · April 2026</span>
      </span>
    </div>
  );
}

export function SiteFooter({ minimal = false }: { signoff?: string; signoffAccent?: string; minimal?: boolean } = {}) {
  if (minimal) {
    return (
      <footer className="bg-purple-950 text-bone pt-12 pb-12 px-[clamp(24px,4vw,56px)]">
        <div className="max-w-wide mx-auto">
          <MetaRow />
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-purple-950 text-bone pt-24 pb-12 px-[clamp(24px,4vw,56px)]">
      <div className="max-w-wide mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-12 border-t border-bone/15">
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/55">General</div>
            <div className="mt-4 font-ui text-[15px] leading-[1.6]">
              <a href="/contact" className="text-bone no-underline border-b border-bone/15 pb-0.5">Get in touch</a>
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/55">Roster</div>
            <div className="mt-4 font-ui text-[15px] leading-[1.6]">
              <a href="/join-our-roster" className="text-bone no-underline border-b border-bone/15 pb-0.5">Join our roster of freelance experts</a>
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
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-bone no-underline border-b border-bone/15 pb-0.5">LinkedIn</a>
            </div>
            <div className="mt-5">
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/55 mb-2">Newsletter</div>
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>
        <div className="mt-16">
          <MetaRow />
        </div>
      </div>
    </footer>
  );
}
