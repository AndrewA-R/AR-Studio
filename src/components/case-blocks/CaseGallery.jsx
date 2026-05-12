/**
 * CaseGallery — modular bento grid for 6–20 assets.
 *
 * Two modes: flat `items` or chaptered `chapters`. Engine groups items
 * into 12-col rows, computes each item's natural height by ratio, and
 * forces every item in a row to share the row's tallest height — so
 * mixed ratios still produce a gap-free grid.
 */
import React from 'react';
import {AR_INK, AR_PAPER, AR_PURPLE, AR_PURPLE_300, AR_PURPLE_INK, AR_WHITE} from './tokens';
import CaseSectionHeader from './CaseSectionHeader';
import Placeholder from './Placeholder';
import CaseVideoPlayer from './CaseVideoPlayer';

const COL_GUTTER = 12;
const ROW_UNIT   = 24;
const TOTAL_COLS = 12;
const CONTAINER_W = 1440 - 24 * 2;
const TRACK_W = (CONTAINER_W - COL_GUTTER * (TOTAL_COLS - 1)) / TOTAL_COLS;

function naturalSpan(span, ratio) {
  const [rw, rh] = (ratio || '4/3').split('/').map(Number);
  const colsW = TRACK_W * span + COL_GUTTER * (span - 1);
  const heightPx = colsW * (rh / rw);
  return Math.max(1, Math.round((heightPx + COL_GUTTER) / (ROW_UNIT + COL_GUTTER)));
}

function GalleryGrid({items = [], dark}) {
  const rowSpans = new Array(items.length).fill(1);
  let cursor = 0;
  let rowStart = 0;
  for (let i = 0; i < items.length; i++) {
    const span = items[i].span || 4;
    rowSpans[i] = naturalSpan(span, items[i].ratio);
    cursor += span;
    if (cursor >= TOTAL_COLS || i === items.length - 1) {
      let max = 0;
      for (let k = rowStart; k <= i; k++) if (rowSpans[k] > max) max = rowSpans[k];
      for (let k = rowStart; k <= i; k++) rowSpans[k] = max;
      rowStart = i + 1;
      cursor = 0;
    }
  }

  return (
    <div className="case-gallery" style={{display: 'grid', gridTemplateColumns: `repeat(${TOTAL_COLS}, 1fr)`, gridAutoRows: `${ROW_UNIT}px`, gap: COL_GUTTER}}>
      {items.map((it, i) => {
        const span = it.span || 4;
        const imgSrc = it.src || it.image?.asset?.url || (typeof it.image === 'string' ? it.image : null);
        const videoSrc = it.videoSrc || it.video?.asset?.url || null;
        const videoType = it.videoType || it.video?.asset?.mimeType || 'video/mp4';
        const hasMedia = videoSrc || imgSrc;
        return (
          <figure key={i} style={{
            gridColumn: `span ${span}`,
            gridRow: `span ${rowSpans[i]}`,
            ['--gallery-item-ratio']: it.ratio || '4/3',
            margin: 0, position: 'relative', overflow: 'hidden',
            background: dark ? AR_PURPLE_INK : AR_WHITE,
            border: `1px solid ${dark ? 'rgba(253,252,248,0.14)' : 'rgba(17,16,16,0.10)'}`,
          }}>
            {videoSrc
              ? <CaseVideoPlayer src={videoSrc} type={videoType} poster={imgSrc} fit="cover" />
              : imgSrc
              ? <img src={imgSrc} alt={it.caption || ''} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />
              : <Placeholder label={it.label || String(i + 1).padStart(2, '0')} caption={it.caption} dark={dark} />}
            {it.caption && hasMedia && (
              <figcaption style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: AR_WHITE, background: 'linear-gradient(180deg, rgba(20,18,43,0) 0%, rgba(20,18,43,0.85) 100%)',
              }}>{it.caption}</figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}

export default function CaseGallery({n = '05', kicker = 'Executions', title, lede, items, chapters, dark = false}) {
  const bg = dark ? AR_INK : AR_PAPER;
  const fg = dark ? AR_WHITE : AR_INK;
  return (
    <section className="py-14 md:py-[88px] px-6 md:px-[clamp(24px,4vw,56px)]" style={{background: bg, color: fg}}>
      <div style={{maxWidth: 1440, margin: '0 auto'}}>
        <CaseSectionHeader n={n} kicker={kicker} title={title} lede={lede} dark={dark} />
        {chapters && chapters.length
          ? chapters.map((c, ci) => (
              <div key={ci} style={{marginTop: ci === 0 ? 16 : 56}}>
                <div className="flex flex-wrap items-baseline gap-3 md:gap-4 pb-3 mb-4 border-b" style={{
                  borderColor: dark ? 'rgba(253,252,248,0.18)' : 'rgba(17,16,16,0.14)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: dark ? AR_PURPLE_300 : AR_PURPLE,
                }}>
                  <span>Chapter {String(ci + 1).padStart(2, '0')}</span>
                  <span style={{color: fg, fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 18, letterSpacing: 0, textTransform: 'none'}}>{c.title}</span>
                  <span className="md:ml-auto w-full md:w-auto">{c.note}</span>
                </div>
                <GalleryGrid items={c.items} dark={dark} />
              </div>
            ))
          : <GalleryGrid items={items} dark={dark} />}
      </div>
    </section>
  );
}
