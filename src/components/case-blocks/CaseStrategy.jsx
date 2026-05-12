/**
 * CaseStrategy — argument-text section with optional positioning pull
 * and an optional 4-row framework table.
 */
import React from 'react';
import {AR_PAPER, AR_INK, AR_INK_600, AR_PURPLE, AR_PURPLE_INK, AR_PURPLE_300, AR_WHITE} from './tokens';
import CaseSectionHeader from './CaseSectionHeader';

export default function CaseStrategy({n = '03', kicker = 'Strategy', title, body, positioning, framework, imageSrc, imageRatio = '4/5', imageCaption, flip = false, dark = false}) {
  const bg = dark ? AR_PURPLE_INK : AR_PAPER;
  const fg = dark ? AR_WHITE : AR_INK;
  const dim = dark ? 'rgba(253,252,248,0.72)' : AR_INK_600;
  const rule = dark ? 'rgba(253,252,248,0.18)' : 'rgba(17,16,16,0.14)';
  const accent = dark ? AR_PURPLE_300 : AR_PURPLE;
  return (
    <section className="py-24 md:py-[88px] px-6 md:px-[clamp(24px,4vw,56px)]" style={{background: bg, color: fg}}>
      <div style={{maxWidth: 1440, margin: '0 auto'}}>
        <CaseSectionHeader n={n} kicker={kicker} title={title} dark={dark} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          <div style={{order: flip ? 2 : 1}}>
            <p className="text-[17px] md:text-[19px]" style={{fontFamily: '"Newsreader", Georgia, serif', lineHeight: 1.65, color: fg, margin: 0, maxWidth: '44ch', whiteSpace: 'pre-line'}}>{body}</p>
            {positioning && (
              <div style={{marginTop: 32, padding: 24, borderLeft: `2px solid ${accent}`}}>
                <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: 10}}>Positioning</div>
                <div style={{fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 24, lineHeight: 1.3, letterSpacing: '-0.012em', color: fg, maxWidth: '36ch'}}>{positioning}</div>
              </div>
            )}
          </div>
          {imageSrc ? (
            <figure style={{margin: 0, order: flip ? 1 : 2}}>
              <div style={{aspectRatio: imageRatio, width: '100%', overflow: 'hidden', background: dark ? 'rgba(253,252,248,0.04)' : 'rgba(17,16,16,0.04)'}}>
                <img src={imageSrc} alt={imageCaption || ''} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
              </div>
              {imageCaption && (
                <figcaption style={{marginTop: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: dim}}>{imageCaption}</figcaption>
              )}
            </figure>
          ) : framework && (
            <div style={{borderTop: `1px solid ${rule}`, borderLeft: `1px solid ${rule}`, order: flip ? 1 : 2}}>
              {framework.map((row, i) => (
                <div key={i} style={{display: 'grid', gridTemplateColumns: '120px 1fr', borderRight: `1px solid ${rule}`, borderBottom: `1px solid ${rule}`}}>
                  <div style={{padding: '18px 16px', borderRight: `1px solid ${rule}`, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: accent}}>{row.label}</div>
                  <div style={{padding: '18px 20px', fontFamily: '"Newsreader", Georgia, serif', fontSize: 15, lineHeight: 1.5, color: dim}}>
                    {(row.lines || []).map((l, j) => <div key={j}>{l}</div>)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
