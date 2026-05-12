/**
 * CaseMasthead — meta strip + hero + at-a-glance + lede image.
 *
 * Props mirror the `caseStudy` document's masthead fields. `atGlance`
 * accepts either an array of [k, v] tuples or an array of {k, v} objects
 * (Sanity returns the object form; the prototype used tuples).
 *
 * Mobile-first layout: meta strip wraps, headline/lede stack, hero
 * image and at-a-glance card stack vertically.
 */
import React from 'react';
import {AR_PAPER, AR_INK, AR_INK_400, AR_INK_600, AR_PURPLE, AR_PURPLE_300, AR_WHITE} from './tokens';
import Placeholder from './Placeholder';
import CaseVideoPlayer from './CaseVideoPlayer';

export default function CaseMasthead({
  caseNo, sector, tier, dates,
  wordmark, logo,
  headline, italic, lede,
  atGlance = [], image,
  videoSrc, videoType,
}) {
  // Normalize atGlance — accept [[k,v], …] or [{k,v}, …]
  const rows = atGlance.map((r) => Array.isArray(r) ? r : [r.k, r.v]);

  return (
    <section className="px-6 md:px-[clamp(24px,4vw,56px)] pt-8 md:pt-12 pb-14 md:pb-20" style={{background: AR_PAPER}}>
      <div style={{maxWidth: 1440, margin: '0 auto'}}>
        {/* Meta strip — stacks on mobile, single row from md */}
        <div
          className="flex flex-col md:flex-row md:justify-between gap-2 pb-4 md:pb-6 border-b border-ink/10"
          style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: AR_INK_400}}
        >
          <span><a href="/#work" style={{color: AR_INK, borderBottom: `1px solid ${AR_INK}`, textDecoration: 'none', paddingBottom: 2}}>← Work</a></span>
          <span>Case {caseNo} · {sector} · {tier}</span>
          <span>{dates}</span>
        </div>

        {/* Wordmark/headline + lede — stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end" style={{padding: '40px 0 32px'}}>
          <div>
            {logo
              ? <img src={logo} alt={wordmark} className="h-12 md:h-[72px] mb-5 md:mb-7" style={{filter: 'brightness(0)', opacity: 0.85, maxWidth: '70%'}} />
              : <div className="mb-5 md:mb-7" style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: AR_INK}}>{wordmark}</div>}
            <h1 style={{fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 'clamp(40px, 9vw, 128px)', lineHeight: 0.95, letterSpacing: '-0.028em', margin: 0, color: AR_INK}}>
              {headline}
              {italic && <><br /><span style={{fontStyle: 'italic', color: AR_PURPLE}}>{italic}</span></>}
            </h1>
          </div>
          <div className="text-base md:text-[19px]" style={{fontFamily: '"Newsreader", Georgia, serif', lineHeight: 1.55, color: AR_INK_600, maxWidth: '46ch', whiteSpace: 'pre-line'}}>
            {lede}
          </div>
        </div>

        {/* Hero image + at-a-glance card — stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 md:gap-6 mt-6 md:mt-8">
          <div style={{position: 'relative', aspectRatio: '5 / 3', background: AR_WHITE, overflow: 'hidden'}}>
            {videoSrc
              ? <CaseVideoPlayer src={videoSrc} type={videoType} poster={image} fit="cover" />
              : image
              ? <img src={image} alt={wordmark} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
              : <Placeholder label="01" caption="Hero image" />}
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-between" style={{background: AR_PURPLE, color: AR_WHITE}}>
            <div>
              <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: AR_PURPLE_300}}>At a glance</div>
              <div style={{marginTop: 20, fontFamily: '"Newsreader", Georgia, serif', fontSize: 14, lineHeight: 1.55}}>
                {rows.map(([k, v], i) => (
                  <div key={i} style={{marginTop: i === 0 ? 0 : 14}}>
                    <strong style={{fontWeight: 600}}>{k}</strong><br />{v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
