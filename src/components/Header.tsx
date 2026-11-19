import React from 'react';
import { Compass, Map, Grid2x2, BookOpen, Film, Volume2, Volume1, VolumeX } from 'lucide-react';

export type AppView = 'intro' | 'home' | 'map' | 'catalog' | 'detail' | 'about';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  volume: number;
  onVolumeChange: (newVolume: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
  isPlaying,
}) => {
  const navItems: { id: AppView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'map', label: 'Cultural Map', icon: <Map className="w-4 h-4" /> },
    { id: 'catalog', label: '54 Ethnic Groups', icon: <Grid2x2 className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 shrink-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-900/8 shadow-xs">
      <div className="brocade-divider w-full" />
      <div className="max-w-[1920px] mx-auto px-4 lg:px-7 h-14 lg:h-16 flex items-center justify-between gap-3 lg:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="font-display font-black text-base lg:text-xl tracking-tight text-slate-900 hover:text-[#0F766E] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2.5"
        >
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#15B8A6] via-[#36B86B] to-[#FFC83D] text-white flex items-center justify-center font-black text-sm shadow-sm">
            54
          </span>
          <span className="hidden sm:inline">54 Colours of Vietnam</span>
          <span className="sm:hidden">54 Colours</span>
        </button>

        {/* Zone 2: 4 Clean Single-Line Navigation Links */}
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-1 sm:gap-2 lg:gap-6 overflow-x-auto no-scrollbar"
        >
          {navItems.map((item) => {
            const isActive =
              currentView === item.id ||
              (currentView === 'detail' && item.id === 'catalog');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#0F766E]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className={isActive ? 'text-[#15B8A6]' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute left-2.5 right-2.5 -bottom-[11px] lg:-bottom-[15px] h-[3px] rounded-full bg-[#15B8A6]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Background Music & Video Action */}
        <div className="shrink-0 flex items-center gap-2 sm:gap-3">
          {/* Background Music Volume Control */}
          <div
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-xl bg-amber-50/90 hover:bg-amber-100/70 border border-amber-900/10 shadow-xs transition-colors"
            title={`Background music: ${isMuted || volume === 0 ? 'Muted' : `${Math.round(volume * 100)}%`} (Click to ${isMuted || volume === 0 ? 'unmute' : 'mute'})`}
          >
            <button
              type="button"
              onClick={onToggleMute}
              className="p-1 rounded-lg text-slate-700 hover:text-[#0F766E] transition-colors cursor-pointer flex items-center justify-center relative"
              aria-label={isMuted || volume === 0 ? 'Unmute background music' : 'Mute background music'}
            >
              {isMuted || volume === 0 || !isPlaying ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : volume < 0.5 ? (
                <Volume1 className="w-4 h-4 text-[#0F766E]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#0F766E]" />
              )}
              {isPlaying && !isMuted && volume > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#15B8A6] animate-pulse" />
              )}
            </button>

            <div className="flex items-center gap-1.5">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={isMuted ? 0 : Math.round(volume * 100)}
                onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
                className="w-14 sm:w-18 md:w-20 h-1.5 bg-amber-200/80 rounded-lg appearance-none cursor-pointer accent-[#0F766E]"
                aria-label="Background music volume slider"
              />
              <span className="text-[11px] font-bold tabular-nums font-mono text-slate-600 min-w-[26px] text-right select-none">
                {isMuted || volume === 0 ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </div>

          {/* Intro Video Button */}
          <button
            type="button"
            onClick={() => onNavigate('intro')}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-[#FF8C42] hover:bg-[#e87930] text-white text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Film className="w-4 h-4" />
            <span className="hidden md:inline">Intro Video</span>
            <span className="md:hidden">Video</span>
          </button>
        </div>
      </div>
    </header>
  );
};
