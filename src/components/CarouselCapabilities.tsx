import { imgSrc } from "@/lib/image";

type Capability = {
  _id: string;
  title: string;
  summary?: string;
  order?: number;
  videoUrl?: string | null;
  videoType?: string | null;
  poster?: unknown | null;
};

export function CarouselCapabilities({ capabilities }: { capabilities: Capability[] }) {
  if (!capabilities?.length) return null;
  return (
    <section className="bg-paper px-[clamp(24px,4vw,56px)] py-24">
      <div className="max-w-wide mx-auto">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 pb-3.5 border-b border-ink/15 mb-12">
          § What it does
        </div>
        <div className="flex flex-col">
          {capabilities.map((cap, i) => (
            <CapabilityRow key={cap._id} cap={cap} index={i} isLast={i === capabilities.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityRow({ cap, index, isLast }: { cap: Capability; index: number; isLast: boolean }) {
  const videoOnRight = index % 2 === 0; // even rows: text left / video right
  const posterUrl = cap.poster ? imgSrc(cap.poster, "", 1600) : "";

  const text = (
    <div className="flex flex-col justify-center">
      <h2
        className="m-0 text-ink text-balance"
        style={{
          fontFamily: '"Instrument Serif", serif',
          fontSize: "clamp(36px, 4.4vw, 64px)",
          lineHeight: 1.0,
          letterSpacing: "-0.022em",
          fontWeight: 400,
        }}
      >
        {cap.title}
      </h2>
      {cap.summary && (
        <p
          className="mt-6 m-0 max-w-[52ch] text-ink-600"
          style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.6, whiteSpace: "pre-line" }}
        >
          {cap.summary}
        </p>
      )}
    </div>
  );

  const media = (
    <div className="aspect-video w-full bg-paper-dark border border-ink/10 overflow-hidden flex items-center justify-center"
      style={posterUrl ? { backgroundImage: `url(${posterUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
      {cap.videoUrl ? (
        <video
          className="w-full h-full object-cover"
          autoPlay loop muted playsInline preload="metadata"
          poster={posterUrl || undefined}
        >
          <source src={cap.videoUrl} type={cap.videoType || "video/mp4"} />
        </video>
      ) : posterUrl ? null : (
        <span aria-hidden className="text-ink-400" style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontSize: 18 }}>
          ▷ Video placeholder
        </span>
      )}
    </div>
  );

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-16 py-16 ${isLast ? "" : "border-b border-ink/15"}`}>
      {videoOnRight ? <>{text}{media}</> : <>{media}{text}</>}
    </div>
  );
}
