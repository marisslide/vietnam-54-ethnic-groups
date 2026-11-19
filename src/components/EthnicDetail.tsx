import React, { useEffect, useState, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Home,
  Sprout,
  Music,
  Shirt,
  Sparkles,
  ZoomIn,
  RefreshCw,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import { EthnicGroup, ImageSlot, LightboxImage } from '../types/ethnic';
import { getEthnicGroups, getRegionById } from '../data/ethnicGroups';
import {
  generateEthnicImage,
  ImageGenerationError,
  lookupExistingImage,
} from '../services/geminiImageService';
import { CulturalIcon, EthnicMotifPattern } from './CulturalIcon';
import { CostumeGallery } from './CostumeGallery';
import { useLanguage } from '../context/LanguageContext';

type DetailTabId = 'environment' | 'house' | 'economy' | 'culture' | 'costume';

interface EthnicDetailProps {
  group: EthnicGroup;
  onBack: () => void;
  onSelectEthnic: (ethnicId: string) => void;
  onZoomImage: (image: LightboxImage) => void;
}

interface ExhibitionMediaBoxProps {
  group: EthnicGroup;
  slot: Exclude<ImageSlot, 'maleCostume' | 'femaleCostume'>;
  title: string;
  caption: string;
  prompt: string;
  staticUrl?: string;
  onZoomImage: (image: LightboxImage) => void;
}

const ExhibitionMediaBox: React.FC<ExhibitionMediaBoxProps> = ({
  group,
  slot,
  title,
  caption,
  prompt,
  staticUrl,
  onZoomImage,
}) => {
  const { language, t } = useLanguage();
  const [imageUrl, setImageUrl] = useState<string | null>(staticUrl || null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setErrorMsg(null);
    setLoading(false);
    setImageUrl(staticUrl || null);

    lookupExistingImage(group.id, slot, staticUrl || undefined).then((found) => {
      if (active && found) {
        setImageUrl(found);
      }
    });

    return () => {
      active = false;
    };
  }, [group.id, slot, staticUrl]);

  const handleGenerate = async (forceRegenerate = false) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const result = await generateEthnicImage({
        ethnicId: group.id,
        slot,
        prompt,
        aspectRatio: '16:9',
        forceRegenerate,
      });
      setImageUrl(result.imageUrl);
    } catch (err) {
      if (err instanceof ImageGenerationError) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg(
          language === 'vi'
            ? 'Không thể tạo hình ảnh 3D AI lúc này. Vui lòng thử lại sau.'
            : 'Unable to generate the 3D AI illustration right now. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const primaryRegionInfo = group.regionIds[0] ? getRegionById(group.regionIds[0], language) : undefined;

  return (
    <div className="museum-card overflow-hidden">
      <div className="relative w-full aspect-[21/9] min-h-[190px] max-h-[300px] overflow-hidden bg-[#FFF9EA]">
        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-r from-[#FFF9EA] via-white to-teal-50">
            <Sparkles className="w-8 h-8 text-[#15B8A6] animate-pulse mb-2" />
            <p className="font-display font-bold text-sm text-slate-800">
              {t('aiGenerating')}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {t('aiCacheNote')}
            </p>
          </div>
        ) : imageUrl ? (
          <div className="relative w-full h-full group">
            <img
              src={imageUrl}
              alt={`${title} — ${group.name}`}
              onClick={() =>
                onZoomImage({
                  src: imageUrl,
                  title: `${title} — ${group.name}`,
                  subtitle: caption,
                  isAiGenerated: true,
                })
              }
              className="w-full h-full object-cover cursor-zoom-in group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-24 text-white">
              <p className="font-display font-bold text-sm sm:text-base drop-shadow">{title}</p>
              <p className="text-xs text-slate-200 line-clamp-1">{caption}</p>
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  onZoomImage({
                    src: imageUrl,
                    title: `${title} — ${group.name}`,
                    subtitle: caption,
                    isAiGenerated: true,
                  })
                }
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/70 hover:bg-slate-950/90 text-white text-xs font-semibold backdrop-blur-xs cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{t('btnEnlarge')}</span>
              </button>
              <button
                type="button"
                onClick={() => handleGenerate(true)}
                className="p-1.5 rounded-lg bg-slate-950/70 hover:bg-slate-950/90 text-white backdrop-blur-xs cursor-pointer"
                title={t('btnRegenerate')}
                aria-label={t('btnRegenerate')}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Culturally tailored museum plate before on-demand AI generation */
          <div
            className="relative w-full h-full flex items-center justify-between gap-5 px-5 sm:px-7 py-5"
            style={{
              background: `linear-gradient(125deg, ${group.accentColor}1E 0%, #FFF9EA 52%, ${group.secondaryColor}24 100%)`,
            }}
          >
            <EthnicMotifPattern
              pattern={group.motifPattern}
              primary={group.accentColor}
              secondary={group.secondaryColor}
              idPrefix={`${group.id}-${slot}`}
            />

            <div className="relative z-10 flex items-center gap-4 max-w-2xl">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/95 shadow-md border border-slate-900/8 flex items-center justify-center shrink-0">
                <CulturalIcon type={group.culturalSymbol} color={group.accentColor} size={40} />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
                  {t('exhibitionSpacePrefix')} {group.name} {t('exhibitionSpaceSuffix')}
                </div>
                <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 mt-0.5">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {caption}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleGenerate(false)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15B8A6] hover:bg-[#119e8e] disabled:opacity-60 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('aiGenerateBtn')}</span>
              </button>
              {primaryRegionInfo && (
                <button
                  type="button"
                  onClick={() =>
                    onZoomImage({
                      src: primaryRegionInfo.dioramaImage,
                      title: primaryRegionInfo.name,
                      subtitle: `${group.name}`,
                    })
                  }
                  className="text-[11px] font-semibold text-slate-600 hover:text-[#0F766E] underline underline-offset-2 cursor-pointer"
                >
                  {t('viewLandscapeLink')} {primaryRegionInfo.shortName}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="px-4 py-2.5 bg-amber-50 border-t border-amber-200 flex items-center justify-between gap-3">
          <div className="flex items-start gap-2 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => handleGenerate(false)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Thử lại' : 'Retry'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

interface InfoBlockProps {
  label: string;
  content: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ label, content }) => (
  <div className="museum-card p-4 lg:p-5 bg-white">
    <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-[#0F766E]">
      {label}
    </h4>
    <p className="mt-1.5 type-body text-slate-700 leading-relaxed">{content}</p>
  </div>
);

export const EthnicDetail: React.FC<EthnicDetailProps> = ({
  group,
  onBack,
  onSelectEthnic,
  onZoomImage,
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<DetailTabId>('environment');

  const allEthnicGroups = useMemo(() => getEthnicGroups(language), [language]);

  const currentIndex = allEthnicGroups.findIndex((g) => g.id === group.id);
  const prevGroup =
    currentIndex > 0 ? allEthnicGroups[currentIndex - 1] : allEthnicGroups[allEthnicGroups.length - 1];
  const nextGroup =
    currentIndex < allEthnicGroups.length - 1 ? allEthnicGroups[currentIndex + 1] : allEthnicGroups[0];

  const tabs: { id: DetailTabId; label: string; icon: React.ReactNode }[] = [
    { id: 'environment', label: t('tabEnvironment'), icon: <MapPin className="w-4 h-4" /> },
    { id: 'house', label: t('tabHouse'), icon: <Home className="w-4 h-4" /> },
    { id: 'economy', label: t('tabEconomy'), icon: <Sprout className="w-4 h-4" /> },
    { id: 'culture', label: t('tabCulture'), icon: <Music className="w-4 h-4" /> },
    { id: 'costume', label: t('tabCostume'), icon: <Shirt className="w-4 h-4" /> },
  ];

  const authenticPreview = group.costumes.female.imageUrl || group.costumes.male.imageUrl;

  return (
    <div className="h-full max-w-[1920px] w-full mx-auto px-4 lg:px-7 py-3 lg:py-4 flex flex-col lg:flex-row gap-4 lg:gap-5 min-h-0">
      {/* LEFT PERSISTENT PROFILE SIDEBAR (~30% width, internal scroll) */}
      <aside className="lg:w-[32%] xl:w-[29%] shrink-0 museum-card flex flex-col min-h-0 overflow-hidden bg-white">
        {/* Top Back & Prev/Next Bar */}
        <div className="px-4 py-2.5 border-b border-slate-900/8 flex items-center justify-between gap-2 bg-[#FFFDF8] shrink-0">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#0F766E] transition-colors whitespace-nowrap cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('backToCatalog')}</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onSelectEthnic(prevGroup.id)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title={`${t('prevGroup')}: ${prevGroup.name}`}
              aria-label={`${t('prevGroup')}: ${prevGroup.name}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-extrabold tabular-nums text-slate-500 px-1">
              {String(group.number).padStart(2, '0')} / {allEthnicGroups.length}
            </span>
            <button
              type="button"
              onClick={() => onSelectEthnic(nextGroup.id)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title={`${t('nextGroup')}: ${nextGroup.name}`}
              aria-label={`${t('nextGroup')}: ${nextGroup.name}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Identity Content */}
        <div className="flex-1 min-h-0 overflow-y-auto museum-scroll p-4 lg:p-5 space-y-4">
          {/* Identity Banner */}
          <div
            className="relative rounded-2xl p-4 overflow-hidden flex items-center gap-4 border border-slate-900/8"
            style={{
              background: `linear-gradient(135deg, ${group.accentColor}22 0%, #FFF9EA 58%, ${group.secondaryColor}28 100%)`,
            }}
          >
            <EthnicMotifPattern
              pattern={group.motifPattern}
              primary={group.accentColor}
              secondary={group.secondaryColor}
              idPrefix={`profile-${group.id}`}
            />

            {authenticPreview ? (
              <img
                src={authenticPreview}
                alt={`${group.name}`}
                onClick={() =>
                  onZoomImage({
                    src: authenticPreview,
                    title: `${group.name}`,
                    isAiGenerated: true,
                  })
                }
                className="relative z-10 w-18 h-18 rounded-2xl object-cover object-top shadow-md border-2 border-white cursor-zoom-in shrink-0"
              />
            ) : (
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/95 shadow-md border border-slate-900/8 flex items-center justify-center shrink-0">
                <CulturalIcon type={group.culturalSymbol} color={group.accentColor} size={36} />
              </div>
            )}

            <div className="relative z-10 min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 tabular-nums">
                {t('groupNumberBadge')}{String(group.number).padStart(2, '0')}
              </div>
              <h1 className="font-display font-black text-xl lg:text-2xl text-slate-900 leading-tight">
                {language === 'vi' ? 'Dân tộc ' : 'The '}{group.name}{language === 'vi' ? '' : ' People'}
              </h1>
              {group.aliases.length > 0 && (
                <p className="mt-0.5 text-xs text-slate-600">
                  {t('profileAliases')}{group.aliases.join(', ')}
                </p>
              )}
            </div>
          </div>

          {/* Core Identity Metadata */}
          <dl className="divide-y divide-slate-900/6 text-xs sm:text-sm">
            <div className="py-2 flex justify-between gap-3">
              <dt className="text-slate-500 font-semibold shrink-0">{t('profileLangFamily')}</dt>
              <dd className="text-slate-900 font-bold text-right">{group.languageFamily}</dd>
            </div>
            <div className="py-2 flex justify-between gap-3">
              <dt className="text-slate-500 font-semibold shrink-0">{t('profileLangBranch')}</dt>
              <dd className="text-slate-900 font-semibold text-right">{group.languageGroup}</dd>
            </div>
            <div className="py-2 flex justify-between gap-3">
              <dt className="text-slate-500 font-semibold shrink-0">{t('profileRegions')}</dt>
              <dd className="text-slate-900 font-semibold text-right">
                {group.traditionalRegions.join(' · ')}
              </dd>
            </div>
          </dl>

          {/* Introduction */}
          <div>
            <h2 className="font-display font-extrabold text-xs uppercase tracking-wider text-[#0F766E]">
              {t('profileOverviewTitle')}
            </h2>
            <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">{group.introduction}</p>
          </div>

          {/* Distribution Notes */}
          <div className="pt-3 border-t border-slate-900/6">
            <h2 className="font-display font-extrabold text-xs uppercase tracking-wider text-[#0F766E]">
              {t('profileDistributionTitle')}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {group.currentDistributionNotes}
            </p>
          </div>

          {/* Cultural Note */}
          {group.notes && (
            <div className="pt-3 border-t border-slate-900/6">
              <h2 className="font-display font-extrabold text-xs uppercase tracking-wider text-[#0F766E]">
                {t('profileHighlightsTitle')}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {group.notes}
              </p>
            </div>
          )}

          {/* Reference Sources */}
          <div className="pt-3 border-t border-slate-900/6">
            <h2 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('profileRefsTitle')}</span>
            </h2>
            <ul className="mt-1.5 space-y-1 text-xs text-slate-500">
              {group.referenceSources.map((src, idx) => (
                <li key={idx}>· {src}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Prev / Next Ethnic Navigation */}
        <div className="px-4 py-2.5 border-t border-slate-900/8 bg-[#FFFDF8] flex items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onSelectEthnic(prevGroup.id)}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-[#0F766E] truncate cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{prevGroup.name}</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectEthnic(nextGroup.id)}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-[#0F766E] truncate cursor-pointer"
          >
            <span className="truncate">{nextGroup.name}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </aside>

      {/* RIGHT 5-TAB EXHIBITION STAGE (~70% width, internal scroll) */}
      <main className="flex-1 min-w-0 flex flex-col gap-3 min-h-0">
        {/* Horizontal 5-Tab Bar */}
        <div
          role="tablist"
          aria-label="Cultural exploration topics"
          className="shrink-0 bg-white rounded-2xl p-1.5 border border-slate-900/8 shadow-xs flex items-center gap-1 overflow-x-auto no-scrollbar"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-fit flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#15B8A6] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFF9EA]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Tab Exhibition Area */}
        <div className="flex-1 min-h-0 overflow-y-auto museum-scroll pr-1 space-y-4">
          {activeTab === 'environment' && (
            <>
              <ExhibitionMediaBox
                group={group}
                slot="environment"
                title={t('envMediaTitle')}
                caption={group.livingEnvironment}
                prompt={group.environmentImagePrompt}
                staticUrl={group.environmentImageUrl}
                onZoomImage={onZoomImage}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoBlock label={t('envLivingLabel')} content={group.livingEnvironment} />
                <InfoBlock label={t('envTerrainLabel')} content={group.climateAndTerrain} />
                <div className="md:col-span-2">
                  <InfoBlock
                    label={t('envSettlementLabel')}
                    content={group.traditionalSettlements}
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'house' && (
            <>
              <ExhibitionMediaBox
                group={group}
                slot="house"
                title={group.traditionalHouse.name}
                caption={group.traditionalHouse.architecture}
                prompt={group.traditionalHouse.imagePrompt}
                staticUrl={group.traditionalHouse.imageUrl}
                onZoomImage={onZoomImage}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoBlock label={t('houseTypeLabel')} content={group.traditionalHouse.name} />
                <InfoBlock label={t('houseMaterialsLabel')} content={group.traditionalHouse.materials} />
                <InfoBlock label={t('houseArchLabel')} content={group.traditionalHouse.architecture} />
                <InfoBlock label={t('houseLivingSpaceLabel')} content={group.traditionalHouse.livingSpace} />
                <InfoBlock label={t('houseDistinctiveLabel')} content={group.traditionalHouse.distinctiveFeatures} />
                <InfoBlock label={t('houseClimateAdaptLabel')} content={group.traditionalHouse.climateAdaptation} />
              </div>
            </>
          )}

          {activeTab === 'economy' && (
            <>
              <ExhibitionMediaBox
                group={group}
                slot="economy"
                title={t('econMediaTitle')}
                caption={group.economy.agriculture}
                prompt={group.economy.imagePrompt}
                staticUrl={group.economy.imageUrl}
                onZoomImage={onZoomImage}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoBlock label={t('econAgriLabel')} content={group.economy.agriculture} />
                <InfoBlock label={t('econLivestockLabel')} content={group.economy.livestock} />
                <InfoBlock label={t('econHandicraftLabel')} content={group.economy.handicrafts} />
                <InfoBlock label={t('econTradeLabel')} content={group.economy.trade} />
                <div className="md:col-span-2">
                  <InfoBlock label={t('econOtherLabel')} content={group.economy.otherActivities} />
                </div>
              </div>
            </>
          )}

          {activeTab === 'culture' && (
            <>
              <ExhibitionMediaBox
                group={group}
                slot="culture"
                title={t('cultureMediaTitle')}
                caption={group.culture.festivals}
                prompt={group.culture.imagePrompt}
                staticUrl={group.culture.imageUrl}
                onZoomImage={onZoomImage}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoBlock label={t('cultureLanguageLabel')} content={group.culture.language} />
                <InfoBlock label={t('cultureCustomsLabel')} content={group.culture.customs} />
                <InfoBlock label={t('cultureFestivalsLabel')} content={group.culture.festivals} />
                <InfoBlock label={t('cultureBeliefsLabel')} content={group.culture.beliefs} />
                <InfoBlock label={t('cultureMusicLabel')} content={group.culture.music} />
                <InfoBlock label={t('cultureCuisineLabel')} content={group.culture.cuisine} />
                <InfoBlock label={t('cultureCraftsLabel')} content={group.culture.crafts} />
                <InfoBlock label={t('cultureOtherLabel')} content={group.culture.otherFeatures} />
              </div>
            </>
          )}

          {activeTab === 'costume' && (
            <CostumeGallery group={group} onZoomImage={onZoomImage} />
          )}
        </div>
      </main>
    </div>
  );
};
