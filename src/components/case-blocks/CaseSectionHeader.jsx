/**
 * CaseSectionHeader — kicker + §number + display title used by every block.
 */
import React from 'react';
import {AR_INK, AR_INK_600, AR_PURPLE, AR_PURPLE_300, AR_WHITE} from './tokens';

export default function CaseSectionHeader({n, kicker, title, lede, dark = false, align = 'split'}) {
  const fg = dark ? AR_WHITE : AR_INK;
  const dim = dark ? 'rgba(253,252,248,0.7)' : AR_INK_600;
  const accent = dark ? AR_PURPLE_300 : AR_PURPLE;
  if (!title && !kicker) return null;
  // Fixed pixel widths for the title + lede so every section header lines up
  // identically across blocks regardless of how many characters are in the
  // title. text-wrap: balance evens out line breaks visually.
  const TITLE_MAX = 760;
  const LEDE_MAX = 620;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: align === 'split' ? '1fr 2fr' : '1fr',
      gap: 56, alignItems: 'baseline', marginBottom: 40,
    }}>
      <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, display: 'flex', alignItems: 'center', gap: 10}}>
        {n && <span style={{opacity: 0.6}}>§{n}</span>}
        <span>{kicker}</span>
      </div>
      <div>
        {title && (
          <h2 style={{
            fontFamily: '"Instrument Serif", serif',
            fontWeight: 400,
            fontSize: 'clamp(34px,4vw,56px)',
            lineHeight: 1.04,
            letterSpacing: '-0.018em',
            margin: 0,
            color: fg,
            maxWidth: TITLE_MAX,
            textWrap: 'balance',
          }}>
            {title}
          </h2>
        )}
        {lede && (
          <div style={{
            marginTop: 18,
            fontFamily: '"Newsreader", Georgia, serif',
            fontSize: 17,
            lineHeight: 1.55,
            color: dim,
            maxWidth: LEDE_MAX,
          }}>{lede}</div>
        )}
      </div>
    </div>
  );
}
