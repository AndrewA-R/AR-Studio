/**
 * CaseCTA — closer that always sits before the site footer.
 */
import React from 'react';
import {AR_PURPLE_INK, AR_PURPLE_300, AR_WHITE} from './tokens';

export default function CaseCTA({headline = 'A similar problem at your', italic = 'shop?', body, href = '/contact'}) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-[clamp(24px,4vw,56px)]" style={{background: AR_PURPLE_INK, color: AR_WHITE}}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center" style={{maxWidth: 1440, margin: '0 auto'}}>
        <h2 style={{fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 'clamp(36px, 9vw, 88px)', lineHeight: 1, letterSpacing: '-0.02em', margin: 0, maxWidth: '14ch'}}>
          {headline} <span style={{fontStyle: 'italic', color: AR_PURPLE_300}}>{italic}</span>
        </h2>
        <div>
          <div className="text-[17px] md:text-[19px]" style={{fontFamily: '"Newsreader", Georgia, serif', lineHeight: 1.6, color: 'rgba(253,252,248,0.8)', maxWidth: '46ch', whiteSpace: 'pre-line'}}>
            {body || "Let’s chat! (no pressure)"}
          </div>
          <a href={href} style={{marginTop: 24, display: 'inline-block', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, padding: '14px 22px', background: AR_WHITE, color: AR_PURPLE_INK, textDecoration: 'none', border: 'none'}}>Start a conversation →</a>
        </div>
      </div>
    </section>
  );
}
