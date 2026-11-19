import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EthnicGroup } from '../types/ethnic';
import { CulturalIcon, EthnicMotifPattern } from './CulturalIcon';
import { useLanguage } from '../context/LanguageContext';

interface EthnicCardProps {
  group: EthnicGroup;
  onSelect: (ethnicId: string) => void;
}

export const EthnicCard: React.FC<EthnicCardProps> = ({ group, onSelect }) => {
  const { language } = useLanguage();
  const primaryRegion = group.traditionalRegions[0] || (language === 'vi' ? 'Việt Nam' : 'Vietnam');
  // Only show a real photographic/3D costume preview if the ethnic group owns its own authentic imageUrl
  const authenticPreview = group.costumes.female.imageUrl || group.costumes.male.imageUrl;

  return (
    <button
      type="button"
      onClick={() => onSelect(group.id)}
      className="group text-left museum-card overflow-hidden flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15B8A6] cursor-pointer"
    >
      {/* Top Visual Crest / Authentic Ethnic Preview — Square 1:1 */}
      <div
        className="relative w-full aspect-square overflow-hidden flex items-center justify-center bg-slate-50"
        style={{
          background: `linear-gradient(135deg, ${group.accentColor}22 0%, #FFF9EA 56%, ${group.secondaryColor}28 100%)`,
        }}
      >
        {group.avatarUrl ? (
          <>
            <img
              src={group.avatarUrl}
              alt={group.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent pointer-events-none" />
          </>
        ) : authenticPreview ? (
          <>
            <img
              src={authenticPreview}
              alt={`Traditional attire of the ${group.name} people`}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
            {/* Official Number Index for fallback */}
            <span className="absolute top-2 left-2.5 z-10 font-display font-black text-xs tabular-nums px-2 py-0.5 rounded-lg bg-white/90 text-slate-800 shadow-xs">
              {String(group.number).padStart(2, '0')}
            </span>
          </>
        ) : (
          <>
            <EthnicMotifPattern
              pattern={group.motifPattern}
              primary={group.accentColor}
              secondary={group.secondaryColor}
              idPrefix={`card-${group.id}`}
            />
            <div
              className="relative z-10 w-14 h-14 rounded-2xl bg-white/92 shadow-md border border-slate-900/8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            >
              <CulturalIcon type={group.culturalSymbol} color={group.accentColor} size={32} />
            </div>
            <span className="absolute top-2 left-2.5 z-10 font-display font-black text-xs tabular-nums px-2 py-0.5 rounded-lg bg-white/90 text-slate-800 shadow-xs">
              {String(group.number).padStart(2, '0')}
            </span>
          </>
        )}

        {/* Ethnic Color Swatch Dots */}
        <div className="absolute bottom-2 right-2.5 z-10 flex items-center gap-1">
          {group.costumes.female.colorSwatches.slice(0, 3).map((hex, idx) => (
            <span
              key={`${group.id}-dot-${idx}`}
              className="w-2.5 h-2.5 rounded-full border border-white shadow-xs"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </div>

      {/* Card Body — Zero static pill clutter, crisp metadata with inline dot separator */}
      <div className="p-3 flex-1 flex flex-col justify-between gap-2 bg-white">
        <div>
          <h3 className="font-display font-extrabold text-sm lg:text-[15px] text-slate-900 group-hover:text-[#0F766E] transition-colors leading-snug">
            {group.name}
          </h3>
          <p className="mt-0.5 text-[11px] lg:text-xs text-slate-500 leading-snug line-clamp-1">
            {primaryRegion} · {group.languageFamily}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-900/6 flex items-center justify-between text-[11px] font-bold">
          <span
            className="tracking-wide uppercase"
            style={{ color: group.accentColor }}
          >
            {language === 'vi' ? 'Khám phá' : 'Explore'}
          </span>
          <ArrowUpRight
            className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#15B8A6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        </div>
      </div>
    </button>
  );
};
