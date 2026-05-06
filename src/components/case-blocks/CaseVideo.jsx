/**
 * CaseVideo — full-bleed (or contained) looping video section.
 * Renders <videoBlock> from the case-study body.
 */
import React from 'react';
import { AR_INK, AR_INK_400, AR_PAPER, AR_WHITE } from './tokens';
import CaseSectionHeader from './CaseSectionHeader';

export default function CaseVideo({
  n = '07',
  kicker = 'Watch',
  title,
  lede,
  videoSrc,
  videoType,
  posterSrc,
  ratio = '16/9',
  fullBleed = false,
  caption,
}) {
  if (!videoSrc) return null;

  const inner = (
    <div style={{ position: 'relative', aspectRatio: ratio, background: AR_INK, overflow: 'hidden' }}>
      <video
        autoPlay loop muted playsInline preload="auto"
        poster={posterSrc || undefined}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={videoSrc} type={videoType || 'video/mp4'} />
      </video>
    </div>
  );

  return (
    <section style={{ background: AR_PAPER, padding: '88px clamp(24px,4vw,56px)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <CaseSectionHeader n={n} kicker={kicker} title={title} lede={lede} />
        {fullBleed ? (
          <div style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
            {inner}
          </div>
        ) : (
          inner
        )}
        {caption && (
          <div style={{
            marginTop: 14,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: AR_INK_400,
          }}>{caption}</div>
        )}
      </div>
    </section>
  );
}
