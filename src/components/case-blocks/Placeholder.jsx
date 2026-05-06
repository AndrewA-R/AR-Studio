/**
 * Placeholder — numbered grey block w/ caption.
 *
 * Renders when a gallery item or hero has no image yet. Lets authors
 * compose pages in Sanity before assets are uploaded.
 */
import React from 'react';

export default function Placeholder({label, caption, dark = false}) {
  const bg = dark ? '#1B103F' : '#E8E5DD';
  const fg = dark ? 'rgba(253,252,248,0.55)' : 'rgba(17,16,16,0.55)';
  const stroke = dark ? 'rgba(253,252,248,0.1)' : 'rgba(17,16,16,0.08)';
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: bg,
      backgroundImage: `repeating-linear-gradient(135deg, ${stroke} 0 12px, transparent 12px 24px)`,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: 14, color: fg, fontFamily: 'JetBrains Mono, monospace',
    }}>
      <div style={{fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase'}}>№ {label}</div>
      {caption && <div style={{fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', maxWidth: '24ch'}}>{caption}</div>}
    </div>
  );
}
