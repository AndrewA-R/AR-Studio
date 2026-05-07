"use client";
/**
 * CaseVideoPlayer — autoplay-loop muted video with a corner unmute toggle
 * and click-the-video-to-toggle. Intended to live inside an absolutely
 * positioned container (figure, masthead hero box, etc.) so the player
 * fills it edge-to-edge.
 *
 * Browser autoplay policy requires `muted` initially. After the user
 * unmutes, we explicitly call play() to keep the timeline going (some
 * browsers pause briefly on the muted→unmuted transition).
 */
import { useEffect, useRef, useState } from 'react';

export default function CaseVideoPlayer({
  src,
  type = 'video/mp4',
  poster,
  fit = 'cover',
  showButton = true,
}) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);

  // Sync DOM muted state in case React's prop diff doesn't take (Safari quirk)
  useEffect(() => { if (ref.current) ref.current.muted = muted; }, [muted]);

  const toggle = (e) => {
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    setMuted((prev) => {
      const next = !prev;
      const v = ref.current;
      if (v) {
        v.muted = next;
        // Ensure playback resumes after unmute; ignore the rare rejection
        // (e.g. user has motion-reduction enabled and already paused).
        v.play?.().catch(() => {});
      }
      return next;
    });
  };

  return (
    <>
      <video
        ref={ref}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster || undefined}
        onClick={toggle}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: fit,
          cursor: 'pointer',
        }}
      >
        <source src={src} type={type} />
      </video>

      {showButton && (
        <button
          type="button"
          onClick={toggle}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            width: 36,
            height: 36,
            borderRadius: 999,
            background: 'rgba(20,18,43,0.72)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            color: '#FDFCF8',
            border: '1px solid rgba(253,252,248,0.18)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            zIndex: 2,
            transition: 'background 120ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(20,18,43,0.9)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20,18,43,0.72)'; }}
        >
          {/* Speaker icon — slash through it when muted */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="currentColor" />
            {muted ? (
              <>
                <line x1="22" y1="9" x2="16" y2="15" />
                <line x1="16" y1="9" x2="22" y2="15" />
              </>
            ) : (
              <>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </>
            )}
          </svg>
        </button>
      )}
    </>
  );
}
