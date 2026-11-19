import React from 'react';
import { Palette } from 'lucide-react';
import { EthnicGroup, LightboxImage } from '../types/ethnic';
import { CostumeExhibitionPlate } from './CulturalIcon';
import { useLanguage } from '../context/LanguageContext';

interface CostumeGalleryProps {
  group: EthnicGroup;
  onZoomImage?: (image: LightboxImage) => void;
}

interface CostumeColumnProps {
  group: EthnicGroup;
  gender: 'male' | 'female';
}

const CostumeColumn: React.FC<CostumeColumnProps> = ({ group, gender }) => {
  const { language, t } = useLanguage();
  const costume = group.costumes[gender];
  const heading = gender === 'male' ? t('costumeMaleHeading') : t('costumeFemaleHeading');
  const genderSub = gender === 'male' ? t('costumeMaleSub') : t('costumeFemaleSub');

  return (
    <section className="museum-card overflow-hidden flex flex-col">
      {/* Column Header */}
      <div className="px-4 py-3 border-b border-slate-900/8 flex items-center justify-between gap-2 bg-[#FFFDF8]">
        <div>
          <h3 className="font-display font-black text-sm lg:text-base tracking-wide text-slate-900">
            {heading}
          </h3>
          <p className="text-xs text-slate-500">
            {group.name} · {genderSub}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {costume.colorSwatches.map((hex, i) => (
            <span
              key={`${group.id}-${gender}-sw-${i}`}
              className="w-3.5 h-3.5 rounded-full border border-slate-900/15"
              style={{ backgroundColor: hex }}
              title={hex}
            />
          ))}
        </div>
      </div>

      {/* Portrait / Garment Model Frame */}
      <div className="relative w-full aspect-[3/4] max-h-[460px] bg-[#FFF9EA] overflow-hidden border-b border-slate-900/8">
        <CostumeExhibitionPlate group={group} gender={gender} />
      </div>

      {/* Palette Strip */}
      <div className="px-4 py-2.5 bg-[#FFFDF7] border-b border-slate-900/8 flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-[#15B8A6]" />
          <span>
            {language === 'vi'
              ? 'Bảng màu & kiểu dáng trang phục truyền thống'
              : 'Traditional colour palette & silhouette'}
          </span>
        </span>
      </div>

      {/* Structured Costume Information Placard */}
      <div className="p-4 lg:p-5 space-y-3 text-sm bg-white flex-1">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t('costumeDescLabel')}
          </h4>
          <p className="mt-1 text-slate-800 leading-relaxed">{costume.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-900/6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('costumeColorsLabel')}
            </h4>
            <p className="mt-0.5 text-slate-700 leading-relaxed">{costume.mainColors}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('costumeMaterialsLabel')}
            </h4>
            <p className="mt-0.5 text-slate-700 leading-relaxed">{costume.materials}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-900/6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t('costumePatternsLabel')}
          </h4>
          <p className="mt-0.5 text-slate-700 leading-relaxed">{costume.patterns}</p>
        </div>

        <div className="pt-2 border-t border-slate-900/6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t('costumeAccessoriesLabel')}
          </h4>
          <p className="mt-0.5 text-slate-700 leading-relaxed">{costume.accessories}</p>
        </div>

        <div className="pt-2 border-t border-slate-900/6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t('costumeMeaningLabel')}
          </h4>
          <p className="mt-0.5 text-slate-700 leading-relaxed">{costume.culturalMeaning}</p>
        </div>

        {costume.variantNote && (
          <p className="pt-2 border-t border-slate-900/6 text-xs text-slate-500 italic leading-relaxed">
            {t('costumeVariantLabel')}: {costume.variantNote}
          </p>
        )}
      </div>
    </section>
  );
};

export const CostumeGallery: React.FC<CostumeGalleryProps> = ({ group, onZoomImage }) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="font-display font-extrabold type-section text-slate-900">
            {language === 'vi'
              ? `Trang phục truyền thống Dân tộc ${group.name}`
              : `Traditional Costumes of the ${group.name} People`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'vi'
              ? `Trưng bày song song trang phục nam và nữ, thể hiện sắc thái văn hóa, hoa văn dệt và phụ kiện đặc trưng của cộng đồng người ${group.name}.`
              : `Side-by-side display of male and female attire highlighting the distinct colour palettes, woven motifs, and authentic accessories of the ${group.name} community.`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
        <CostumeColumn group={group} gender="male" />
        <CostumeColumn group={group} gender="female" />
      </div>
    </div>
  );
};
