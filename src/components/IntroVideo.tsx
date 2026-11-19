import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Maximize2,
  Minimize2,
  ExternalLink,
  ArrowRight,
  SkipForward,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { STATIC_ASSETS } from '../data/staticAssets';

const YOUTUBE_VIDEO_ID = 'cEFkZaFp9xU';
const YOUTUBE_WATCH_URL = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`;

interface IntroVideoProps {
  onStartExplore: () => void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        config: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: { playVideo: () => void } }) => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => {
        destroy: () => void;
        playVideo: () => void;
        seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
      };
      PlayerState?: {
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ onStartExplore }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [embedError, setEmbedError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const playerShellRef = useRef<HTMLDivElement | null>(null);
  const playerMountRef = useRef<HTMLDivElement | null>(null);
  const ytPlayerRef = useRef<{
    destroy: () => void;
    playVideo: () => void;
    seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  } | null>(null);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  useEffect(() => {
    if (!hasStarted || embedError) return;

    let cancelled = false;

    const mountPlayer = () => {
      if (cancelled || !playerMountRef.current || !window.YT?.Player) return;

      // Clear any previous instance
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // ignore
        }
        ytPlayerRef.current = null;
      }

      ytPlayerRef.current = new window.YT.Player(playerMountRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          hl: 'en-gb',
        },
        events: {
          onReady: (event) => {
            try {
              event.target.playVideo();
            } catch {
              // user can click inside player
            }
          },
          onStateChange: (event) => {
            if (event.data === 0) {
              setVideoEnded(true);
            }
          },
          onError: () => {
            setEmbedError(true);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      mountPlayer();
    } else {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        mountPlayer();
      };
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        tag.onerror = () => {
          if (!cancelled) setEmbedError(true);
        };
        document.body.appendChild(tag);
      }
    }

    return () => {
      cancelled = true;
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // ignore
        }
        ytPlayerRef.current = null;
      }
    };
  }, [hasStarted, embedError]);

  const handleToggleFullscreen = async () => {
    const el = playerShellRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen may be restricted inside some iframes
    }
  };

  const handleReplay = () => {
    setVideoEnded(false);
    if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.seekTo(0, true);
        ytPlayerRef.current.playVideo();
      } catch {
        setHasStarted(false);
        setTimeout(() => setHasStarted(true), 40);
      }
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] lg:h-[100dvh] lg:overflow-hidden flex flex-col justify-between bg-[#0f2926] text-white select-none">
      {/* 3D Vietnam Cultural Panorama Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={STATIC_ASSETS.introPanorama}
          alt="3D cultural landscape of Vietnam's 54 ethnic groups"
          className="w-full h-full object-cover scale-105 opacity-55"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 35%, rgba(15, 41, 38, 0.35) 0%, rgba(12, 30, 38, 0.82) 72%, rgba(9, 20, 28, 0.94) 100%)',
          }}
        />
        {/* Decorative Dong Son Sunburst Arcs */}
        <svg
          className="absolute -top-24 -left-24 w-[420px] h-[420px] opacity-15 pointer-events-none"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="88" stroke="#FFC83D" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="100" cy="100" r="64" stroke="#15B8A6" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="36" stroke="#FF8C42" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
        <svg
          className="absolute -bottom-28 -right-24 w-[460px] h-[460px] opacity-15 pointer-events-none"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="90" stroke="#FFC83D" strokeWidth="1.5" strokeDasharray="8 6" />
          <circle cx="100" cy="100" r="62" stroke="#F58BA8" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="34" stroke="#36B86B" strokeWidth="2" />
        </svg>
      </div>

      {/* Top decorative brocade accent */}
      <div className="relative z-10 brocade-divider w-full shrink-0" />

      {/* Main Centered Documentary Stage */}
      <div className="relative z-10 flex-1 min-h-0 max-w-[1680px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-4 lg:py-5 flex flex-col items-center justify-center gap-4 lg:gap-5">
        {/* Title & Subtitle Header */}
        <div className="text-center max-w-4xl">
          <p className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#FFC83D] mb-1.5">
            Digital Museum of Vietnamese Culture
          </p>
          <h1 className="font-display font-black type-hero tracking-tight text-white drop-shadow-md">
            54 COLOURS OF VIETNAM
          </h1>
          <p className="mt-1.5 text-sm sm:text-base lg:text-lg text-amber-50/90 font-medium">
            A journey of discovery through the ethnic communities of Vietnam
          </p>
        </div>

        {/* 16:9 Video Frame */}
        <div className="w-full max-w-[940px] xl:max-w-[1040px] flex flex-col items-center">
          <div
            ref={playerShellRef}
            className="relative w-full aspect-video rounded-2xl lg:rounded-3xl overflow-hidden bg-slate-950 shadow-[0_24px_70px_rgba(0,0,0,0.55)] ring-2 ring-amber-300/35"
          >
            {/* Pre-play Interactive Poster (ensures zero autoplay sound before click) */}
            {!hasStarted && !embedError && (
              <div className="relative w-full h-full">
                <img
                  src={STATIC_ASSETS.introPanorama}
                  alt="Introductory video for 54 Colours of Vietnam"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-950/20 flex flex-col items-center justify-center p-6 text-center">
                  <button
                    type="button"
                    onClick={() => setHasStarted(true)}
                    className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-[#FFC83D] via-[#FF8C42] to-[#F58BA8] text-slate-950 shadow-[0_0_45px_rgba(255,200,61,0.55)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                    aria-label="Play introductory video for 54 Colours of Vietnam"
                  >
                    <Play className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 fill-slate-950 translate-x-1" />
                  </button>
                  <p className="mt-4 font-display font-bold text-base sm:text-lg lg:text-xl text-white drop-shadow">
                    Click to begin your journey through the 54 ethnic groups
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-amber-100/80">
                    Audio will only play after you click the play button
                  </p>
                </div>
              </div>
            )}

            {/* Active YouTube Embed */}
            {hasStarted && !embedError && (
              <div className="relative w-full h-full">
                <div ref={playerMountRef} className="w-full h-full" />
              </div>
            )}

            {/* Embed Restricted / Offline Fallback */}
            {embedError && (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center bg-gradient-to-br from-slate-900 to-[#11312e]">
                <AlertCircle className="w-12 h-12 text-[#FFC83D] mb-3" />
                <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                  Your browser or YouTube is restricting embedded video playback
                </h2>
                <p className="mt-2 text-sm text-slate-300 max-w-lg">
                  You can watch the introductory video directly on YouTube or start exploring the 54 Colours of Vietnam museum straight away.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={YOUTUBE_WATCH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF8C42] hover:bg-[#e87930] text-white font-bold text-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Watch video on YouTube</span>
                  </a>
                  <button
                    type="button"
                    onClick={onStartExplore}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15B8A6] hover:bg-[#119e8e] text-white font-bold text-sm transition-colors cursor-pointer"
                  >
                    <span>Start Exploring</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Ended Overlay with Prominent "START EXPLORING" */}
            {videoEnded && !embedError && (
              <div className="absolute inset-0 z-20 bg-slate-950/82 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#FFC83D]">
                  Celebrate Diversity · Honour Heritage · Pride in Vietnam
                </p>
                <h2 className="mt-2 font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white">
                  Ready to discover Vietnam's 54 ethnic groups?
                </h2>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onStartExplore}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#15B8A6] to-[#36B86B] hover:brightness-110 text-white font-display font-extrabold text-base sm:text-lg shadow-xl transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    <span>START EXPLORING</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleReplay}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/12 hover:bg-white/20 text-white font-semibold text-sm transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Watch video again</span>
                  </button>
                </div>
              </div>
            )}

            {/* Fullscreen toggle inside player frame */}
            <button
              type="button"
              onClick={handleToggleFullscreen}
              className="absolute top-3 right-3 z-20 p-2 rounded-xl bg-slate-950/65 hover:bg-slate-900/90 text-white/90 hover:text-white backdrop-blur-sm border border-white/15 transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit full screen' : 'Full screen'}
              aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Action Controls */}
        <div className="w-full max-w-[1040px] flex flex-wrap items-center justify-between gap-3 pt-1">
          <a
            href={YOUTUBE_WATCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/18 border border-white/15 text-amber-50 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <ExternalLink className="w-4 h-4 text-[#FFC83D]" />
            <span>Watch video on YouTube</span>
          </a>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onStartExplore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/18 border border-white/15 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <SkipForward className="w-4 h-4 text-[#FFC83D]" />
              <span>Skip video</span>
            </button>

            <button
              type="button"
              onClick={onStartExplore}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#15B8A6] via-[#27B888] to-[#36B86B] hover:brightness-110 text-white font-display font-extrabold text-sm sm:text-base shadow-[0_8px_25px_rgba(21,184,166,0.4)] transition-transform hover:scale-[1.02] active:scale-[0.99] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>START EXPLORING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Motto Footer */}
      <div className="relative z-10 text-center pb-3 px-4 text-[11px] sm:text-xs text-amber-100/75 font-medium tracking-wide">
        Celebrate Diversity · Honour Heritage · Pride in Vietnam
      </div>
    </div>
  );
};
