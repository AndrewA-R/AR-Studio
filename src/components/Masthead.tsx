"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type LinkTuple = [string, string];

const LINKS: LinkTuple[] = [
  ["Work", "/#work"],
  ["Services", "/services"],
  ["Carousel", "/carousel"],
  ["Thinking", "/thinking"],
];

export function Masthead({ tagline = "Integrated marketing, on one team" }: { tagline?: string }) {
  const [navOpen, setNavOpen] = useState(false);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (!navOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [navOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setNavOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  return (
    <header className="bg-paper border-b-2 border-ink">
      <div className="wrap pt-3.5 pb-3">
        {/* Meta strip. Tagline hidden on mobile (also appears as meta description). */}
        <div className="flex flex-col gap-1.5 md:flex-row md:justify-between md:items-baseline pb-2.5 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-400">
          <span>A+R Studio · Est. 2025 · Los Angeles</span>
          <span className="hidden md:inline md:text-right">{tagline}</span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6 pt-3.5 border-t border-ink/10">
          {/* Desktop nav (hidden on mobile) */}
          <nav className="hidden md:flex gap-7 font-ui text-sm font-medium">
            {LINKS.map(([l, h]) => (
              <Link key={l} href={h} className="text-ink hover:text-purple-700 no-underline">{l}</Link>
            ))}
          </nav>

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen(true)}
            className="md:hidden flex items-center justify-center w-11 h-11 -ml-2 text-ink"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <line x1="4" y1="9" x2="20" y2="9" />
              <line x1="4" y1="15" x2="20" y2="15" />
            </svg>
          </button>

          <Link href="/" className="block mx-auto md:mx-0">
            <Image src="/brand/ar-logo.png" alt="A+R" width={76} height={38} className="h-[34px] md:h-[38px] w-auto" priority />
          </Link>

          {/* Right slot: CTA on desktop only. Mobile slot stays empty (CTA lives in sheet). */}
          <div className="flex gap-5 items-center justify-end">
            <Link href="/contact" className="hidden md:inline-block btn-primary text-[13px] px-4 py-2.5">Start a conversation →</Link>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      {navOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-paper md:hidden flex flex-col"
        >
          <div className="wrap pt-3.5 pb-3 flex items-center justify-between">
            <Link href="/" onClick={() => setNavOpen(false)} className="block">
              <Image src="/brand/ar-logo.png" alt="A+R" width={76} height={38} className="h-[34px] w-auto" />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setNavOpen(false)}
              className="w-11 h-11 -mr-2 flex items-center justify-center text-ink"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-[clamp(24px,4vw,56px)] gap-7">
            {LINKS.map(([l, h]) => (
              <Link
                key={l}
                href={h}
                onClick={() => setNavOpen(false)}
                className="text-ink no-underline"
                style={{ fontFamily: '"Instrument Serif", serif', fontSize: 48, lineHeight: 1, letterSpacing: "-0.02em" }}
              >
                {l}
              </Link>
            ))}
          </nav>
          <div className="px-[clamp(24px,4vw,56px)] pb-10">
            <Link
              href="/contact"
              onClick={() => setNavOpen(false)}
              className="block w-full text-center btn-primary text-[13px] py-3.5"
            >
              Start a conversation →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
