/**
 * CaseQuote — full-bleed pull quote on dark ground.
 */
import React from 'react';
import {AR_INK, AR_PURPLE_300, AR_WHITE} from './tokens';

export default function CaseQuote({quote, attribution, role}) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-[clamp(24px,4vw,56px)]" style={{background: AR_INK, color: AR_WHITE}}>
      <div style={{maxWidth: 1100, margin: '0 auto'}}>
        <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: AR_PURPLE_300, marginBottom: 28}}>From the client ↓</div>
        <blockquote style={{margin: 0, fontFamily: '"Instrument Serif", serif', fontSize: 'clamp(26px, 7vw, 60px)', lineHeight: 1.12, letterSpacing: '-0.018em', fontStyle: 'italic', color: AR_WHITE, maxWidth: '24ch'}}>
          “{quote}”
        </blockquote>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-8 pt-4 border-t border-bone/20" style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(253,252,248,0.7)'}}>
          <span>{attribution}</span>
          <span>{role}</span>
        </div>
      </div>
    </section>
  );
}
