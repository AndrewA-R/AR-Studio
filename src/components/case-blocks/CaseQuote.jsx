/**
 * CaseQuote — full-bleed pull quote on dark ground.
 */
import React from 'react';
import {AR_INK, AR_PURPLE_300, AR_WHITE} from './tokens';

export default function CaseQuote({quote, attribution, role}) {
  return (
    <section style={{background: AR_INK, color: AR_WHITE, padding: '96px clamp(24px,4vw,56px)'}}>
      <div style={{maxWidth: 1100, margin: '0 auto'}}>
        <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: AR_PURPLE_300, marginBottom: 28}}>From the client ↓</div>
        <blockquote style={{margin: 0, fontFamily: '"Instrument Serif", serif', fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1.12, letterSpacing: '-0.018em', fontStyle: 'italic', color: AR_WHITE, maxWidth: '24ch'}}>
          “{quote}”
        </blockquote>
        <div style={{marginTop: 32, paddingTop: 16, borderTop: '1px solid rgba(253,252,248,0.2)', display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(253,252,248,0.7)'}}>
          <span>{attribution}</span>
          <span>{role}</span>
        </div>
      </div>
    </section>
  );
}
