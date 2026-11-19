import React from 'react';
import {
  CulturalSymbolType,
  EthnicGroup,
  MotifPatternType,
} from '../types/ethnic';

interface CulturalIconProps {
  type: CulturalSymbolType;
  color?: string;
  size?: number;
  className?: string;
}

export const CulturalIcon: React.FC<CulturalIconProps> = ({
  type,
  color = '#15B8A6',
  size = 24,
  className = '',
}) => {
  switch (type) {
    case 'lotus':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M16 6C13.5 10.5 13 15 16 20C19 15 18.5 10.5 16 6Z" fill={color} />
          <path d="M9 12C9 17 11.5 20.5 16 22C13 18 11.5 14.5 9 12Z" fill={color} fillOpacity="0.82" />
          <path d="M23 12C23 17 20.5 20.5 16 22C19 18 20.5 14.5 23 12Z" fill={color} fillOpacity="0.82" />
          <path d="M5 18C7 22 11 24 16 24C12 22 8.5 20 5 18Z" fill={color} fillOpacity="0.58" />
          <path d="M27 18C25 22 21 24 16 24C20 22 23.5 20 27 18Z" fill={color} fillOpacity="0.58" />
          <path d="M9 26H23" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'stilt-house':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M4 15L16 6L28 15H4Z" fill={color} />
          <rect x="8" y="15" width="16" height="7" rx="1.5" fill={color} fillOpacity="0.78" />
          <rect x="14" y="17" width="4" height="5" rx="0.8" fill="#FFF9EA" />
          <path d="M9 22V27M13 22V27M19 22V27M23 22V27" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'nha-rong':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M11 4H21L26 19H6L11 4Z" fill={color} />
          <path d="M16 4V19" stroke="#FFF9EA" strokeWidth="1.4" strokeOpacity="0.45" />
          <rect x="9" y="19" width="14" height="4" rx="1" fill={color} fillOpacity="0.8" />
          <path d="M10 23V28M16 23V28M22 23V28" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'terrace':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M4 25C10 22 22 22 28 25V27H4V25Z" fill={color} />
          <path d="M6 20C12 17 20 17 26 20V22.5C20 20 12 20 6 22.5V20Z" fill={color} fillOpacity="0.8" />
          <path d="M9 15C13.5 12.8 18.5 12.8 23 15V17.5C18.5 15.5 13.5 15.5 9 17.5V15Z" fill={color} fillOpacity="0.6" />
          <circle cx="22" cy="9" r="3" fill="#FFC83D" />
        </svg>
      );
    case 'gong':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="10.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2.4" />
          <circle cx="16" cy="16" r="6" fill={color} fillOpacity="0.65" />
          <circle cx="16" cy="16" r="2.8" fill={color} />
        </svg>
      );
    case 'cham-tower':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M16 4L19 9H13L16 4Z" fill={color} />
          <rect x="11.5" y="9.5" width="9" height="4" rx="0.8" fill={color} fillOpacity="0.88" />
          <rect x="9.5" y="14" width="13" height="5" rx="0.8" fill={color} fillOpacity="0.8" />
          <rect x="8" y="19.5" width="16" height="8" rx="1" fill={color} />
          <path d="M14 27.5V22.5C14 21.4 14.9 20.5 16 20.5C17.1 20.5 18 21.4 18 22.5V27.5H14Z" fill="#FFF9EA" />
        </svg>
      );
    case 'khmer-pagoda':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M16 3L18 9H14L16 3Z" fill={color} />
          <path d="M8 14L16 9L24 14H8Z" fill={color} fillOpacity="0.88" />
          <path d="M6 19L16 13.5L26 19H6Z" fill={color} />
          <rect x="9" y="19" width="14" height="8" rx="1" fill={color} fillOpacity="0.82" />
          <rect x="14" y="21.5" width="4" height="5.5" rx="0.8" fill="#FFF9EA" />
        </svg>
      );
    case 'khen':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M10 6V24M13.5 4V26M17 5V25M20.5 7V23" stroke={color} strokeWidth="2.1" strokeLinecap="round" />
          <rect x="7" y="15" width="17" height="5" rx="2.5" fill={color} />
          <path d="M24 17.5H27.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'boat':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M15 6L24 18H15V6Z" fill={color} fillOpacity="0.82" />
          <path d="M13 9V18H8L13 9Z" fill={color} fillOpacity="0.55" />
          <path d="M5 20H27L23.5 25H8.5L5 20Z" fill={color} />
          <path d="M6 27.5C9 26.2 12 26.2 16 27.5C20 28.8 23 28.8 26 27.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'drum':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <ellipse cx="16" cy="9" rx="9" ry="3.2" fill={color} />
          <path d="M7.5 9.5C9 15 9 20 7.5 24.5H24.5C23 20 23 15 24.5 9.5" fill={color} fillOpacity="0.72" />
          <circle cx="16" cy="17" r="3" fill="#FFF9EA" fillOpacity="0.85" />
          <path d="M8 24.5H24" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'lantern':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M16 4V8" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <rect x="12" y="7.5" width="8" height="2.2" rx="1" fill="#FFC83D" />
          <ellipse cx="16" cy="16" rx="8.5" ry="7" fill={color} />
          <ellipse cx="16" cy="16" rx="4.2" ry="6.8" stroke="#FFF9EA" strokeWidth="1.3" strokeOpacity="0.65" />
          <rect x="12" y="22.5" width="8" height="2" rx="1" fill="#FFC83D" />
          <path d="M16 24.5V28.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'brocade':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M16 5L26 16L16 27L6 16L16 5Z" fill={color} fillOpacity="0.24" stroke={color} strokeWidth="2.2" />
          <path d="M16 10L21 16L16 22L11 16L16 10Z" fill={color} />
          <circle cx="16" cy="16" r="2" fill="#FFF9EA" />
        </svg>
      );
  }
};

export const EthnicMotifPattern: React.FC<{
  pattern: MotifPatternType;
  primary: string;
  secondary: string;
  idPrefix: string;
}> = ({ pattern, primary, secondary, idPrefix }) => {
  const pid = `motif-${idPrefix}`;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" aria-hidden="true">
      <defs>
        <pattern id={pid} width="28" height="28" patternUnits="userSpaceOnUse">
          {pattern === 'diamond' && (
            <>
              <path d="M14 2L26 14L14 26L2 14Z" fill="none" stroke={primary} strokeWidth="1.4" />
              <circle cx="14" cy="14" r="2.2" fill={secondary} />
            </>
          )}
          {pattern === 'zigzag' && (
            <>
              <path d="M0 10L7 3L14 10L21 3L28 10" fill="none" stroke={primary} strokeWidth="1.5" />
              <path d="M0 24L7 17L14 24L21 17L28 24" fill="none" stroke={secondary} strokeWidth="1.5" />
            </>
          )}
          {pattern === 'wave' && (
            <>
              <path d="M0 14Q7 6 14 14T28 14" fill="none" stroke={primary} strokeWidth="1.5" />
              <circle cx="14" cy="23" r="1.8" fill={secondary} />
            </>
          )}
          {pattern === 'sunburst' && (
            <>
              <circle cx="14" cy="14" r="5" fill="none" stroke={primary} strokeWidth="1.4" />
              <path d="M14 3V7M14 21V25M3 14H7M21 14H25" stroke={secondary} strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}
          {pattern === 'floral' && (
            <>
              <circle cx="14" cy="14" r="2.6" fill={secondary} />
              <circle cx="14" cy="8" r="2.2" fill="none" stroke={primary} strokeWidth="1.2" />
              <circle cx="14" cy="20" r="2.2" fill="none" stroke={primary} strokeWidth="1.2" />
              <circle cx="8" cy="14" r="2.2" fill="none" stroke={primary} strokeWidth="1.2" />
              <circle cx="20" cy="14" r="2.2" fill="none" stroke={primary} strokeWidth="1.2" />
            </>
          )}
          {pattern === 'spiral' && (
            <>
              <path d="M14 14m-7 0a7 7 0 1 0 14 0a5 5 0 1 0 -10 0a3 3 0 1 0 6 0" fill="none" stroke={primary} strokeWidth="1.3" />
              <circle cx="14" cy="14" r="1.5" fill={secondary} />
            </>
          )}
          {pattern === 'stepped' && (
            <>
              <path d="M2 14H8V8H20V14H26" fill="none" stroke={primary} strokeWidth="1.5" />
              <rect x="11" y="18" width="6" height="4" fill={secondary} fillOpacity="0.8" />
            </>
          )}
          {pattern === 'lattice' && (
            <>
              <path d="M0 0L28 28M28 0L0 28" stroke={primary} strokeWidth="1.1" />
              <circle cx="14" cy="14" r="2.4" fill={secondary} />
            </>
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
};

interface CostumePlaceholderProps {
  group: EthnicGroup;
  gender: 'male' | 'female';
}

/**
 * Unique museum garment specification plate rendered before an AI portrait is generated.
 * Distinct male vs female silhouette + each ethnic group's real color swatches and motif.
 */
export const CostumeExhibitionPlate: React.FC<CostumePlaceholderProps> = ({ group, gender }) => {
  const costume = group.costumes[gender];
  const [c1, c2, c3, c4] = [
    costume.colorSwatches[0] || group.accentColor,
    costume.colorSwatches[1] || group.secondaryColor,
    costume.colorSwatches[2] || '#FFC83D',
    costume.colorSwatches[3] || '#FFF9EA',
  ];

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-5 overflow-hidden select-none"
      style={{
        background: `radial-gradient(circle at 50% 25%, #FFFFFF 0%, #FFF9EA 62%, ${c1}18 100%)`,
      }}
    >
      <EthnicMotifPattern
        pattern={group.motifPattern}
        primary={c1}
        secondary={c2}
        idPrefix={`${group.id}-${gender}`}
      />

      {/* Top exhibition plate index */}
      <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-semibold tracking-wide text-slate-600">
        <span>
          {gender === 'male' ? "MEN'S ATTIRE PROFILE" : "WOMEN'S ATTIRE PROFILE"}
        </span>
        <span className="tabular-nums text-slate-500">
          #{String(group.number).padStart(2, '0')}
        </span>
      </div>

      {/* Bespoke Museum Garment Silhouette Illustration (distinct Male vs Female + Ethnic Colors) */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center my-2">
        <svg viewBox="0 0 220 290" className="w-full h-full max-h-[250px] drop-shadow-md">
          {/* Pedestal glow */}
          <ellipse cx="110" cy="268" rx="64" ry="11" fill={c1} fillOpacity="0.16" />
          <ellipse cx="110" cy="266" rx="48" ry="6.5" fill={c2} fillOpacity="0.18" />

          {/* Ornamental sun halo behind character */}
          <circle cx="110" cy="116" r="72" fill="#FFFFFF" fillOpacity="0.72" stroke={c2} strokeWidth="1.5" strokeDasharray="4 4" />

          {gender === 'male' ? (
            <g>
              {/* Head & Traditional Headband/Turban */}
              <circle cx="110" cy="54" r="19" fill="#F2C6A0" />
              <path d="M90 47C94 34 126 34 130 47C123 44 97 44 90 47Z" fill={c1} />
              <path d="M91 45H129" stroke={c2} strokeWidth="3.2" strokeLinecap="round" />
              {/* Friendly face */}
              <circle cx="104" cy="54" r="1.8" fill="#1E293B" />
              <circle cx="116" cy="54" r="1.8" fill="#1E293B" />
              <path d="M106 62Q110 65.5 114 62" stroke="#9A5B3C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              {/* Neck & silver ring/collar */}
              <rect x="104" y="71" width="12" height="10" rx="4" fill="#E8B48B" />
              <path d="M95 81Q110 92 125 81" stroke={c4} strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Male Jacket / Tunic */}
              <path d="M72 88L95 79H125L148 88L158 148L142 152L136 112L136 164H84L84 112L78 152L62 148L72 88Z" fill={c1} />
              {/* Woven brocade chest & cuff trim */}
              <rect x="106" y="81" width="8" height="82" fill={c2} />
              <path d="M84 150H136" stroke={c3} strokeWidth="4" />
              <path d="M64 141L79 145M156 141L141 145" stroke={c2} strokeWidth="4" strokeLinecap="round" />
              {/* Waist Sash */}
              <rect x="82" y="156" width="56" height="12" rx="3" fill={c2} />
              <path d="M118 168L128 205L114 205L108 168Z" fill={c3} />
              {/* Male Trousers / Ceremonial Lower Garment */}
              <path d="M84 168H136L142 252H116L110 198L104 252H78L84 168Z" fill={c1} fillOpacity="0.92" />
              <path d="M80 242H104M116 242H140" stroke={c2} strokeWidth="3.2" />
              {/* Shoes */}
              <ellipse cx="91" cy="258" rx="13" ry="6" fill="#1E293B" />
              <ellipse cx="129" cy="258" rx="13" ry="6" fill="#1E293B" />
            </g>
          ) : (
            <g>
              {/* Ornate Female Headdress / Headscarf */}
              <path d="M86 50C86 28 134 28 134 50L138 64L82 64L86 50Z" fill={c2} />
              <path d="M89 44C97 34 123 34 131 44" stroke={c3} strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <circle cx="110" cy="56" r="18" fill="#F6CCA8" />
              {/* Face */}
              <circle cx="104" cy="56" r="1.8" fill="#1E293B" />
              <circle cx="116" cy="56" r="1.8" fill="#1E293B" />
              <path d="M106 63.5Q110 67 114 63.5" stroke="#B45353" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              {/* Silver neck torque */}
              <path d="M94 79Q110 92 126 79" stroke="#E2E8F0" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              {/* Female Fitted Blouse */}
              <path d="M77 88L97 79H123L143 88L152 146L137 149L131 112L129 148H91L89 112L83 149L68 146L77 88Z" fill={c1} />
              {/* Embroidered collar & cuffs */}
              <path d="M95 81L110 98L125 81" stroke={c2} strokeWidth="4" fill="none" strokeLinejoin="round" />
              <path d="M70 139L84 142M150 139L136 142" stroke={c3} strokeWidth="4" strokeLinecap="round" />
              {/* Waistband / Cap Vay / Sash */}
              <rect x="88" y="144" width="44" height="13" rx="3" fill={c2} />
              <path d="M90 150.5H130" stroke={c3} strokeWidth="2.5" strokeDasharray="4 3" />
              {/* Flowing Skirt / Traditional Dress */}
              <path d="M89 156H131L152 248H68L89 156Z" fill={c1} />
              {/* Brocade lower bands on skirt */}
              <path d="M74 220H146" stroke={c2} strokeWidth="8" />
              <path d="M71 234H149" stroke={c3} strokeWidth="5" />
              <path d="M69 243H151" stroke={c4} strokeWidth="2.5" strokeDasharray="5 4" />
              {/* Decorative front apron panel */}
              <rect x="101" y="157" width="18" height="62" rx="2" fill={c2} fillOpacity="0.9" />
              <path d="M105 166H115M105 178H115M105 190H115M105 202H115" stroke={c3} strokeWidth="2.2" />
              {/* Feet / Slippers */}
              <ellipse cx="97" cy="256" rx="10" ry="5.5" fill="#1E293B" />
              <ellipse cx="123" cy="256" rx="10" ry="5.5" fill="#1E293B" />
            </g>
          )}
        </svg>
      </div>

      {/* Colour Swatch Strip representing real ethnic costume colours */}
      <div className="relative z-10 w-full flex flex-col items-center gap-2 pt-2 border-t border-slate-900/8">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500">Distinctive colour palette:</span>
          <div className="flex items-center gap-1.5">
            {costume.colorSwatches.map((hex, i) => (
              <span
                key={`${hex}-${i}`}
                className="w-4 h-4 rounded-full border border-slate-900/15 shadow-xs"
                style={{ backgroundColor: hex }}
                title={hex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
