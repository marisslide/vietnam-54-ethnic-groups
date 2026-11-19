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

export type CostumeArchetype =
  | 'kinh'
  | 'thai'
  | 'muong'
  | 'hmong'
  | 'dao'
  | 'cham'
  | 'khmer'
  | 'tay-nung'
  | 'tay-nguyen'
  | 'patchwork'
  | 'hoa';

export function getCostumeArchetype(groupId: string): CostumeArchetype {
  switch (groupId) {
    case 'kinh':
      return 'kinh';
    case 'thai':
    case 'khang':
    case 'la-ha':
    case 'lao':
    case 'lu':
    case 'xinh-mun':
      return 'thai';
    case 'muong':
    case 'tho':
    case 'chut':
      return 'muong';
    case 'hmong':
    case 'co-lao':
    case 'pu-peo':
      return 'hmong';
    case 'dao':
    case 'pa-then':
      return 'dao';
    case 'cham':
      return 'cham';
    case 'kho-me':
      return 'khmer';
    case 'tay':
    case 'nung':
    case 'giay':
    case 'bo-y':
    case 'san-chay':
      return 'tay-nung';
    case 'ha-nhi':
    case 'lo-lo':
    case 'phu-la':
    case 'si-la':
    case 'la-hu':
    case 'mang':
    case 'cong':
    case 'la-chi':
    case 'kho-mu':
    case 'o-du':
      return 'patchwork';
    case 'hoa':
    case 'ngai':
    case 'san-diu':
      return 'hoa';
    default:
      return 'tay-nguyen';
  }
}

interface CostumeFigureProps {
  archetype: CostumeArchetype;
  c1: string;
  c2: string;
  c3: string;
  c4: string;
}

const MaleCostumeFigure: React.FC<CostumeFigureProps> = ({ archetype, c1, c2, c3 }) => {
  return (
    <g>
      {/* Head & Neck Base */}
      <rect x="104" y="69" width="12" height="12" rx="4" fill="#E8B48B" />
      <circle cx="110" cy="54" r="18" fill="#F5CCA6" />
      <circle cx="104" cy="54" r="1.8" fill="#1E293B" />
      <circle cx="116" cy="54" r="1.8" fill="#1E293B" />
      <path d="M106 62Q110 65.5 114 62" stroke="#9A5B3C" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {archetype === 'kinh' && (
        <>
          {/* Khăn Đóng / Khăn Xếp (multi-tiered folded arcs) */}
          <path d="M89 48C92 32 128 32 131 48Z" fill="#0F172A" />
          <path d="M91 38Q110 44 129 38" stroke="#334155" strokeWidth="2.5" fill="none" />
          <path d="M90 42Q110 48 130 42" stroke="#1E293B" strokeWidth="2.5" fill="none" />
          <path d="M89 46Q110 52 131 46" stroke="#475569" strokeWidth="2.5" fill="none" />
          {/* Standing mandarin collar */}
          <rect x="104" y="69" width="12" height="7" rx="1.5" fill={c1} stroke={c2} strokeWidth="1" />
          {/* Robe (Áo ngũ thân) with curved right-side overlap */}
          <path d="M74 84L96 76H124L146 84L154 144L138 148L132 108L134 212H86L88 108L82 148L66 144Z" fill={c1} />
          <path d="M110 76C120 78 126 84 126 96V144" stroke={c2} strokeWidth="2" fill="none" />
          <circle cx="126" cy="88" r="2" fill="#FBBF24" />
          <circle cx="126" cy="104" r="2" fill="#FBBF24" />
          <circle cx="126" cy="120" r="2" fill="#FBBF24" />
          <path d="M86 210H134" stroke={c2} strokeWidth="3" />
          {/* White silk trousers */}
          <path d="M86 208H134L138 252H118L110 226L102 252H82Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          {/* Shoes */}
          <ellipse cx="92" cy="258" rx="12" ry="5.5" fill="#1E293B" />
          <ellipse cx="128" cy="258" rx="12" ry="5.5" fill="#1E293B" />
        </>
      )}

      {archetype === 'thai' && (
        <>
          {/* Indigo flat turban with contrast trim */}
          <rect x="88" y="42" width="44" height="10" rx="3" fill={c1} />
          <line x1="88" y1="47" x2="132" y2="47" stroke={c2} strokeWidth="2.5" />
          {/* Short indigo jacket (Áo chàm ngắn) */}
          <path d="M74 85L96 77H124L146 85L154 146L138 150L132 110L132 160H88L88 110L82 150L66 146Z" fill={c1} />
          <line x1="110" y1="77" x2="110" y2="160" stroke={c2} strokeWidth="2.5" />
          <circle cx="110" cy="94" r="2.2" fill={c3} />
          <circle cx="110" cy="112" r="2.2" fill={c3} />
          <circle cx="110" cy="130" r="2.2" fill={c3} />
          <circle cx="110" cy="148" r="2.2" fill={c3} />
          <line x1="68" y1="144" x2="82" y2="148" stroke={c2} strokeWidth="3" />
          <line x1="152" y1="144" x2="138" y2="148" stroke={c2} strokeWidth="3" />
          {/* Cloth waist sash */}
          <rect x="84" y="156" width="52" height="10" rx="2" fill={c2} />
          {/* Trousers */}
          <path d="M86 164H134L140 252H116L110 196L104 252H80Z" fill={c1} fillOpacity="0.95" />
          <ellipse cx="92" cy="258" rx="12" ry="5.5" fill="#1E293B" />
          <ellipse cx="128" cy="258" rx="12" ry="5.5" fill="#1E293B" />
        </>
      )}

      {archetype === 'muong' && (
        <>
          {/* Headband with side knot */}
          <rect x="90" y="43" width="40" height="9" rx="2" fill={c1} />
          <circle cx="128" cy="48" r="3.5" fill="#FFFFFF" />
          {/* Open-neck jacket with white inner bib */}
          <path d="M74 85L96 77H124L146 85L154 146L138 150L132 110L132 162H88L88 110L82 150L66 146Z" fill={c1} />
          <path d="M102 77L110 96L118 77Z" fill="#FFFFFF" />
          <line x1="88" y1="160" x2="132" y2="160" stroke={c2} strokeWidth="3" />
          <rect x="84" y="158" width="52" height="10" rx="2" fill={c2} />
          {/* Trousers */}
          <path d="M86 166H134L140 252H116L110 196L104 252H80Z" fill={c1} />
          <ellipse cx="92" cy="258" rx="12" ry="5.5" fill="#1E293B" />
          <ellipse cx="128" cy="258" rx="12" ry="5.5" fill="#1E293B" />
        </>
      )}

      {archetype === 'hmong' && (
        <>
          {/* Black skullcap with crimson silk pom-pom */}
          <path d="M92 46C96 34 124 34 128 46Z" fill="#1E293B" />
          <circle cx="110" cy="33" r="4.5" fill="#EF4444" />
          {/* Silver neck torque */}
          <path d="M94 77Q110 88 126 77" stroke="#E2E8F0" strokeWidth="3" fill="none" />
          {/* Cropped jacket with multi-colored sleeves */}
          <path d="M75 86L96 78H124L145 86L155 146L140 149L133 110L132 148H88L87 110L80 149L65 146Z" fill={c1} />
          <line x1="68" y1="142" x2="82" y2="145" stroke={c2} strokeWidth="3" />
          <line x1="152" y1="142" x2="138" y2="145" stroke={c2} strokeWidth="3" />
          <line x1="70" y1="136" x2="84" y2="139" stroke={c3} strokeWidth="2.5" />
          <line x1="150" y1="136" x2="136" y2="139" stroke={c3} strokeWidth="2.5" />
          {/* Wide embroidered sash */}
          <rect x="84" y="146" width="52" height="12" rx="2" fill={c2} />
          <line x1="84" y1="152" x2="136" y2="152" stroke={c3} strokeWidth="2" strokeDasharray="3 2" />
          {/* Drop-crotch wide trousers (quần đũng thụng) */}
          <path d="M84 158H136L146 248H122L110 238L98 248H74Z" fill={c1} />
          <line x1="74" y1="242" x2="98" y2="242" stroke={c2} strokeWidth="2.5" />
          <line x1="122" y1="242" x2="146" y2="242" stroke={c2} strokeWidth="2.5" />
          <ellipse cx="90" cy="256" rx="11" ry="5.5" fill="#1E293B" />
          <ellipse cx="130" cy="256" rx="11" ry="5.5" fill="#1E293B" />
        </>
      )}

      {archetype === 'dao' && (
        <>
          {/* Indigo head wrap with red tassel */}
          <rect x="88" y="42" width="44" height="10" rx="2" fill={c1} />
          <line x1="88" y1="48" x2="132" y2="48" stroke="#EF4444" strokeWidth="2.5" />
          <line x1="128" y1="48" x2="136" y2="62" stroke="#EF4444" strokeWidth="2" />
          {/* Indigo coat trimmed with red thread & pom-poms */}
          <path d="M74 85L96 77H124L146 85L154 146L138 150L132 110L134 186H86L88 110L82 150L66 146Z" fill={c1} />
          <path d="M96 77L110 96V186" stroke="#EF4444" strokeWidth="3" fill="none" />
          <circle cx="110" cy="98" r="4" fill="#EF4444" />
          <circle cx="110" cy="116" r="4" fill="#EF4444" />
          {/* Trousers with red cuff */}
          <path d="M86 186H134L140 252H116L110 206L104 252H80Z" fill={c1} />
          <line x1="80" y1="244" x2="104" y2="244" stroke="#EF4444" strokeWidth="2.5" />
          <line x1="116" y1="244" x2="140" y2="244" stroke="#EF4444" strokeWidth="2.5" />
          <ellipse cx="92" cy="258" rx="12" ry="5.5" fill="#1E293B" />
          <ellipse cx="128" cy="258" rx="12" ry="5.5" fill="#1E293B" />
        </>
      )}

      {archetype === 'cham' && (
        <>
          {/* White Pakhan turban with red trim and fringes */}
          <rect x="88" y="42" width="44" height="10" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="88" y1="47" x2="132" y2="47" stroke="#DC2626" strokeWidth="2" />
          <path d="M87 46L82 60" stroke="#DC2626" strokeWidth="2" />
          <path d="M133 46L138 60" stroke="#DC2626" strokeWidth="2" />
          {/* Crisp white knee-length robe (Aw xăm) */}
          <path d="M74 84L96 76H124L146 84L154 144L138 148L132 108L134 214H86L88 108L82 148L66 144Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
          <line x1="110" y1="76" x2="110" y2="152" stroke="#DC2626" strokeWidth="2.5" />
          {/* Red/gold ceremonial sash */}
          <rect x="84" y="152" width="52" height="12" rx="2" fill="#DC2626" />
          <path d="M116 164L124 204L112 204L108 164Z" fill="#FBBF24" />
          {/* Patterned sarong (Khan kănh) */}
          <path d="M86 214H134L136 248H84Z" fill={c1} />
          <line x1="84" y1="242" x2="136" y2="242" stroke="#FBBF24" strokeWidth="3" />
          <ellipse cx="92" cy="258" rx="12" ry="5.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <ellipse cx="128" cy="258" rx="12" ry="5.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        </>
      )}

      {archetype === 'khmer' && (
        <>
          {/* Silk shirt with gold sash */}
          <path d="M74 85L96 77H124L146 85L154 146L138 150L132 110L132 158H88L88 110L82 150L66 146Z" fill={c1} />
          <line x1="96" y1="78" x2="128" y2="156" stroke="#FBBF24" strokeWidth="4" />
          {/* Sampot Chang Kben */}
          <path d="M84 158H136L142 226L124 236L110 186L96 236L78 226Z" fill={c2} />
          <line x1="80" y1="222" x2="140" y2="222" stroke="#FBBF24" strokeWidth="2.5" />
          <ellipse cx="92" cy="256" rx="10" ry="5" fill="#E8B48B" />
          <ellipse cx="128" cy="256" rx="10" ry="5" fill="#E8B48B" />
        </>
      )}

      {archetype === 'tay-nung' && (
        <>
          {/* Indigo 4-pocket jacket */}
          <path d="M74 85L96 77H124L146 85L154 146L138 150L132 110L132 164H88L88 110L82 150L66 146Z" fill={c1} />
          <rect x="91" y="98" width="12" height="13" rx="1.5" fill={c1} stroke={c2} strokeWidth="1" />
          <rect x="117" y="98" width="12" height="13" rx="1.5" fill={c1} stroke={c2} strokeWidth="1" />
          <rect x="91" y="132" width="13" height="15" rx="1.5" fill={c1} stroke={c2} strokeWidth="1" />
          <rect x="116" y="132" width="13" height="15" rx="1.5" fill={c1} stroke={c2} strokeWidth="1" />
          <line x1="110" y1="77" x2="110" y2="164" stroke={c2} strokeWidth="2.5" />
          <path d="M86 164H134L140 252H116L110 196L104 252H80Z" fill={c1} />
          <ellipse cx="92" cy="258" rx="12" ry="5.5" fill="#1E293B" />
          <ellipse cx="128" cy="258" rx="12" ry="5.5" fill="#1E293B" />
        </>
      )}

      {archetype === 'tay-nguyen' && (
        <>
          {/* Woven brow-band & feather */}
          <rect x="88" y="44" width="44" height="8" rx="2" fill={c2} />
          <line x1="88" y1="48" x2="132" y2="48" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3 2" />
          <path d="M126 44L132 26L129 44" fill="#EF4444" />
          {/* Bare arms & V-neck sleeveless vest (Áo khoét nách) */}
          <path d="M74 85L66 146L78 148L84 94Z" fill="#F5CCA6" />
          <path d="M146 85L154 146L142 148L136 94Z" fill="#F5CCA6" />
          <path d="M82 82L97 74H123L138 82L142 148H78Z" fill={c1} />
          <path d="M97 75L110 106L123 75" stroke={c2} strokeWidth="3.5" fill="none" />
          <line x1="80" y1="116" x2="140" y2="116" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="4 2" />
          <line x1="80" y1="148" x2="140" y2="148" stroke={c2} strokeWidth="3" />
          {/* Bare legs for loincloth */}
          <path d="M84 158L82 254H102L106 186Z" fill="#F5CCA6" />
          <path d="M136 158L138 254H118L114 186Z" fill="#F5CCA6" />
          {/* Waistband of Loincloth (Kơ-pên) */}
          <rect x="84" y="148" width="52" height="14" rx="2" fill={c1} stroke={c2} strokeWidth="1.5" />
          {/* Long Draping Apron Flap (vạt khố) */}
          <path d="M98 152H122L124 238H96Z" fill={c1} />
          <line x1="97" y1="184" x2="123" y2="184" stroke={c2} strokeWidth="3" />
          <line x1="97" y1="200" x2="123" y2="200" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="3 2" />
          <line x1="96" y1="216" x2="124" y2="216" stroke={c2} strokeWidth="3" />
          {/* RED WOOL TASSELS dangling from loincloth flap */}
          <path d="M96 238V250M102 238V252M108 238V254M114 238V252M120 238V250M124 238V248" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="92" cy="256" rx="10" ry="5" fill="#E8B48B" />
          <ellipse cx="128" cy="256" rx="10" ry="5" fill="#E8B48B" />
        </>
      )}

      {(archetype === 'patchwork' || archetype === 'hoa') && (
        <>
          {/* Traditional jacket & trousers */}
          <rect x="90" y="43" width="40" height="9" rx="2" fill={c1} />
          <path d="M74 85L96 77H124L146 85L154 146L138 150L132 110L132 162H88L88 110L82 150L66 146Z" fill={c1} />
          <line x1="110" y1="77" x2="110" y2="162" stroke={c2} strokeWidth="2.5" />
          <line x1="68" y1="144" x2="82" y2="148" stroke={c2} strokeWidth="3" />
          <line x1="152" y1="144" x2="138" y2="148" stroke={c2} strokeWidth="3" />
          <rect x="84" y="156" width="52" height="10" rx="2" fill={c2} />
          <path d="M86 164H134L140 252H116L110 196L104 252H80Z" fill={c1} />
          <ellipse cx="92" cy="258" rx="12" ry="5.5" fill="#1E293B" />
          <ellipse cx="128" cy="258" rx="12" ry="5.5" fill="#1E293B" />
        </>
      )}
    </g>
  );
};

const FemaleCostumeFigure: React.FC<CostumeFigureProps> = ({ archetype, c1, c2, c3, c4 }) => {
  return (
    <g>
      {/* Head & Neck Base */}
      <rect x="104" y="69" width="12" height="12" rx="4" fill="#E8B48B" />
      <circle cx="110" cy="54" r="18" fill="#F6CCA8" />
      <circle cx="104" cy="54" r="1.8" fill="#1E293B" />
      <circle cx="116" cy="54" r="1.8" fill="#1E293B" />
      <path d="M106 63.5Q110 67 114 63.5" stroke="#B45353" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {archetype === 'kinh' && (
        <>
          {/* Hair Bun & Golden Hairpin */}
          <ellipse cx="110" cy="46" rx="19" ry="12" fill="#0F172A" />
          <line x1="124" y1="42" x2="136" y2="34" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
          {/* Silver Torque (Kiềng Bạc) */}
          <path d="M94 77Q110 88 126 77" stroke="#CBD5E1" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* High Collar & Form-Fitting Bodice of Áo Dài */}
          <rect x="104" y="69" width="12" height="7" rx="1.5" fill={c1} />
          <path d="M78 85L98 76H122L142 85L150 144L136 147L128 108L125 142H95L92 108L84 147L70 144Z" fill={c1} />
          <path d="M110 76C118 78 124 82 124 92" stroke={c2} strokeWidth="1.5" fill="none" />
          {/* White Silk Trousers underneath */}
          <path d="M86 142H134L142 252H118L110 180L102 252H78Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          {/* Flowing 2 Tà Áo Dài */}
          <path d="M94 142H126L134 238H86Z" fill={c1} fillOpacity="0.95" />
          <path d="M106 170Q110 190 114 210" stroke={c2} strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
          <ellipse cx="96" cy="256" rx="9" ry="5" fill="#1E293B" />
          <ellipse cx="124" cy="256" rx="9" ry="5" fill="#1E293B" />
        </>
      )}

      {archetype === 'thai' && (
        <>
          {/* Khăn Piêu with embroidered corner accents */}
          <path d="M82 46L110 28L138 46L142 66L134 68L132 50L88 50L86 68L78 66Z" fill={c1} />
          <circle cx="80" cy="62" r="3" fill="#EF4444" />
          <circle cx="140" cy="62" r="3" fill="#EF4444" />
          <path d="M86 48L110 32L134 48" stroke={c2} strokeWidth="2.5" fill="none" />
          {/* Áo Cóm with Silver Butterfly Buttons (khau kẹp) */}
          <path d="M78 86L98 78H122L142 86L150 142L136 145L130 110L128 142H92L90 110L84 145L70 142Z" fill={c1} />
          <path d="M107 88L113 94M107 94L113 88" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
          <path d="M107 100L113 106M107 106L113 100" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
          <path d="M107 112L113 118M107 118L113 112" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
          <path d="M107 124L113 130M107 130L113 124" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
          <path d="M107 136L113 142M107 142L113 136" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
          {/* Emerald Green Waist Sash (xài eo) */}
          <rect x="86" y="142" width="48" height="12" rx="2" fill="#10B981" />
          <path d="M86 148L78 184L88 184L90 148Z" fill="#10B981" />
          {/* Straight Black Floor-Length Skirt (váy đen) */}
          <path d="M88 154H132L135 252H85Z" fill="#18181B" />
          <line x1="85" y1="244" x2="135" y2="244" stroke={c2} strokeWidth="4" />
          <ellipse cx="96" cy="256" rx="9" ry="5" fill="#1E293B" />
          <ellipse cx="124" cy="256" rx="9" ry="5" fill="#1E293B" />
        </>
      )}

      {archetype === 'muong' && (
        <>
          {/* White Headscarf (khăn trắng Mường) */}
          <path d="M88 46C92 32 128 32 132 46L134 54L86 54Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <path d="M130 50L138 64L134 66L128 54Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
          {/* Áo pắn with V-shaped inner bib (yếm) */}
          <path d="M78 86L98 78H122L142 86L150 134L136 137L130 108L126 132H94L90 108L84 137L70 134Z" fill={c1} />
          <path d="M98 78L110 98L122 78Z" fill={c2} />
          {/* High Woven Brocade Waistband (cạp váy Mường rực rỡ) */}
          <rect x="88" y="132" width="44" height="24" rx="2" fill={c2} />
          <line x1="88" y1="140" x2="132" y2="140" stroke="#FBBF24" strokeWidth="2" />
          <line x1="88" y1="148" x2="132" y2="148" stroke="#10B981" strokeWidth="2" />
          <path d="M94 144L98 140L102 144L98 148Z" fill="#FBBF24" />
          <path d="M106 144L110 140L114 144L110 148Z" fill="#FBBF24" />
          <path d="M118 144L122 140L126 144L122 148Z" fill="#FBBF24" />
          {/* Straight Black Floor-Length Skirt */}
          <path d="M88 156H132L135 252H85Z" fill="#18181B" />
          <ellipse cx="96" cy="256" rx="9" ry="5" fill="#1E293B" />
          <ellipse cx="124" cy="256" rx="9" ry="5" fill="#1E293B" />
        </>
      )}

      {archetype === 'hmong' && (
        <>
          {/* Circular headdress with bead fringe */}
          <path d="M86 50C86 28 134 28 134 50L138 60L82 60Z" fill={c2} />
          <line x1="86" y1="44" x2="134" y2="44" stroke="#FBBF24" strokeWidth="3" />
          <circle cx="94" cy="54" r="1.5" fill="#E2E8F0" />
          <circle cx="102" cy="55" r="1.5" fill="#E2E8F0" />
          <circle cx="110" cy="56" r="1.5" fill="#E2E8F0" />
          <circle cx="118" cy="55" r="1.5" fill="#E2E8F0" />
          <circle cx="126" cy="54" r="1.5" fill="#E2E8F0" />
          {/* Blouse with horizontal banded sleeves */}
          <path d="M78 86L98 78H122L142 86L150 144L136 147L130 110L128 148H92L90 110L84 147L70 144Z" fill={c1} />
          <path d="M96 78L110 102L124 78" stroke={c2} strokeWidth="3.5" fill="none" />
          <line x1="70" y1="122" x2="84" y2="125" stroke={c2} strokeWidth="3" />
          <line x1="70" y1="130" x2="84" y2="133" stroke="#FBBF24" strokeWidth="2.5" />
          <line x1="150" y1="122" x2="136" y2="125" stroke={c2} strokeWidth="3" />
          <line x1="150" y1="130" x2="136" y2="133" stroke="#FBBF24" strokeWidth="2.5" />
          {/* Broad Flared Pleated Skirt (váy xòe xếp nếp) */}
          <path d="M86 154H134L170 244H50Z" fill={c1} />
          <path d="M88 154L64 244M98 154L86 244M110 154L110 244M122 154L134 244M132 154L156 244" stroke={c2} strokeWidth="1" strokeOpacity="0.6" />
          <path d="M56 226H164" stroke={c2} strokeWidth="6" />
          <path d="M52 236H168" stroke="#FBBF24" strokeWidth="3" />
          {/* Front Apron Panel (tạp dề) */}
          <rect x="100" y="154" width="20" height="74" rx="2" fill={c2} stroke={c3} strokeWidth="1" />
          {/* Leg wraps (xà cạp) */}
          <rect x="88" y="244" width="16" height="10" rx="1.5" fill={c1} stroke={c2} strokeWidth="1" />
          <rect x="116" y="244" width="16" height="10" rx="1.5" fill={c1} stroke={c2} strokeWidth="1" />
          <ellipse cx="96" cy="256" rx="9" ry="5" fill="#1E293B" />
          <ellipse cx="124" cy="256" rx="9" ry="5" fill="#1E293B" />
        </>
      )}

      {archetype === 'dao' && (
        <>
          {/* Scarlet Headdress (Khăn đỏ Dao) */}
          <path d="M74 48L110 16L146 48Z" fill="#DC2626" />
          <line x1="74" y1="46" x2="146" y2="46" stroke="#FBBF24" strokeWidth="2.5" />
          <line x1="82" y1="48" x2="82" y2="58" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="96" y1="48" x2="96" y2="58" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="110" y1="48" x2="110" y2="58" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="124" y1="48" x2="124" y2="58" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="138" y1="48" x2="138" y2="58" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Coat with 5 Large Red Woolen Pom-poms (quả bông đỏ) */}
          <path d="M78 86L98 78H122L142 86L150 146L136 149L130 110L130 186H90L90 110L84 149L70 146Z" fill={c1} />
          <circle cx="102" cy="88" r="6" fill="#EF4444" />
          <circle cx="118" cy="88" r="6" fill="#EF4444" />
          <circle cx="98" cy="102" r="6" fill="#EF4444" />
          <circle cx="122" cy="102" r="6" fill="#EF4444" />
          <circle cx="110" cy="116" r="6.5" fill="#EF4444" />
          {/* Trousers with white pine-tree stitches */}
          <path d="M90 186H130L136 252H116L110 206L104 252H84Z" fill={c1} />
          <path d="M88 236L92 230L96 236M92 230V242" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M124 236L128 230L132 236M128 230V242" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="96" cy="256" rx="9" ry="5" fill="#1E293B" />
          <ellipse cx="124" cy="256" rx="9" ry="5" fill="#1E293B" />
        </>
      )}

      {archetype === 'cham' && (
        <>
          {/* Sheer Veil (Khăn Mat'ram) */}
          <path d="M86 44C86 28 134 28 134 44L144 116L134 118L130 52L90 52L86 118L76 116Z" fill={c3} fillOpacity="0.75" />
          {/* Signature Aw tei Long Gown */}
          <path d="M78 84L98 76H122L142 84L150 144L136 147L128 108L128 226H92L92 108L84 147L70 144Z" fill={c1} />
          {/* Diagonal Cross-chest Sash */}
          <path d="M96 78L126 146L118 150L88 82Z" fill={c2} />
          <line x1="92" y1="80" x2="122" y2="148" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3 2" />
          {/* Hip Belt & Trailing Tassel */}
          <rect x="88" y="146" width="44" height="12" rx="2" fill={c2} />
          <path d="M90 158L88 210L96 210L98 158Z" fill="#FBBF24" />
          {/* Khan Niếp Gold Hem */}
          <line x1="92" y1="220" x2="128" y2="220" stroke="#FBBF24" strokeWidth="5" />
          <ellipse cx="96" cy="256" rx="9" ry="5" fill="#1E293B" />
          <ellipse cx="124" cy="256" rx="9" ry="5" fill="#1E293B" />
        </>
      )}

      {archetype === 'khmer' && (
        <>
          {/* Golden Sbay Shawl draped across left shoulder */}
          <path d="M94 77L126 146L134 218L124 218L116 150L86 81Z" fill="#FBBF24" />
          <path d="M90 79L122 148" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 2" />
          {/* Silk Blouse (Áo tầm vông) */}
          <path d="M78 85L98 77H122L142 85L150 144L136 147L128 108L128 144H92L92 108L84 147L70 144Z" fill={c1} />
          {/* Silk Sampot with Gold Brocade */}
          <path d="M88 146H132L138 252H82Z" fill={c2} />
          <line x1="82" y1="244" x2="138" y2="244" stroke="#FBBF24" strokeWidth="4" />
          <circle cx="122" cy="42" r="3.5" fill="#FBBF24" />
          <ellipse cx="96" cy="256" rx="9" ry="5" fill="#E8B48B" />
          <ellipse cx="124" cy="256" rx="9" ry="5" fill="#E8B48B" />
        </>
      )}

      {archetype === 'tay-nung' && (
        <>
          {/* Crow-beak Scarf (Khăn mỏ quạ) */}
          <path d="M88 44L110 54L132 44L136 56L84 56Z" fill="#0F172A" />
          {/* Silver Neck Torque (Kiềng bạc) */}
          <path d="M93 78Q110 90 127 78" stroke="#E2E8F0" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* 5-panel Indigo Gown */}
          <path d="M78 85L98 77H122L142 85L150 144L136 147L128 108L128 214H92L92 108L84 147L70 144Z" fill={c1} />
          {/* Colorful Silk Belt with Tail */}
          <rect x="88" y="144" width="44" height="10" rx="2" fill={c2} />
          <path d="M88 154L82 198L90 198L96 154Z" fill={c2} />
          {/* Trousers underneath */}
          <path d="M88 214H132L136 252H116L110 220L104 252H84Z" fill={c1} />
          <ellipse cx="96" cy="256" rx="9" ry="5" fill="#1E293B" />
          <ellipse cx="124" cy="256" rx="9" ry="5" fill="#1E293B" />
        </>
      )}

      {archetype === 'tay-nguyen' && (
        <>
          {/* Headband */}
          <rect x="90" y="44" width="40" height="8" rx="2" fill={c2} />
          {/* Multi-strand Glass Bead Necklaces (chuỗi cườm) */}
          <path d="M94 77Q110 88 126 77" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M92 83Q110 95 128 83" stroke="#FBBF24" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M90 89Q110 102 130 89" stroke="#06B6D4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Boat-neck Pullover (Áo chui đầu cổ thuyền) */}
          <path d="M78 85L94 76H126L142 85L150 144L136 147L128 108L128 144H92L92 108L84 147L70 144Z" fill={c1} />
          <line x1="72" y1="102" x2="148" y2="102" stroke={c2} strokeWidth="3" />
          <line x1="72" y1="114" x2="148" y2="114" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="4 2" />
          <line x1="72" y1="126" x2="148" y2="126" stroke={c2} strokeWidth="3" />
          {/* Wrapped Tube Skirt (Váy tấm Amiêng) */}
          <path d="M86 146H134L138 252H82Z" fill={c1} />
          <line x1="84" y1="184" x2="136" y2="184" stroke={c2} strokeWidth="4" />
          <line x1="84" y1="198" x2="136" y2="198" stroke="#FBBF24" strokeWidth="3" strokeDasharray="3 2" />
          <line x1="83" y1="230" x2="137" y2="230" stroke={c2} strokeWidth="6" />
          <line x1="82" y1="242" x2="138" y2="242" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="4 3" />
          <ellipse cx="94" cy="256" rx="9" ry="5" fill="#F5CCA6" />
          <ellipse cx="126" cy="256" rx="9" ry="5" fill="#F5CCA6" />
        </>
      )}

      {(archetype === 'patchwork' || archetype === 'hoa') && (
        <>
          {/* Mosaic Patchwork Jacket / Diagonal Clasp Blouse */}
          <path d="M86 48C90 32 130 32 134 48Z" fill={c2} />
          <path d="M78 86L98 78H122L142 86L150 144L136 147L130 110L128 146H92L90 110L84 147L70 144Z" fill={c1} />
          <path d="M96 78L126 144" stroke={c2} strokeWidth="3" fill="none" />
          <line x1="70" y1="128" x2="84" y2="131" stroke={c3} strokeWidth="3" />
          <line x1="150" y1="128" x2="136" y2="131" stroke={c3} strokeWidth="3" />
          <rect x="88" y="146" width="44" height="12" rx="2" fill={c2} />
          <path d="M88 156H132L140 252H80Z" fill={c1} />
          <line x1="82" y1="236" x2="138" y2="236" stroke={c2} strokeWidth="5" />
          <line x1="80" y1="244" x2="140" y2="244" stroke={c4} strokeWidth="3" />
          <ellipse cx="96" cy="256" rx="9" ry="5" fill="#1E293B" />
          <ellipse cx="124" cy="256" rx="9" ry="5" fill="#1E293B" />
        </>
      )}
    </g>
  );
};

interface CostumePlaceholderProps {
  group: EthnicGroup;
  gender: 'male' | 'female';
}

/**
 * Authentic museum garment specification plate.
 * Features culturally accurate illustrated silhouettes (cuts, headwear, ornaments, belts)
 * tailored to each ethnic group's documented traditions.
 */
export const CostumeExhibitionPlate: React.FC<CostumePlaceholderProps> = ({ group, gender }) => {
  const costume = group.costumes[gender];
  const [c1, c2, c3, c4] = [
    costume.colorSwatches[0] || group.accentColor,
    costume.colorSwatches[1] || group.secondaryColor,
    costume.colorSwatches[2] || '#FFC83D',
    costume.colorSwatches[3] || '#FFF9EA',
  ];

  const archetype = getCostumeArchetype(group.id);

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

      {/* Bespoke Museum Garment Silhouette Illustration tailored to cultural archetype */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center my-2">
        <svg viewBox="0 0 220 290" className="w-full h-full max-h-[260px] drop-shadow-md">
          {/* Pedestal glow */}
          <ellipse cx="110" cy="268" rx="64" ry="11" fill={c1} fillOpacity="0.16" />
          <ellipse cx="110" cy="266" rx="48" ry="6.5" fill={c2} fillOpacity="0.18" />

          {/* Ornamental sun halo behind character */}
          <circle
            cx="110"
            cy="116"
            r="72"
            fill="#FFFFFF"
            fillOpacity="0.75"
            stroke={c2}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {gender === 'male' ? (
            <MaleCostumeFigure archetype={archetype} c1={c1} c2={c2} c3={c3} c4={c4} />
          ) : (
            <FemaleCostumeFigure archetype={archetype} c1={c1} c2={c2} c3={c3} c4={c4} />
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
