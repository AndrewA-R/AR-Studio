import Link from "next/link";
import Image from "next/image";

export function Masthead({ tagline = "Integrated marketing, on one team" }: { tagline?: string }) {
  const links: Array<[string, string]> = [
    ["Work", "/#work"],
    ["Services", "/services"],
    ["Carousel", "/carousel"],
    ["Thinking", "/thinking"],
    ["Studio", "/#studio"],
  ];
  return (
    <header className="bg-paper border-b-2 border-ink">
      <div className="wrap pt-3.5 pb-3">
        <div className="grid grid-cols-[1fr_auto] items-baseline gap-8 pb-2.5 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-400">
          <span>A+R Studio · Est. 2025 · Los Angeles</span>
          <span className="text-right">{tagline}</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 pt-3.5 border-t border-ink/10">
          <nav className="hidden md:flex gap-7 font-ui text-sm font-medium">
            {links.map(([l, h]) => (
              <Link key={l} href={h} className="text-ink hover:text-purple-700 no-underline">{l}</Link>
            ))}
          </nav>
          <Link href="/" className="block mx-auto md:mx-0">
            <Image src="/brand/ar-logo.png" alt="A+R" width={76} height={38} className="h-[38px] w-auto" priority />
          </Link>
          <div className="flex gap-5 items-center justify-end">
            <Link href="/contact" className="btn-primary text-[13px] px-4 py-2.5">Start a conversation →</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
