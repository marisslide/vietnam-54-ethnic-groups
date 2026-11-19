import React, { useMemo } from 'react';
import { Search, X, RotateCcw, Globe2 } from 'lucide-react';
import { LanguageFamilyId, LightboxImage, RegionId } from '../types/ethnic';
import {
  getEthnicGroups,
  getLanguageFamilies,
  getRegions,
  getRegionById,
  normalizeVietnamese,
} from '../data/ethnicGroups';
import { VietnamMap } from './VietnamMap';
import { EthnicGrid } from './EthnicGrid';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  mode: 'home' | 'map' | 'catalog';
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeRegion: RegionId | null;
  onSelectRegion: (regionId: RegionId | null) => void;
  activeLanguageFamily: LanguageFamilyId | null;
  onSelectLanguageFamily: (langId: LanguageFamilyId | null) => void;
  onResetFilters: () => void;
  onSelectEthnic: (ethnicId: string) => void;
  onZoomImage: (image: LightboxImage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  mode,
  searchQuery,
  onSearchChange,
  activeRegion,
  onSelectRegion,
  activeLanguageFamily,
  onSelectLanguageFamily,
  onResetFilters,
  onSelectEthnic,
  onZoomImage,
}) => {
  const { language, t } = useLanguage();

  const allEthnicGroups = useMemo(() => getEthnicGroups(language), [language]);
  const regions = useMemo(() => getRegions(language), [language]);
  const languageFamilies = useMemo(() => getLanguageFamilies(language), [language]);

  const filteredGroups = useMemo(() => {
    const normalizedQuery = normalizeVietnamese(searchQuery);

    return allEthnicGroups.filter((group) => {
      if (activeRegion && !group.regionIds.includes(activeRegion)) {
        return false;
      }
      if (activeLanguageFamily && group.languageFamilyId !== activeLanguageFamily) {
        return false;
      }
      if (normalizedQuery) {
        const matchingRegion = regions.find((r) => group.regionIds.includes(r.id));
        const matchingLang = languageFamilies.find((lf) => lf.id === group.languageFamilyId);
        const haystack = normalizeVietnamese(
          [
            group.name,
            ...group.aliases,
            group.languageFamily,
            group.languageGroup,
            ...group.traditionalRegions,
            group.traditionalHouse.name,
            matchingRegion?.name || '',
            matchingRegion?.shortName || '',
            matchingLang?.label || '',
            matchingLang?.groups || '',
          ].join(' ')
        );
        if (!haystack.includes(normalizedQuery)) {
          return false;
        }
      }
      return true;
    });
  }, [allEthnicGroups, regions, languageFamilies, searchQuery, activeRegion, activeLanguageFamily]);

  const activeRegionInfo = activeRegion ? getRegionById(activeRegion, language) : null;
  const hasActiveFilter = Boolean(searchQuery || activeRegion || activeLanguageFamily);

  // Mode 1: Expanded Cultural Map Focus View ('map')
  if (mode === 'map') {
    return (
      <div className="h-full max-w-[1920px] w-full mx-auto px-4 lg:px-7 py-3 lg:py-4 flex flex-col gap-3 min-h-0">
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Map Interactive Canvas (Col 8) */}
          <div className="lg:col-span-8 h-full min-h-0 museum-card p-3.5 lg:p-4 bg-white flex flex-col">
            <VietnamMap
              activeRegion={activeRegion}
              onSelectRegion={onSelectRegion}
              onZoomImage={onZoomImage}
            />
          </div>

          {/* Right Cultural Context Drawer (Col 4) */}
          <section className="lg:col-span-4 h-full min-h-0 museum-card p-4 bg-white flex flex-col gap-3">
            <div className="border-b border-slate-900/8 pb-3 shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
                {t('navMap')}
              </span>
              <h2 className="font-display font-black text-lg text-slate-900 mt-0.5">
                {activeRegionInfo ? activeRegionInfo.name : t('allOption')}
              </h2>
              <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                {activeRegionInfo
                  ? activeRegionInfo.description
                  : t('mapInstruction')}
              </p>
            </div>

            {/* List of Ethnic Groups living in this region */}
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 shrink-0">
                <span className="font-semibold">
                  {filteredGroups.length} {t('countText')}
                </span>
                {hasActiveFilter && (
                  <button
                    type="button"
                    onClick={onResetFilters}
                    className="text-[#0F766E] hover:underline font-bold cursor-pointer"
                  >
                    {t('resetFilters')}
                  </button>
                )}
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto museum-scroll pr-1 grid grid-cols-2 gap-2">
                {filteredGroups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => onSelectEthnic(group.id)}
                    className="text-left p-2 rounded-xl border border-slate-900/10 hover:border-[#15B8A6] bg-[#FFFDF8] hover:bg-white transition-all cursor-pointer group flex items-center gap-2"
                  >
                    {group.avatarUrl ? (
                      <img
                        src={group.avatarUrl}
                        alt={group.name}
                        className="w-8 h-8 rounded-lg object-cover object-center shrink-0 border border-slate-200"
                      />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-display font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-[#0F766E] truncate">
                          {group.name}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 tabular-nums shrink-0">
                          {String(group.number).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-500 truncate">
                        {group.languageFamily}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Mode 2: Full-Width 54 Ethnic Groups Catalog ('catalog')
  if (mode === 'catalog') {
    return (
      <div className="h-full max-w-[1920px] w-full mx-auto px-4 lg:px-7 py-3 lg:py-4 flex flex-col gap-3 min-h-0">
        {/* Compact Catalog Header & Filter Bar */}
        <section className="shrink-0 museum-card p-3.5 lg:p-4 bg-white flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-display font-black type-page-title text-slate-900">
                {t('heroTitle')}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                {t('heroSubtitle')}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-80 lg:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchPlaceholder')}
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#FFFDF7] border border-slate-900/12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#15B8A6] focus:ring-2 focus:ring-[#15B8A6]/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  aria-label={t('clearSearch')}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Region & Language Family Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-900/6">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => onSelectRegion(null)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeRegion === null
                    ? 'bg-[#15B8A6] text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {t('allOption')} ({allEthnicGroups.length})
              </button>
              {regions.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onSelectRegion(activeRegion === r.id ? null : r.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    activeRegion === r.id
                      ? 'text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  style={activeRegion === r.id ? { backgroundColor: r.accentColor } : undefined}
                >
                  {r.shortName}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-slate-400 mr-0.5 hidden sm:inline" />
              {languageFamilies.map((lf) => (
                <button
                  key={lf.id}
                  type="button"
                  onClick={() =>
                    onSelectLanguageFamily(activeLanguageFamily === lf.id ? null : lf.id)
                  }
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    activeLanguageFamily === lf.id
                      ? 'bg-[#FF8C42] text-white'
                      : 'bg-[#FFF9EA] hover:bg-amber-100 text-slate-700 border border-amber-900/10'
                  }`}
                >
                  {lf.label}
                </button>
              ))}
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#0F766E] hover:underline whitespace-nowrap cursor-pointer"
                >
                  {t('resetFilters')}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Full-Width Scrollable Grid */}
        <div className="flex-1 min-h-0 overflow-y-auto museum-scroll pr-1">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold tabular-nums">
              <strong className="text-slate-900">{filteredGroups.length}</strong> {t('countText')}
            </span>
          </div>
          <EthnicGrid
            groups={filteredGroups}
            onSelectEthnic={onSelectEthnic}
            onResetFilters={onResetFilters}
            fullWidth
          />
        </div>
      </div>
    );
  }

  // Mode 3: Default 16:9 Split Home Page ('home') — Left Cultural Map (~38%) + Right 54 Ethnic Groups Explorer (~62%)
  return (
    <div className="h-full max-w-[1920px] w-full mx-auto px-4 lg:px-7 py-3 lg:py-4 flex flex-col lg:flex-row gap-4 min-h-0">
      {/* AREA 1: Cultural Map of Vietnam (Left ~38%) */}
      <aside className="lg:w-[39%] xl:w-[36%] shrink-0 museum-card p-3.5 lg:p-4 bg-white flex flex-col min-h-0">
        <VietnamMap
          activeRegion={activeRegion}
          onSelectRegion={onSelectRegion}
          onZoomImage={onZoomImage}
        />
      </aside>

      {/* AREA 2 & 3: Title, Search/Filters, and 54-Ethnic-Groups Scrollable Grid (Right ~62%) */}
      <main className="flex-1 min-w-0 flex flex-col gap-3 min-h-0">
        {/* Header + Search + Language Family Filter */}
        <section className="shrink-0 museum-card p-3.5 lg:p-4 bg-white space-y-2.5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-display font-black text-lg sm:text-xl lg:text-2xl tracking-tight text-slate-900">
                {t('heroTitle')}
              </h1>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-600 leading-snug">
                {t('heroSubtitle')}
              </p>
            </div>

            <div className="relative w-full sm:w-72 xl:w-80 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchPlaceholder')}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#FFFDF7] border border-slate-900/12 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#15B8A6] focus:ring-2 focus:ring-[#15B8A6]/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                  aria-label={t('clearSearch')}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Language Family Filter & Live Count Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-900/6">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                {t('filterLangFamilyLabel')}:
              </span>
              <button
                type="button"
                onClick={() => onSelectLanguageFamily(null)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeLanguageFamily === null
                    ? 'bg-[#15B8A6] text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {t('allOption')}
              </button>
              {languageFamilies.map((lf) => (
                <button
                  key={lf.id}
                  type="button"
                  onClick={() =>
                    onSelectLanguageFamily(activeLanguageFamily === lf.id ? null : lf.id)
                  }
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    activeLanguageFamily === lf.id
                      ? 'bg-[#FF8C42] text-white'
                      : 'bg-[#FFF9EA] hover:bg-amber-100 text-slate-700 border border-amber-900/10'
                  }`}
                >
                  {lf.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="tabular-nums font-semibold">
                {activeRegionInfo ? `${activeRegionInfo.shortName}: ` : ''}
                <strong className="text-slate-900">{filteredGroups.length}</strong> {t('countText')}
              </span>
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="inline-flex items-center gap-1 text-[#0F766E] hover:underline font-bold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t('resetFilters')}</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Scrollable 54 Ethnic Groups Grid */}
        <div className="flex-1 min-h-0 overflow-y-auto museum-scroll pr-1">
          <EthnicGrid
            groups={filteredGroups}
            onSelectEthnic={onSelectEthnic}
            onResetFilters={onResetFilters}
          />
        </div>
      </main>
    </div>
  );
};
