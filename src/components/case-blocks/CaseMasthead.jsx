/**
 * CaseMasthead — meta strip + hero + at-a-glance + lede image.
 *
 * Props mirror the `caseStudy` document's masthead fields. `atGlance`
 * accepts either an array of [k, v] tuples or an array of {k, v} objects
 * (Sanity returns the object form; the prototype used tuples).
 */
import React from 'react';
import {AR_PAPER, AR_INK, AR_INK_400, AR_INK_600, AR_PURPLE, AR_PURPLE_300, AR_WHITE} from './tokens';
import Placeholder from './Placeholder';

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
    <section style={{background: AR_PAPER, padding: '48px clamp(24px,4vw,56px) 80px'}}>
      <div style={{maxWidth: 1440, margin: '0 auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: 24, borderBottom: '1px solid rgba(17,16,16,0.10)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: AR_INK_400}}>
          <span><a href="/work" style={{color: AR_INK, borderBottom: `1px solid ${AR_INK}`, textDecoration: 'none', paddingBottom: 2}}>← Work</a></span>
          <span>Case {caseNo} · {sector} · {tier}</span>
          <span>{dates}</span>
        </div>

        <div style={{padding: '64px 0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end'}}>
          <div>
            {logo
              ? <img src={logo} alt={wordmark} style={{height: 36, filter: 'brightness(0)', opacity: 0.85, marginBottom: 28}} />
              : <div style={{fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: AR_INK, marginBottom: 28}}>{wordmark}</div>}
            <h1 style={{fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 'clamp(56px,8vw,128px)', lineHeight: 0.95, letterSpacing: '-0.028em', margin: 0, color: AR_INK}}>
              {headline}
              {italic && <><br /><span style={{fontStyle: 'italic', color: AR_PURPLE}}>{italic}</span></>}
            </h1>
          </div>
          <div style={{fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.55, color: AR_INK_600, maxWidth: '46ch'}}>
            {lede}
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginTop: 32}}>
          <div style={{position: 'relative', aspectRatio: '5 / 3', background: AR_WHITE, overflow: 'hidden'}}>
            {videoSrc
              ? <video
                  autoPlay loop muted playsInline preload="auto"
                  poster={image}
                  style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}>
                  <source src={videoSrc} type={videoType || 'video/mp4'} />
                </video>
              : image
              ? <img src={image} alt={wordmark} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
              : <Placeholder label="01" caption="Hero image" />}
          </div>
          <div style={{background: AR_PURPLE, color: AR_WHITE, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
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
