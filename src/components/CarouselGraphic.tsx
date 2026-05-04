"use client";
// Animated Carousel graphic — bolt-head cap with rotating logo decal,
// solid spine, and discipline labels riding the helix bottom-to-top.
// Dark variant of the design's "Final" iteration; tuned for the dark
// purple-950 plate the homepage Carousel section sits on.
import { useEffect, useMemo, useRef, useState } from "react";

const DISCIPLINES = [
  "Brand Strategy", "Campaign Planning", "Project Management", "Digital Media",
  "Paid Social", "Search", "Out of Home", "Influencer", "Affiliate", "Partnerships",
  "Experiential", "Events", "Field Marketing", "Organic Social", "Meta", "TikTok",
  "Pinterest", "YouTube", "Email", "SMS", "CRM", "Research", "Analytics", "Insights",
];

function useRotation(period = 72000, paused = false) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (paused) return;
    let raf: number; let start: number | null = null;
    const tick = (t: number) => {
      if (start == null) start = t;
      setPhase((((t - start) / period) % 1 + 1) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [period, paused]);
  return phase;
}

type Pt = { x: number; y: number; z: number; a: number; t: number };

function sampleHelix({ cx, top, length, radius, turns, segments, phase, tilt }:
  { cx: number; top: number; length: number; radius: number; turns: number; segments: number; phase: number; tilt: number }) {
  const total = turns * segments;
  const pts: Pt[] = [];
  for (let i = 0; i <= total; i++) {
    const t = i / total;
    const a = 2 * Math.PI * (turns * t - phase);
    const x = cx + Math.cos(a) * radius;
    const y = top + length * t + Math.sin(a) * radius * tilt;
    const z = Math.sin(a);
    pts.push({ x, y, z, a, t });
  }
  return pts;
}

function helixPaths(pts: Pt[]) {
  const front: Pt[][] = []; const back: Pt[][] = [];
  let cur: Pt[] = []; let curIsFront = pts[0].z >= 0;
  for (const p of pts) {
    const isFront = p.z >= 0;
    if (isFront !== curIsFront) {
      if (cur.length) (curIsFront ? front : back).push(cur);
      cur = [p]; curIsFront = isFront;
    } else { cur.push(p); }
  }
  if (cur.length) (curIsFront ? front : back).push(cur);
  return { front, back };
}

const ptsToPath = (pts: Pt[]) => pts.length
  ? "M " + pts.map(p => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L ")
  : "";

export function CarouselGraphic({ paused: pausedProp = false }: { paused?: boolean }) {
  // Mount gate — the SVG positions are floating-point and animated, so SSR
  // and client first-render don't match. Render the SVG only after mount.
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(m.matches);
    const onChange = () => setReducedMotion(m.matches);
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0 }
    );
    obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  const phase = useRotation(72000, pausedProp || reducedMotion || !inView);

  // Dark-variant palette
  const fg = "#E5DFF2";
  const fg2 = "#B3A6DC";
  const helixColor = "#B3A6DC";
  const accent = "#FDFCF8";
  const back = "rgba(179,166,220,0.5)";
  const fill = "#1B103F";
  const stroke = "#B3A6DC";
  const tint = "#FDFCF8";

  const W = 720, H = 1000;
  const cx = W / 2;
  const headTop = 110;
  const headHeight = 80;
  const headRadius = 145;
  const headBottom = headTop + headHeight;
  const top = headBottom + 6;
  const bot = H - 110;
  const length = bot - top;
  const helixRadius = 130;
  const spineRadius = 56;
  const turns = 18;
  const segments = 50;
  const tilt = 0.20;
  const headRy = headRadius * 0.20;

  const pts = sampleHelix({ cx, top, length, radius: helixRadius, turns, segments, phase, tilt });
  const { front, back: backSegs } = helixPaths(pts);

  const labels = useMemo(() => {
    let s = 17;
    const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    const arr: Array<{ t0: number; a0: number; label: string }> = [];
    for (let k = 0; k < 24; k++) {
      const tBase = (k + 0.5) / 24;
      const tJit = (rand() - 0.5) * (0.6 / 24);
      const t0 = Math.max(0.005, Math.min(0.995, tBase + tJit));
      const a0 = rand();
      arr.push({ t0, a0, label: DISCIPLINES[k % DISCIPLINES.length] });
    }
    return arr;
  }, []);

  const anchors = labels.map((L, i) => {
    const t = L.t0;
    const a = 2 * Math.PI * (turns * t - phase);
    const x = cx + Math.cos(a) * helixRadius;
    const z = Math.sin(a);
    const y = top + length * t + Math.sin(a) * helixRadius * tilt;
    return { x, y, z, a, t, label: L.label, k: i };
  });

  if (!mounted) {
    return <div ref={rootRef} className="relative w-full" aria-hidden="true" style={{ aspectRatio: `${W} / ${H}` }} />;
  }

  return (
    <div ref={rootRef} className="relative w-full" aria-hidden="true" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: "block" }}>
        {/* BACK helix */}
        {backSegs.map((seg, i) => (
          <path key={`b${i}`} d={ptsToPath(seg)} fill="none" stroke={back} strokeWidth="1" />
        ))}

        {/* BACK-side labels — faint */}
        {anchors.filter(a => a.z < 0).map((a, i) => {
          const op = Math.max(0, 0.22 + a.z * 0.20);
          return (
            <text key={`bt${i}`} x={a.x} y={a.y + 4} textAnchor="middle" opacity={op}
              fontFamily='"Newsreader", Georgia, serif' fontSize="13" fill={fg2}>
              {a.label}
            </text>
          );
        })}

        {/* SPINE */}
        <rect x={cx - spineRadius} y={top} width={spineRadius * 2} height={bot - top} fill={fill} stroke="none" />
        <line x1={cx - spineRadius} y1={top} x2={cx - spineRadius} y2={bot} stroke={stroke} strokeWidth="1.5" />
        <line x1={cx + spineRadius} y1={top} x2={cx + spineRadius} y2={bot} stroke={stroke} strokeWidth="1.5" />
        <path d={`M ${cx - spineRadius} ${bot} A ${spineRadius} ${spineRadius * 0.22} 0 0 0 ${cx + spineRadius} ${bot}`}
          fill="none" stroke={stroke} strokeWidth="1.5" />

        {/* FRONT helix */}
        {front.map((seg, i) => (
          <path key={`f${i}`} d={ptsToPath(seg)} fill="none" stroke={helixColor} strokeWidth="1.25" />
        ))}

        {/* FRONT labels with dot on the line */}
        {anchors.map((a, i) => {
          if (a.z < -0.05) return null;
          const op = a.z < 0.1 ? Math.max(0, (a.z + 0.05) / 0.15) : 1;
          const drift = Math.cos(a.a);
          const labelX = a.x + drift * 6;
          const labelY = a.y - 8;
          return (
            <g key={`ft${i}`} opacity={op}>
              <circle cx={a.x} cy={a.y} r="3" fill={accent} />
              <circle cx={a.x} cy={a.y} r="6" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.4" />
              <text x={labelX} y={labelY} textAnchor="middle"
                fontFamily='"Newsreader", Georgia, serif' fontSize="13" fill={fg}>
                {a.label}
              </text>
            </g>
          );
        })}

        {/* BOLT-HEAD CAP — solid 3D cylinder, drawn last to occlude */}
        <path d={`M ${cx - headRadius} ${headTop - headRy} L ${cx - headRadius} ${headBottom} A ${headRadius} ${headRy} 0 0 0 ${cx + headRadius} ${headBottom} L ${cx + headRadius} ${headTop - headRy} Z`}
          fill={fill} stroke="none" />
        <path d={`M ${cx - headRadius} ${headBottom} A ${headRadius} ${headRy} 0 0 0 ${cx + headRadius} ${headBottom}`}
          fill="none" stroke={stroke} strokeWidth="1.75" />
        <line x1={cx - headRadius} y1={headTop} x2={cx - headRadius} y2={headBottom} stroke={stroke} strokeWidth="1.75" />
        <line x1={cx + headRadius} y1={headTop} x2={cx + headRadius} y2={headBottom} stroke={stroke} strokeWidth="1.75" />
        <ellipse cx={cx} cy={headTop} rx={headRadius} ry={headRy} fill={fill} stroke={stroke} strokeWidth="1.75" />

        <text x={W / 2} y={H - 50} textAnchor="middle"
          fontFamily='"JetBrains Mono", monospace' fontSize="10" letterSpacing="0.32em"
          fill={fg2} style={{ textTransform: "uppercase" }}>
          The operating system holding everything together
        </text>
      </svg>
    </div>
  );
}
