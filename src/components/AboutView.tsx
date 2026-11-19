import React, { useMemo } from 'react';
import { ExternalLink, BookOpen, Compass, Layers, ArrowRight } from 'lucide-react';
import {
  getEthnicGroups,
  getLanguageFamilies,
  getOfficialReferenceSources,
  getRegions,
  countGroupsInRegion,
} from '../data/ethnicGroups';
import { STATIC_ASSETS } from '../data/staticAssets';
import { useLanguage } from '../context/LanguageContext';

interface AboutViewProps {
  onExploreAll: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onExploreAll }) => {
  const { language, t } = useLanguage();

  const regions = useMemo(() => getRegions(language), [language]);
  const languageFamilies = useMemo(() => getLanguageFamilies(language), [language]);
  const officialSources = useMemo(() => getOfficialReferenceSources(language), [language]);
  const allGroups = useMemo(() => getEthnicGroups(language), [language]);

  return (
    <div className="h-full max-w-[1920px] w-full mx-auto px-4 lg:px-7 py-4 overflow-y-auto museum-scroll">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Vision, Mission & Cultural Showcase */}
        <section className="lg:col-span-7 space-y-5">
          <div className="museum-card overflow-hidden bg-white">
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={STATIC_ASSETS.cultureFestivalMuseum}
                alt={t('brandName')}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent flex flex-col justify-end p-5 lg:p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFC83D]">
                  {t('aboutHeaderTag')}
                </p>
                <h1 className="font-display font-black type-page-title mt-1">
                  {t('aboutMainTitle')}
                </h1>
                <p className="text-sm text-amber-50/90 mt-1">
                  {t('aboutSlogan')}
                </p>
              </div>
            </div>

            <div className="p-5 lg:p-6 space-y-3 type-body text-slate-700">
              <p>
                {t('aboutP1')}
              </p>
              <p>
                {t('aboutP2')}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onExploreAll}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15B8A6] hover:bg-[#119e8e] text-white font-display font-bold text-sm transition-colors cursor-pointer"
                >
                  <span>{t('aboutExploreAllBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 5 Language Families Breakdown */}
          <div className="museum-card p-5 lg:p-6 bg-white">
            <h2 className="font-display font-extrabold text-base lg:text-lg text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#FF8C42]" />
              <span>
                {language === 'vi'
                  ? '5 Ngữ hệ chính của 54 Dân tộc Việt Nam'
                  : "5 Language Families of Vietnam's 54 Ethnic Groups"}
              </span>
            </h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {languageFamilies.map((lf) => {
                const count = allGroups.filter((g) => g.languageFamilyId === lf.id).length;
                return (
                  <div
                    key={lf.id}
                    className="p-3.5 rounded-xl bg-[#FFFDF7] border border-slate-900/8"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display font-extrabold text-sm text-slate-900">
                        {lf.label}
                      </h3>
                      <span className="text-xs font-extrabold text-[#0F766E] tabular-nums">
                        {count} {t('countText')}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{lf.groups}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right Column: 6 Cultural Regions & Official Sources */}
        <section className="lg:col-span-5 space-y-5">
          <div className="museum-card p-5 lg:p-6 bg-white">
            <h2 className="font-display font-extrabold text-base lg:text-lg text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#15B8A6]" />
              <span>
                {language === 'vi'
                  ? 'Phân bố cư trú theo 6 Vùng văn hóa địa lý'
                  : 'Distribution Across 6 Cultural Regions'}
              </span>
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {language === 'vi'
                ? 'Một dân tộc có thể cư trú truyền thống trên nhiều địa bàn khác nhau.'
                : 'An ethnic group may traditionally live across multiple geographical regions.'}
            </p>
            <div className="mt-3 divide-y divide-slate-900/6">
              {regions.map((region) => (
                <div key={region.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: region.accentColor }}
                    />
                    <div className="min-w-0">
                      <div className="font-display font-bold text-sm text-slate-900">
                        {region.name}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {region.landmarks.join(' · ')}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-slate-700 tabular-nums shrink-0">
                    {countGroupsInRegion(region.id)} {t('countText')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Reference Sources */}
          <div className="museum-card p-5 lg:p-6 bg-white">
            <h2 className="font-display font-extrabold text-base lg:text-lg text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#3D9BE9]" />
              <span>{t('aboutOfficialSourcesTitle')}</span>
            </h2>
            <ul className="mt-3 space-y-3">
              {officialSources.map((source) => (
                <li
                  key={source.url}
                  className="p-3 rounded-xl bg-[#FFFDF7] border border-slate-900/8"
                >
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-display font-bold text-sm text-[#0F766E] hover:underline"
                  >
                    <span>{source.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                  <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">{source.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 pt-3 border-t border-slate-900/8 text-[11px] text-slate-500 leading-relaxed">
              {language === 'vi'
                ? 'Ghi chú về hình ảnh: Hình ảnh trong mục Trang phục và Không gian văn hóa được tổng hợp từ tư liệu hiện vật bảo tàng, ảnh chụp trang phục truyền thống của đồng bào 54 dân tộc phục vụ trải nghiệm học tập.'
                : 'Note on illustrations: Images in the Traditional Costumes and Cultural Spaces sections are gathered from museum collections and documented traditional costume archives to support visual learning.'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
