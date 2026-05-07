/**
 * CaseCTA — closer that always sits before the site footer.
 */
import React from 'react';
import {AR_PURPLE_INK, AR_PURPLE_300, AR_WHITE} from './tokens';

export default function CaseCTA({headline = 'A similar problem at your', italic = 'shop?', body, href = '/contact'}) {
  return (
    <section style={{background: AR_PURPLE_INK, color: AR_WHITE, padding: '96px clamp(24px,4vw,56px)'}}>
      <div style={{maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center'}}>
        <h2 style={{fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 'clamp(44px,6vw,88px)', lineHeight: 1, letterSpacing: '-0.02em', margin: 0, maxWidth: '14ch'}}>
          {headline} <span style={{fontStyle: 'italic', color: AR_PURPLE_300}}>{italic}</span>
        </h2>
        <div>
          <div style={{fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.6, color: 'rgba(253,252,248,0.8)', maxWidth: '46ch', whiteSpace: 'pre-line'}}>
            {body || "Most engagements start with a single conversation. No brief required. If there's a fit, we'll tell you. If there isn't, we'll tell you that too."}
          </div>
          <a href={href} style={{marginTop: 24, display: 'inline-block', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, padding: '14px 22px', background: AR_WHITE, color: AR_PURPLE_INK, textDecoration: 'none', border: 'none'}}>Start a conversation →</a>
        </div>
      </div>
    </section>
  );
}
