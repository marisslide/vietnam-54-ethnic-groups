import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LanguageFamilyId, LightboxImage, RegionId } from './types/ethnic';
import { getEthnicById } from './data/ethnicGroups';
import { AppView, Header } from './components/Header';
import { IntroVideo } from './components/IntroVideo';
import { HomePage } from './components/HomePage';
import { EthnicDetail } from './components/EthnicDetail';
import { AboutView } from './components/AboutView';
import { ImageViewer } from './components/ImageViewer';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('intro');
  const [selectedEthnicId, setSelectedEthnicId] = useState<string>('kinh');
  const [previousListView, setPreviousListView] = useState<'home' | 'map' | 'catalog'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<RegionId | null>(null);
  const [activeLanguageFamily, setActiveLanguageFamily] = useState<LanguageFamilyId | null>(null);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

  // Background music state: default 5% (0.05) volume
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(0.05);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Synchronise audio element volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle browser autoplay policy and user gesture unlocking
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    // First interaction listener to resume music if browser blocks autoplay
    const handleFirstGesture = () => {
      if (audioRef.current && audioRef.current.paused && currentView !== 'intro') {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [currentView, isMuted, volume]);

  // Pause BGM when viewing the Intro documentary video; resume when in museum
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentView === 'intro') {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = isMuted ? 0 : volume;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Awaiting user gesture
        });
    }
  }, [currentView, isMuted, volume]);

  const handleVolumeChange = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (clamped === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      if (clamped > 0 && audioRef.current.paused && currentView !== 'intro') {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      const targetVol = volume === 0 ? 0.05 : volume;
      setVolume(targetVol);
      if (audioRef.current) {
        audioRef.current.volume = targetVol;
        if (audioRef.current.paused && currentView !== 'intro') {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      }
    } else {
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  };

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const targetVol = isMuted ? 0 : (volume === 0 ? 0.05 : volume);
      if (volume === 0) setVolume(0.05);
      if (isMuted) setIsMuted(false);
      audio.volume = targetVol;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
  };

  const handleStartExplore = () => {
    setCurrentView('home');
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleSelectEthnic = (ethnicId: string) => {
    if (currentView === 'home' || currentView === 'map' || currentView === 'catalog') {
      setPreviousListView(currentView);
    }
    setSelectedEthnicId(ethnicId);
    setCurrentView('detail');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveRegion(null);
    setActiveLanguageFamily(null);
  };

  const selectedEthnic = getEthnicById(selectedEthnicId);

  return (
    <div className="museum-viewport bg-[#FFF9EA] text-slate-900">
      {/* Background Audio Player */}
      <audio
        ref={audioRef}
        src="/audio/background-music.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {currentView !== 'intro' && (
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />
      )}

      <div className="museum-main-stage relative">
        <AnimatePresence mode="wait">
          {currentView === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full"
            >
              <IntroVideo onStartExplore={handleStartExplore} />
            </motion.div>
          )}

          {(currentView === 'home' || currentView === 'map' || currentView === 'catalog') && (
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="w-full h-full"
            >
              <HomePage
                mode={currentView}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeRegion={activeRegion}
                onSelectRegion={setActiveRegion}
                activeLanguageFamily={activeLanguageFamily}
                onSelectLanguageFamily={setActiveLanguageFamily}
                onResetFilters={handleResetFilters}
                onSelectEthnic={handleSelectEthnic}
                onZoomImage={setLightboxImage}
              />
            </motion.div>
          )}

          {currentView === 'detail' && selectedEthnic && (
            <motion.div
              key={`detail-${selectedEthnic.id}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full"
            >
              <EthnicDetail
                group={selectedEthnic}
                onBack={() => setCurrentView(previousListView)}
                onSelectEthnic={handleSelectEthnic}
                onZoomImage={setLightboxImage}
              />
            </motion.div>
          )}

          {currentView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full"
            >
              <AboutView onExploreAll={() => setCurrentView('catalog')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ImageViewer image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
}
