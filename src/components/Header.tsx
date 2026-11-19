import React from 'react';
import { Compass, Map, Grid2x2, BookOpen, Film, Volume2, Volume1, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const { language, setLanguage, t } = useLanguage();

  const navItems: { id: AppView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('navHome'), icon: <Compass className="w-4 h-4" /> },
    { id: 'map', label: t('navMap'), icon: <Map className="w-4 h-4" /> },
    { id: 'catalog', label: t('navCatalog'), icon: <Grid2x2 className="w-4 h-4" /> },
    { id: 'about', label: t('navAbout'), icon: <BookOpen className="w-4 h-4" /> },
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
          <span className="hidden sm:inline">{t('brandName')}</span>
          <span className="sm:hidden">{t('brandShort')}</span>
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

        {/* Zone 3: Background Music, Language Selector & Video Action */}
        <div className="shrink-0 flex items-center gap-2 sm:gap-3">
          {/* Background Music Volume Control */}
          <div
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-xl bg-amber-50/90 hover:bg-amber-100/70 border border-amber-900/10 shadow-xs transition-colors"
            title={`${t('bgMusicLabel')}: ${isMuted || volume === 0 ? 'Muted' : `${Math.round(volume * 100)}%`}`}
          >
            <button
              type="button"
              onClick={onToggleMute}
              className="p-1 rounded-lg text-slate-700 hover:text-[#0F766E] transition-colors cursor-pointer flex items-center justify-center relative"
              aria-label={isMuted || volume === 0 ? t('bgMusicUnmute') : t('bgMusicMute')}
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
                className="w-12 sm:w-16 md:w-20 h-1.5 bg-amber-200/80 rounded-lg appearance-none cursor-pointer accent-[#0F766E]"
                aria-label={t('bgMusicVolume')}
              />
              <span className="text-[11px] font-bold tabular-nums font-mono text-slate-600 min-w-[26px] text-right select-none">
                {isMuted || volume === 0 ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </div>

          {/* Bilingual Language Switcher (VI / EN) */}
          <div
            className="flex items-center p-0.5 rounded-xl bg-amber-50/90 border border-amber-900/10 shadow-xs"
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              onClick={() => setLanguage('vi')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'vi'
                  ? 'bg-[#0F766E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Chuyển giao diện sang Tiếng Việt"
              aria-label="Tiếng Việt"
            >
              <span>🇻🇳</span>
              <span>VI</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#0F766E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch interface to English (UK)"
              aria-label="English (UK)"
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          {/* Intro Video Button */}
          <button
            type="button"
            onClick={() => onNavigate('intro')}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-[#FF8C42] hover:bg-[#e87930] text-white text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Film className="w-4 h-4" />
            <span className="hidden md:inline">{t('navVideo')}</span>
            <span className="md:hidden">{t('navVideoShort')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
