import React, { useState, useMemo } from 'react';
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

interface RegionShapeDef {
  id: RegionId;
  path: string;
  labelX: number;
  labelY: number;
  pinX: number;
  pinY: number;
  fill: string;
  hoverFill: string;
  landmarkLabel: string;
}

const REGION_SHAPES: RegionShapeDef[] = [
  {
    id: 'mien-nui-phia-bac',
    path: 'M 72 68 C 86 44, 128 32, 166 38 C 194 42, 224 52, 240 76 C 246 86, 232 104, 212 108 C 198 100, 174 92, 152 94 C 138 112, 124 128, 108 134 C 86 124, 68 96, 72 68 Z',
    labelX: 152,
    labelY: 64,
    pinX: 120,
    pinY: 74,
    fill: '#36B86B',
    hoverFill: '#299c58',
    landmarkLabel: 'Terraced Fields · Stilt Houses',
  },
  {
    id: 'dong-bang-bac-bo',
    path: 'M 152 94 C 174 92, 198 100, 212 108 C 220 116, 218 134, 206 146 C 188 152, 166 150, 148 144 C 142 132, 142 110, 152 94 Z',
    labelX: 184,
    labelY: 124,
    pinX: 182,
    pinY: 122,
    fill: '#F58BA8',
    hoverFill: '#e46c8e',
    landmarkLabel: 'Communal Houses · Lotus Ponds',
  },
  {
    id: 'bac-trung-bo',
    path: 'M 108 134 C 124 128, 138 140, 148 144 C 166 150, 184 152, 190 162 C 196 184, 212 206, 230 226 C 216 238, 200 244, 186 240 C 166 220, 144 196, 128 172 C 118 158, 110 146, 108 134 Z',
    labelX: 170,
    labelY: 194,
    pinX: 168,
    pinY: 190,
    fill: '#15B8A6',
    hoverFill: '#0e9687',
    landmarkLabel: 'Truong Son Range · Zeng Weaving',
  },
  {
    id: 'duyen-hai-mien-trung',
    path: 'M 230 226 C 248 242, 266 268, 274 302 C 280 332, 274 366, 256 390 C 242 396, 230 390, 224 378 C 234 352, 240 318, 234 286 C 228 264, 214 248, 204 238 C 212 234, 222 232, 230 226 Z',
    labelX: 256,
    labelY: 306,
    pinX: 254,
    pinY: 312,
    fill: '#FF8C42',
    hoverFill: '#e6732a',
    landmarkLabel: 'Cham Towers · Guol Houses',
  },
  {
    id: 'tay-nguyen',
    path: 'M 186 240 C 200 244, 214 248, 224 264 C 234 286, 240 318, 234 352 C 224 378, 208 386, 194 380 C 182 366, 174 344, 174 318 C 174 290, 178 262, 186 240 Z',
    labelX: 206,
    labelY: 312,
    pinX: 204,
    pinY: 316,
    fill: '#E11D48',
    hoverFill: '#c7133b',
    landmarkLabel: 'Nha Rong · Gong Culture',
  },
  {
    id: 'nam-bo',
    path: 'M 194 380 C 208 386, 224 378, 242 396 C 256 390, 260 412, 252 432 C 238 456, 204 476, 176 478 C 146 474, 134 446, 146 422 C 160 398, 178 386, 194 380 Z',
    labelX: 198,
    labelY: 432,
    pinX: 196,
    pinY: 436,
    fill: '#3D9BE9',
    hoverFill: '#227fc9',
    landmarkLabel: 'Floating Markets · Khmer Pagodas',
  },
];

export const VietnamMap: React.FC<VietnamMapProps> = ({
  activeRegion,
  onSelectRegion,
  onZoomImage,
  expanded = false,
}) => {
  const { language, t } = useLanguage();
  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(null);

  const regions = useMemo(() => getRegions(language), [language]);

  const focusedRegionId = hoveredRegion || activeRegion;
  const focusedRegionInfo = focusedRegionId ? getRegionById(focusedRegionId, language) : null;

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
            {t('mapInstruction')}
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
        {/* Stylized 3D SVG Map */}
        <div
          className={`relative rounded-2xl border border-sky-200/70 overflow-hidden flex items-center justify-center p-2 ${
            expanded ? 'lg:col-span-7 min-h-[380px]' : 'min-h-[290px]'
          }`}
          style={{
            background:
              'radial-gradient(circle at 38% 30%, #E8F8FA 0%, #D4F0F7 52%, #C3E7F5 100%)',
          }}
        >
          {/* Decorative ocean curves */}
          <svg
            viewBox="0 0 360 520"
            className="w-full h-full max-h-[540px] select-none"
            role="img"
            aria-label={t('mapTitle')}
          >
            <defs>
              <filter id="vietnam-3d-shadow" x="-15%" y="-10%" width="140%" height="130%">
                <feDropShadow dx="4" dy="7" stdDeviation="4" floodColor="#0F4C5C" floodOpacity="0.24" />
              </filter>
              <filter id="pin-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Subtle East Sea Waves */}
            <g stroke="#3D9BE9" strokeOpacity="0.16" strokeWidth="1.2" fill="none">
              <path d="M 260 120 Q 280 112 300 120 T 340 120" />
              <path d="M 275 180 Q 295 172 315 180 T 350 180" />
              <path d="M 285 260 Q 305 252 325 260 T 355 260" />
              <path d="M 255 430 Q 275 422 295 430 T 335 430" />
              <path d="M 30 330 Q 50 322 70 330 T 110 330" />
            </g>

            {/* Compass Rose */}
            <g transform="translate(52, 456)" opacity="0.58">
              <circle cx="0" cy="0" r="22" fill="#FFF9EA" fillOpacity="0.7" stroke="#0F766E" strokeWidth="1.2" />
              <path d="M 0 -17 L 4 0 L 0 17 L -4 0 Z" fill="#15B8A6" />
              <path d="M -17 0 L 0 -4 L 17 0 L 0 4 Z" fill="#FF8C42" />
              <text x="0" y="-25" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0F766E">
                N
              </text>
            </g>

            {/* East Sea Label */}
            <text
              x="298"
              y="152"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#1E6091"
              fillOpacity="0.65"
              letterSpacing="1.6"
            >
              {language === 'vi' ? 'BIỂN ĐÔNG' : 'EAST SEA'}
            </text>

            {/* 6 Interactive 3D Extruded Regions */}
            <g filter="url(#vietnam-3d-shadow)">
              {REGION_SHAPES.map((shape) => {
                const isSelected = activeRegion === shape.id;
                const isHovered = hoveredRegion === shape.id;
                const isDimmed = activeRegion !== null && !isSelected && !isHovered;

                return (
                  <g
                    key={shape.id}
                    onClick={() => handleRegionClick(shape.id)}
                    onMouseEnter={() => setHoveredRegion(shape.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      transform: isSelected || isHovered ? 'scale(1.025)' : 'scale(1)',
                      transformOrigin: `${shape.labelX}px ${shape.labelY}px`,
                      opacity: isDimmed ? 0.38 : 1,
                    }}
                  >
                    {/* 3D Extrusion base shadow layer */}
                    <path
                      d={shape.path}
                      fill="#0C4A57"
                      fillOpacity={isSelected ? 0.6 : 0.35}
                      transform="translate(3, 5)"
                    />

                    {/* Main region polygon */}
                    <path
                      d={shape.path}
                      fill={isHovered ? shape.hoverFill : shape.fill}
                      stroke={isSelected ? '#FFFFFF' : '#FFFFFF'}
                      strokeWidth={isSelected ? 3.5 : 1.6}
                      strokeLinejoin="round"
                    />

                    {/* Interactive Pin Marker */}
                    <g
                      transform={`translate(${shape.pinX}, ${shape.pinY})`}
                      filter="url(#pin-glow)"
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r={isSelected ? 7 : isHovered ? 6 : 5}
                        fill="#FFFFFF"
                        stroke={shape.fill}
                        strokeWidth="2.5"
                      />
                      {(isSelected || isHovered) && (
                        <circle cx="0" cy="0" r="2.5" fill={shape.fill} />
                      )}
                    </g>
                  </g>
                );
              })}
            </g>

            {/* Vietnam Spratly & Paracel Islands Affirmation */}
            <g opacity="0.75" fontSize="8" fontWeight="600" fill="#0F766E">
              <text x="312" y="240" textAnchor="end">
                {language === 'vi' ? 'Q.Đ Hoàng Sa (Đà Nẵng)' : 'Paracel Islands (Vietnam)'}
              </text>
              <circle cx="316" cy="238" r="2" fill="#FF8C42" />
              <text x="320" y="380" textAnchor="end">
                {language === 'vi' ? 'Q.Đ Trường Sa (Khánh Hòa)' : 'Spratly Islands (Vietnam)'}
              </text>
              <circle cx="324" cy="378" r="2" fill="#FF8C42" />
            </g>
          </svg>

          {/* Floating Hover Badge */}
          {focusedRegionInfo && (
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-900/10 shadow-md pointer-events-none flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: focusedRegionInfo.accentColor }}
              />
              <span className="font-display font-bold text-xs text-slate-900">
                {focusedRegionInfo.shortName}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tabular-nums">
                · {countGroupsInRegion(focusedRegionInfo.id)} {t('countText')}
              </span>
            </div>
          )}
        </div>

        {/* Detailed Region Cultural Card (in expanded mode or selection) */}
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
