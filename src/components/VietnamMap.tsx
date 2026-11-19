import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, MapPin, RotateCcw } from 'lucide-react';
import { LightboxImage, RegionId } from '../types/ethnic';
import { getRegions, countGroupsInRegion, getRegionById } from '../data/ethnicGroups';
import { useLanguage } from '../context/LanguageContext';

interface VietnamMapProps {
  activeRegion: RegionId | null;
  onSelectRegion: (regionId: RegionId | null) => void;
  onZoomImage?: (image: LightboxImage) => void;
  expanded?: boolean;
}

interface RegionPinDef {
  id: RegionId;
  nameVi: string;
  nameEn: string;
  xPercent: number; // 0..100%
  yPercent: number; // 0..100%
  color: string;
}

const REGION_PINS: RegionPinDef[] = [
  {
    id: 'mien-nui-phia-bac',
    nameVi: 'Miền núi phía Bắc',
    nameEn: 'Northern Mountains',
    xPercent: 35.8,
    yPercent: 12.6,
    color: '#35A817', // Green in the map
  },
  {
    id: 'dong-bang-bac-bo',
    nameVi: 'Đồng bằng Bắc Bộ',
    nameEn: 'Red River Delta',
    xPercent: 47.7,
    yPercent: 25.5,
    color: '#F12B6B', // Pink in the map
  },
  {
    id: 'bac-trung-bo',
    nameVi: 'Bắc Trung Bộ',
    nameEn: 'North Central Coast',
    xPercent: 38.0,
    yPercent: 38.0,
    color: '#00A396', // Teal in the map
  },
  {
    id: 'tay-nguyen',
    nameVi: 'Tây Nguyên',
    nameEn: 'Central Highlands',
    xPercent: 56.3,
    yPercent: 69.0,
    color: '#E51928', // Red in the map
  },
  {
    id: 'duyen-hai-mien-trung',
    nameVi: 'Duyên hải miền Trung',
    nameEn: 'Central Coastal Area',
    xPercent: 67.3,
    yPercent: 68.0,
    color: '#FDB813', // Yellow in the map
  },
  {
    id: 'nam-bo',
    nameVi: 'Nam Bộ',
    nameEn: 'Southern Vietnam',
    xPercent: 35.8,
    yPercent: 86.0,
    color: '#0078F0', // Blue in the map
  },
];

function classifyPixel(r: number, g: number, b: number, a: number): RegionId | null {
  if (a < 40) return null;
  // White borders or transparent / light background
  if (r > 220 && g > 220 && b > 220) return null;
  if (Math.abs(r - g) < 18 && Math.abs(g - b) < 18 && Math.abs(r - b) < 18) return null;

  // 1. Green: Miền núi phía Bắc
  if (g > 110 && r < 100 && b < 60) return 'mien-nui-phia-bac';
  // 2. Pink: Đồng bằng Bắc Bộ
  if (r > 175 && b > 60 && g < 90) return 'dong-bang-bac-bo';
  // 3. Teal: Bắc Trung Bộ
  if (g > 100 && b > 100 && r < 70) return 'bac-trung-bo';
  // 4. Red: Tây Nguyên
  if (r > 175 && g < 55 && b < 70) return 'tay-nguyen';
  // 5. Yellow: Duyên hải Nam Trung Bộ & Hoàng Sa - Trường Sa
  if (r > 185 && g > 135 && b < 65) return 'duyen-hai-mien-trung';
  // 6. Blue: Nam Bộ
  if (b > 170 && r < 70) return 'nam-bo';

  return null;
}

export const VietnamMap: React.FC<VietnamMapProps> = ({
  activeRegion,
  onSelectRegion,
  onZoomImage,
  expanded = false,
}) => {
  const { language, t } = useLanguage();
  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(null);
  const [isPointerOnRegion, setIsPointerOnRegion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const regions = useMemo(() => getRegions(language), [language]);
  const focusedRegionId = hoveredRegion || activeRegion;
  const focusedRegionInfo = focusedRegionId ? getRegionById(focusedRegionId, language) : null;

  // Prepare in-memory canvas for pixel detection
  const setupCanvas = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
    canvasRef.current = canvas;
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    setupCanvas();
  }, [setupCanvas]);

  // Translate client mouse/click coordinates to image pixel coordinate
  const getRegionAtEvent = (e: React.MouseEvent<HTMLDivElement>): RegionId | null => {
    const img = imgRef.current;
    const ctx = ctxRef.current;
    if (!img || !ctx) return null;

    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return null;

    // Scale to natural image dimensions
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;
    const imgX = Math.floor(x * scaleX);
    const imgY = Math.floor(y * scaleY);

    if (imgX < 0 || imgX >= img.naturalWidth || imgY < 0 || imgY >= img.naturalHeight) return null;

    const pixel = ctx.getImageData(imgX, imgY, 1, 1).data;
    let region = classifyPixel(pixel[0], pixel[1], pixel[2], pixel[3]);

    // If on a border pixel, sample nearby offsets (radius 4px) to catch adjacent region
    if (!region) {
      const offsets = [
        [0, -4], [0, 4], [-4, 0], [4, 0],
        [-3, -3], [3, 3], [-3, 3], [3, -3]
      ];
      for (const [dx, dy] of offsets) {
        const nx = imgX + dx;
        const ny = imgY + dy;
        if (nx >= 0 && nx < img.naturalWidth && ny >= 0 && ny < img.naturalHeight) {
          const np = ctx.getImageData(nx, ny, 1, 1).data;
          const nr = classifyPixel(np[0], np[1], np[2], np[3]);
          if (nr) {
            region = nr;
            break;
          }
        }
      }
    }

    return region;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const region = getRegionAtEvent(e);
    if (region) {
      setHoveredRegion(region);
      setIsPointerOnRegion(true);
    } else {
      setHoveredRegion(null);
      setIsPointerOnRegion(false);
    }
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
    setIsPointerOnRegion(false);
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const region = getRegionAtEvent(e);
    if (region) {
      handleRegionClick(region);
    }
  };

  const handleRegionClick = (id: RegionId) => {
    if (activeRegion === id) {
      onSelectRegion(null);
    } else {
      onSelectRegion(id);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 min-h-0">
      {/* Map Header & Title */}
      <div className="shrink-0 flex items-center justify-between gap-2 border-b border-slate-900/8 pb-2.5">
        <div>
          <h2 className="font-display font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#15B8A6] shrink-0" />
            <span>{t('mapTitle')}</span>
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'vi'
              ? 'Bấm trực tiếp vào từng vùng màu trên bản đồ để khám phá các dân tộc cư trú'
              : 'Click directly on any coloured region on the map to explore its ethnic groups'}
          </p>
        </div>

        {activeRegion && (
          <button
            type="button"
            onClick={() => onSelectRegion(null)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('allOption')}</span>
          </button>
        )}
      </div>

      {/* Main Interactive Map Stage */}
      <div
        className={`flex-1 min-h-0 grid gap-3 ${
          expanded ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'
        }`}
      >
        {/* Real Interactive Map Image Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleMapClick}
          className={`relative rounded-2xl border border-sky-200/80 overflow-hidden flex items-center justify-center p-2 select-none ${
            expanded ? 'lg:col-span-7 min-h-[460px] lg:min-h-[580px]' : 'min-h-[360px]'
          } ${isPointerOnRegion ? 'cursor-pointer' : 'cursor-default'}`}
          style={{
            background:
              'radial-gradient(circle at 45% 35%, #F0F9FF 0%, #E0F2FE 52%, #BAE6FD 100%)',
          }}
        >
          {/* Authentic Map Image */}
          <div className="relative w-full h-full max-h-[620px] flex items-center justify-center">
            <img
              ref={imgRef}
              src="/images/vietnam-map.png"
              alt={t('mapTitle')}
              onLoad={setupCanvas}
              draggable={false}
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(15,76,92,0.18)] transition-transform duration-300 pointer-events-none"
            />

            {/* Interactive Pins & Region Badges overlaid at coordinates */}
            {REGION_PINS.map((pin) => {
              const isSelected = activeRegion === pin.id;
              const isHovered = hoveredRegion === pin.id;

              return (
                <div
                  key={pin.id}
                  style={{
                    left: `${pin.xPercent}%`,
                    top: `${pin.yPercent}%`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRegionClick(pin.id);
                  }}
                  onMouseEnter={() => setHoveredRegion(pin.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                >
                  {/* Pin Circle Marker with Pulsing Ring */}
                  <div className="relative flex items-center justify-center">
                    {(isSelected || isHovered) && (
                      <span
                        className="absolute w-8 h-8 rounded-full animate-ping opacity-60"
                        style={{ backgroundColor: pin.color }}
                      />
                    )}
                    <span
                      className={`flex items-center justify-center rounded-full border-2 border-white shadow-md transition-all duration-200 ${
                        isSelected
                          ? 'w-6 h-6 ring-4 ring-white/80 scale-125'
                          : isHovered
                          ? 'w-5 h-5 ring-2 ring-white scale-110'
                          : 'w-4 h-4 opacity-90'
                      }`}
                      style={{ backgroundColor: pin.color }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>

                    {/* Permanent Subtle Name Pill on Hover/Select */}
                    {(isSelected || isHovered) && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap px-2.5 py-1 rounded-lg text-white font-display font-extrabold text-[11px] shadow-lg pointer-events-none flex items-center gap-1.5 z-20"
                        style={{ backgroundColor: pin.color }}
                      >
                        <span>{language === 'vi' ? pin.nameVi : pin.nameEn}</span>
                        <span className="text-[10px] opacity-90 tabular-nums">
                          ({countGroupsInRegion(pin.id)})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Sovereignty Affirmation Badges for Islands */}
            <div className="absolute right-[12%] top-[37%] pointer-events-none opacity-80 text-right">
              <span className="text-[10px] font-bold text-amber-800 bg-white/80 px-1.5 py-0.5 rounded shadow-xs">
                {language === 'vi' ? 'Q.Đ Hoàng Sa (Việt Nam)' : 'Paracel Islands (Vietnam)'}
              </span>
            </div>
            <div className="absolute right-[10%] bottom-[19%] pointer-events-none opacity-80 text-right">
              <span className="text-[10px] font-bold text-amber-800 bg-white/80 px-1.5 py-0.5 rounded shadow-xs">
                {language === 'vi' ? 'Q.Đ Trường Sa (Việt Nam)' : 'Spratly Islands (Vietnam)'}
              </span>
            </div>
          </div>

          {/* Floating Hover / Active Info Pill */}
          {focusedRegionInfo && (
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-900/10 shadow-lg pointer-events-none flex items-center gap-2.5 z-20">
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                style={{ backgroundColor: focusedRegionInfo.accentColor }}
              />
              <div className="min-w-0">
                <div className="font-display font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                  {focusedRegionInfo.name}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 tabular-nums">
                  {countGroupsInRegion(focusedRegionInfo.id)} {t('countText')}
                </div>
              </div>
            </div>
          )}

          {/* Map Compass */}
          <div className="absolute bottom-3 left-3 pointer-events-none opacity-60 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border border-[#0F766E]/40 flex items-center justify-center bg-white/40 backdrop-blur-xs">
              <span className="text-[11px] font-black text-[#0F766E]">N</span>
            </div>
          </div>
        </div>

        {/* Detailed Region Cultural Card (in expanded mode) */}
        {expanded && (
          <div className="lg:col-span-5 h-full min-h-0 flex flex-col">
            {focusedRegionInfo ? (
              <div className="museum-card p-4 flex flex-col justify-between gap-3 flex-1 overflow-hidden">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden group">
                  <img
                    src={focusedRegionInfo.dioramaImage}
                    alt={focusedRegionInfo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {onZoomImage && (
                    <button
                      type="button"
                      onClick={() =>
                        onZoomImage({
                          src: focusedRegionInfo.dioramaImage,
                          title: focusedRegionInfo.name,
                          subtitle: focusedRegionInfo.landmarks.join(' · '),
                        })
                      }
                      className="absolute bottom-2.5 right-2.5 p-2 rounded-lg bg-slate-950/65 hover:bg-slate-950/85 text-white transition-colors cursor-pointer"
                      aria-label="Enlarge regional landscape"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className="font-display font-extrabold text-lg"
                      style={{ color: focusedRegionInfo.accentColor }}
                    >
                      {focusedRegionInfo.name}
                    </h3>
                    <span className="text-xs font-bold text-slate-600 tabular-nums">
                      {countGroupsInRegion(focusedRegionInfo.id)} {t('countText')}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
                    {focusedRegionInfo.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-slate-900/8 text-xs text-slate-600">
                    <span className="font-bold text-slate-800">{t('mapTypicalSymbols')}: </span>
                    {focusedRegionInfo.landmarks.join(' · ')}
                  </div>
                </div>
              </div>
            ) : (
              <div className="museum-card p-5 flex flex-col justify-between gap-4 flex-1">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900">
                    {t('aboutSlogan')}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {t('aboutP1')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {regions.map((region) => (
                    <button
                      key={region.id}
                      type="button"
                      onClick={() => handleRegionClick(region.id)}
                      className="text-left p-3 rounded-xl border border-slate-900/10 hover:border-slate-900/25 bg-[#FFFDF7] hover:bg-white transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: region.accentColor }}
                        />
                        <span className="font-display font-bold text-xs text-slate-900 truncate">
                          {region.shortName}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500 tabular-nums">
                        {countGroupsInRegion(region.id)} {t('countText')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 6-Region Interactive Selector Strip */}
      <div className="shrink-0 grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {regions.map((region) => {
          const isSelected = activeRegion === region.id;
          return (
            <button
              key={region.id}
              type="button"
              onClick={() => handleRegionClick(region.id)}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              className={`flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                isSelected
                  ? 'text-white shadow-sm border-transparent'
                  : 'bg-white/90 hover:bg-white text-slate-700 border-slate-900/10'
              }`}
              style={isSelected ? { backgroundColor: region.accentColor } : undefined}
            >
              <span className="flex items-center gap-1.5 truncate">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: isSelected ? '#FFFFFF' : region.accentColor }}
                />
                <span className="truncate">{region.shortName}</span>
              </span>
              <span
                className={`text-[11px] tabular-nums shrink-0 ${
                  isSelected ? 'text-white/90' : 'text-slate-400'
                }`}
              >
                {countGroupsInRegion(region.id)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
