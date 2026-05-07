/**
 * CaseBrandSystem — palette + display/body type pair + layout templates.
 */
import React from 'react';
import {AR_INK, AR_INK_400, AR_PAPER, AR_WHITE} from './tokens';
import CaseSectionHeader from './CaseSectionHeader';
import Placeholder from './Placeholder';
import CaseVideoPlayer from './CaseVideoPlayer';

export default function CaseBrandSystem({n = '06', kicker = 'The system', title, body, palette = [], typography, layoutSlots, templates, logoSrc}) {
  // Prefer the new `templates` array (each item has label + image). Fall
  // back to the legacy `layoutSlots` (labels only) for any pre-migration content.
  const tmpls = Array.isArray(templates) && templates.length
    ? templates
    : (layoutSlots || ['01', '02', '03']).map((id) => ({label: id}));

  return (
    <section style={{background: AR_PAPER, padding: '88px clamp(24px,4vw,56px)'}}>
      <div style={{maxWidth: 1440, margin: '0 auto'}}>
        <CaseSectionHeader n={n} kicker={kicker} title={title} lede={body} />
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16, marginTop: 24}}>
          {/* Logo / wordmark slot — uploaded image, or a placeholder */}
          <div style={{gridColumn: 'span 4', aspectRatio: '4/3', background: AR_WHITE, border: '1px solid rgba(17,16,16,0.14)', position: 'relative', overflow: 'hidden'}}>
            {logoSrc
              ? <img src={logoSrc} alt="Logo / wordmark" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: 24}} />
              : <Placeholder label="L1" caption="Logo / wordmark" />}
          </div>
          {/* Palette swatches */}
          <div style={{gridColumn: 'span 4', aspectRatio: '4/3', display: 'grid', gridTemplateColumns: `repeat(${Math.max(palette.length, 1)}, 1fr)`}}>
            {palette.map((c, i) => (
              <div key={i} style={{background: c.hex, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 12, color: c.fg || AR_WHITE}}>
                <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.85}}>{c.name}</div>
                <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.1em', opacity: 0.7}}>{c.hex}</div>
              </div>
            ))}
          </div>
          {typography && (
            <div style={{gridColumn: 'span 4', aspectRatio: '4/3', background: AR_WHITE, border: '1px solid rgba(17,16,16,0.14)', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <div>
                <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: AR_INK_400}}>Display</div>
                <div style={{fontFamily: typography.display?.family, fontWeight: typography.display?.weight || 400, fontStyle: typography.display?.italic ? 'italic' : 'normal', fontSize: 56, lineHeight: 0.95, letterSpacing: '-0.02em', color: AR_INK, marginTop: 4}}>{typography.display?.sample || 'Aa'}</div>
                <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.14em', color: AR_INK_400, marginTop: 6}}>{typography.display?.label}</div>
              </div>
              <div>
                <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: AR_INK_400}}>Body</div>
                <div style={{fontFamily: typography.body?.family, fontSize: 16, lineHeight: 1.4, color: AR_INK, marginTop: 4}}>{typography.body?.sample || 'The quick brown fox.'}</div>
                <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.14em', color: AR_INK_400, marginTop: 6}}>{typography.body?.label}</div>
              </div>
            </div>
          )}
          {/* Layout templates — uploaded video, image, or a labelled placeholder */}
          {tmpls.map((t, i) => {
            const imgSrc = t.src || t.image?.asset?.url || (typeof t.image === 'string' ? t.image : null);
            const videoSrc = t.videoSrc || t.video?.asset?.url || null;
            const videoType = t.videoType || t.video?.asset?.mimeType || 'video/mp4';
            const label = t.label || `T${i + 1}`;
            return (
              <div key={i} style={{gridColumn: 'span 4', aspectRatio: '4/5', border: '1px solid rgba(17,16,16,0.14)', position: 'relative', overflow: 'hidden', background: AR_WHITE}}>
                {videoSrc
                  ? <CaseVideoPlayer src={videoSrc} type={videoType} poster={imgSrc} fit="cover" />
                  : imgSrc
                  ? <img src={imgSrc} alt={t.caption || label} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />
                  : <Placeholder label={label} caption={t.caption || 'Layout template'} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
