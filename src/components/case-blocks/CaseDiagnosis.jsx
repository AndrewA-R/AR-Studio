/**
 * CaseDiagnosis — long-form prose with optional callout box.
 */
import React from 'react';
import {AR_PAPER, AR_INK, AR_INK_600, AR_PURPLE} from './tokens';
import CaseSectionHeader from './CaseSectionHeader';

export default function CaseDiagnosis({n = '04', kicker = 'Diagnosis', title, paragraphs = [], callout}) {
  return (
    <section className="py-24 md:py-[88px] px-6 md:px-[clamp(24px,4vw,56px)]" style={{background: AR_PAPER}}>
      <div style={{maxWidth: 1440, margin: '0 auto'}}>
        <CaseSectionHeader n={n} kicker={kicker} title={title} />
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-16 items-start">
          <div>
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[17px] md:text-[19px]" style={{fontFamily: '"Newsreader", Georgia, serif', lineHeight: 1.65, color: i === 0 ? AR_INK : AR_INK_600, margin: '0 0 24px', maxWidth: '60ch', whiteSpace: 'pre-line'}}>{p}</p>
            ))}
          </div>
          {callout && (
            <div style={{borderTop: `2px solid ${AR_INK}`, paddingTop: 24}}>
              <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: AR_PURPLE, marginBottom: 12}}>{callout.label}</div>
              <div className="text-[18px] md:text-[22px]" style={{fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', lineHeight: 1.3, color: AR_INK}}>{callout.body}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
