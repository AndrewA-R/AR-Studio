/**
 * CaseGallery — modular bento grid for 6–20 assets.
 *
 * Desktop: 12-col bento with per-item span + ratio.
 * Mobile: 2-up thumbnail grid; tapping a thumbnail opens a lightbox that
 *   displays the asset at full size (and autoplays if it's a video).
 */
"use client";
import React, { useEffect, useMemo, useState } from 'react';
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

function resolveMedia(it) {
  const imgSrc = it.src || it.image?.asset?.url || (typeof it.image === 'string' ? it.image : null);
  const videoSrc = it.videoSrc || it.video?.asset?.url || null;
  const videoType = it.videoType || it.video?.asset?.mimeType || 'video/mp4';
  return {imgSrc, videoSrc, videoType};
}

function Lightbox({items, openIdx, setOpenIdx}) {
  const onClose = () => setOpenIdx(null);
  const onPrev = () => setOpenIdx((i) => (i > 0 ? i - 1 : i));
  const onNext = () => setOpenIdx((i) => (i < items.length - 1 ? i + 1 : i));

  // Lock body scroll while open and bind keyboard nav.
  useEffect(() => {
    if (openIdx === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [openIdx]);

  if (openIdx === null) return null;
  const it = items[openIdx];
  const {imgSrc, videoSrc, videoType} = resolveMedia(it);
  const ratio = it.ratio || '4/3';

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(17,16,16,0.92)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          width: 44, height: 44, background: 'transparent', border: 'none',
          color: AR_WHITE, fontSize: 28, lineHeight: 1, cursor: 'pointer',
        }}
      >×</button>

      {openIdx > 0 && (
        <button
          type="button" aria-label="Previous"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{
            position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
            zIndex: 2, width: 44, height: 44, background: 'rgba(0,0,0,0.4)',
            border: 'none', color: AR_WHITE, fontSize: 24, cursor: 'pointer',
          }}
        >‹</button>
      )}
      {openIdx < items.length - 1 && (
        <button
          type="button" aria-label="Next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{
            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
            zIndex: 2, width: 44, height: 44, background: 'rgba(0,0,0,0.4)',
            border: 'none', color: AR_WHITE, fontSize: 24, cursor: 'pointer',
          }}
        >›</button>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '60px 16px 80px',
        }}
      >
        <div style={{maxWidth: 'min(1200px, 100%)', width: '100%', maxHeight: '100%', aspectRatio: ratio, position: 'relative'}}>
          {videoSrc
            ? <CaseVideoPlayer key={videoSrc} src={videoSrc} type={videoType} poster={imgSrc} fit="contain" />
            : imgSrc
            ? <img src={imgSrc} alt={it.caption || ''} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain'}} />
            : null}
        </div>
      </div>
      {it.caption && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', bottom: 16, left: 0, right: 0, padding: '0 24px',
            textAlign: 'center', fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: AR_WHITE,
          }}
        >{it.caption}</div>
      )}
    </div>
  );
}

function GalleryGrid({items = [], dark}) {
  const [openIdx, setOpenIdx] = useState(null);

  // Precompute desktop row spans so the bento grid stays tight.
  const rowSpans = useMemo(() => {
    const arr = new Array(items.length).fill(1);
    let cursor = 0;
    let rowStart = 0;
    for (let i = 0; i < items.length; i++) {
      const span = items[i].span || 4;
      arr[i] = naturalSpan(span, items[i].ratio);
      cursor += span;
      if (cursor >= TOTAL_COLS || i === items.length - 1) {
        let max = 0;
        for (let k = rowStart; k <= i; k++) if (arr[k] > max) max = arr[k];
        for (let k = rowStart; k <= i; k++) arr[k] = max;
        rowStart = i + 1;
        cursor = 0;
      }
    }
    return arr;
  }, [items]);

  return (
    <>
      <div className="case-gallery" style={{display: 'grid', gridTemplateColumns: `repeat(${TOTAL_COLS}, 1fr)`, gridAutoRows: `${ROW_UNIT}px`, gap: COL_GUTTER}}>
        {items.map((it, i) => {
          const span = it.span || 4;
          const {imgSrc, videoSrc, videoType} = resolveMedia(it);
          const hasMedia = videoSrc || imgSrc;
          return (
            <figure
              key={i}
              onClick={() => hasMedia && setOpenIdx(i)}
              style={{
                gridColumn: `span ${span}`,
                gridRow: `span ${rowSpans[i]}`,
                ['--gallery-item-ratio']: it.ratio || '4/3',
                margin: 0, position: 'relative', overflow: 'hidden',
                background: dark ? AR_PURPLE_INK : AR_WHITE,
                border: `1px solid ${dark ? 'rgba(253,252,248,0.14)' : 'rgba(17,16,16,0.10)'}`,
                cursor: hasMedia ? 'pointer' : 'default',
              }}>
              {videoSrc
                ? <CaseVideoPlayer src={videoSrc} type={videoType} poster={imgSrc} fit="cover" muted />
                : imgSrc
                ? <img src={imgSrc} alt={it.caption || ''} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />
                : <Placeholder label={it.label || String(i + 1).padStart(2, '0')} caption={it.caption} dark={dark} />}
              {videoSrc && (
                <span
                  aria-hidden
                  style={{
                    position: 'absolute', top: 8, right: 8,
                    width: 28, height: 28, borderRadius: 14,
                    background: 'rgba(0,0,0,0.55)', color: AR_WHITE,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, paddingLeft: 2,
                  }}
                >▶</span>
              )}
              {it.caption && hasMedia && (
                <figcaption style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: AR_WHITE, background: 'linear-gradient(180deg, rgba(20,18,43,0) 0%, rgba(20,18,43,0.85) 100%)',
                  pointerEvents: 'none',
                }}>{it.caption}</figcaption>
              )}
            </figure>
          );
        })}
      </div>
      <Lightbox items={items} openIdx={openIdx} setOpenIdx={setOpenIdx} />
    </>
  );
}

export default function CaseGallery({n = '05', kicker = 'Executions', title, lede, items, chapters, dark = false}) {
  const bg = dark ? AR_INK : AR_PAPER;
  const fg = dark ? AR_WHITE : AR_INK;
  return (
    <section className="py-8 md:py-[88px] px-6 md:px-[clamp(24px,4vw,56px)]" style={{background: bg, color: fg}}>
      <div style={{maxWidth: 1440, margin: '0 auto'}}>
        <CaseSectionHeader n={n} kicker={kicker} title={title} lede={lede} dark={dark} />
        {chapters && chapters.length
          ? chapters.map((c, ci) => {
              const showChapterNumber = chapters.length > 1;
              return (
                <div key={ci} style={{marginTop: ci === 0 ? 16 : 56}}>
                  <div className="flex flex-wrap items-baseline gap-3 md:gap-4 pb-3 mb-4 border-b" style={{
                    borderColor: dark ? 'rgba(253,252,248,0.18)' : 'rgba(17,16,16,0.14)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: dark ? AR_PURPLE_300 : AR_PURPLE,
                  }}>
                    {showChapterNumber && <span>Chapter {String(ci + 1).padStart(2, '0')}</span>}
                    {c.title && <span style={{color: fg, fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 18, letterSpacing: 0, textTransform: 'none'}}>{c.title}</span>}
                    {c.note && <span className="md:ml-auto w-full md:w-auto">{c.note}</span>}
                  </div>
                  <GalleryGrid items={c.items} dark={dark} />
                </div>
              );
            })
          : <GalleryGrid items={items} dark={dark} />}
      </div>
    </section>
  );
}
