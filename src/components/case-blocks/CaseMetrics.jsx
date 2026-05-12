/**
 * CaseMetrics — three-number result strip.
 *
 * `items` is an array of {num, unit, label, note}. Accepts the legacy
 * tuple form `[num, unit, label, note]` for compatibility with the
 * prototype.
 */
import React from 'react';
import {AR_INK, AR_INK_400, AR_INK_600, AR_PURPLE, AR_WHITE} from './tokens';
import CaseSectionHeader from './CaseSectionHeader';

export default function CaseMetrics({n = '02', kicker = 'The signal', title, lede, footnote, items = []}) {
  const rows = items.map((it) => Array.isArray(it)
    ? {num: it[0], unit: it[1], label: it[2], note: it[3]}
    : it);

  return (
    <section className="py-8 md:py-[88px] px-6 md:px-[clamp(24px,4vw,56px)]" style={{background: AR_WHITE}}>
      <div style={{maxWidth: 1440, margin: '0 auto'}}>
        <CaseSectionHeader n={n} kicker={kicker} title={title} lede={lede} />
        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{borderTop: `2px solid ${AR_INK}`, borderBottom: `2px solid ${AR_INK}`}}
        >
          {rows.map(({num, unit, label, note}, i) => (
            <div
              key={i}
              className={`p-7 md:p-10 ${i > 0 ? 'border-t sm:border-t-0 sm:border-l' : ''} border-ink/10`}
            >
              <div style={{display: 'flex', alignItems: 'baseline', gap: 4}}>
                <span style={{fontFamily: '"Instrument Serif", serif', fontSize: 'clamp(48px, 12vw, 104px)', color: AR_PURPLE, lineHeight: 0.95, letterSpacing: '-0.022em'}}>{num}</span>
                {unit && <span style={{fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 'clamp(32px, 8vw, 72px)', color: AR_PURPLE, lineHeight: 0.95}}>{unit}</span>}
              </div>
              <div style={{marginTop: 14, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: AR_INK}}>{label}</div>
              <div style={{marginTop: 10, fontFamily: '"Newsreader", Georgia, serif', fontSize: 14, lineHeight: 1.55, color: AR_INK_600, maxWidth: '32ch'}}>{note}</div>
            </div>
          ))}
        </div>
        {footnote && (
          <div style={{marginTop: 18, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: AR_INK_400}}>{footnote}</div>
        )}
      </div>
    </section>
  );
}
