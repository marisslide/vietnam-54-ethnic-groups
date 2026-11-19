import React, { useEffect, useState } from 'react';
import { Sparkles, ZoomIn, RefreshCw, AlertCircle, Palette } from 'lucide-react';
import { EthnicGroup, ImageSlot, LightboxImage } from '../types/ethnic';
import {
  generateEthnicImage,
  ImageGenerationError,
  lookupExistingImage,
} from '../services/geminiImageService';
import { CostumeExhibitionPlate } from './CulturalIcon';

interface CostumeGalleryProps {
  group: EthnicGroup;
  onZoomImage: (image: LightboxImage) => void;
}

interface CostumeColumnProps {
  group: EthnicGroup;
  gender: 'male' | 'female';
  onZoomImage: (image: LightboxImage) => void;
}

const CostumeColumn: React.FC<CostumeColumnProps> = ({ group, gender, onZoomImage }) => {
  const costume = group.costumes[gender];
  const slot: ImageSlot = gender === 'male' ? 'maleCostume' : 'femaleCostume';
  const heading = gender === 'male' ? 'MALE ATTIRE' : 'FEMALE ATTIRE';
  const genderLabel = gender === 'male' ? "men's" : "women's";

  const [imageUrl, setImageUrl] = useState<string | null>(costume.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setErrorMsg(null);
    setLoading(false);
    setImageUrl(costume.imageUrl || null);

    lookupExistingImage(group.id, slot, costume.imageUrl || undefined).then((found) => {
      if (active && found) {
        setImageUrl(found);
      }
    });

    return () => {
      active = false;
    };
  }, [group.id, slot, costume.imageUrl]);

  const handleGenerate = async (forceRegenerate = false) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const result = await generateEthnicImage({
        ethnicId: group.id,
        slot,
        prompt: costume.imagePrompt,
        aspectRatio: '3:4',
        forceRegenerate,
      });
      setImageUrl(result.imageUrl);
    } catch (err) {
      if (err instanceof ImageGenerationError) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Unable to generate the 3D AI illustration right now. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="museum-card overflow-hidden flex flex-col">
      {/* Column Header */}
      <div className="px-4 py-3 border-b border-slate-900/8 flex items-center justify-between gap-2 bg-[#FFFDF8]">
        <div>
          <h3 className="font-display font-black text-sm lg:text-base tracking-wide text-slate-900">
            {heading}
          </h3>
          <p className="text-xs text-slate-500">
            The {group.name} People · Traditional {genderLabel} attire
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

      {/* Portrait Frame */}
      <div className="relative w-full aspect-[3/4] max-h-[420px] bg-[#FFF9EA] overflow-hidden border-b border-slate-900/8">
        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FFF9EA] via-white to-teal-50">
            <div className="w-16 h-16 rounded-2xl bg-teal-100/80 flex items-center justify-center mb-4 animate-pulse">
              <Sparkles className="w-8 h-8 text-[#15B8A6]" />
            </div>
            <p className="font-display font-bold text-sm text-slate-800">
              Creating 3D illustration of traditional {genderLabel} costume for the {group.name} people...
            </p>
            <p className="mt-1 text-xs text-slate-500 max-w-xs">
              The system is recreating the authentic silhouette, colour palette, and traditional patterns.
            </p>
            <div className="mt-4 w-48 h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-[#15B8A6] to-[#FFC83D] rounded-full animate-pulse" />
            </div>
          </div>
        ) : imageUrl ? (
          <div className="relative w-full h-full group bg-gradient-to-b from-[#FFFDF7] to-[#F7F1E1]">
            <img
              src={imageUrl}
              alt={`Traditional ${genderLabel} attire of the ${group.name} people`}
              onClick={() =>
                onZoomImage({
                  src: imageUrl,
                  title: `${heading} — The ${group.name} People`,
                  subtitle: costume.mainColors,
                  isAiGenerated: true,
                })
              }
              className="w-full h-full object-contain cursor-zoom-in group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  onZoomImage({
                    src: imageUrl,
                    title: `${heading} — The ${group.name} People`,
                    subtitle: costume.mainColors,
                    isAiGenerated: true,
                  })
                }
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/70 hover:bg-slate-950/90 text-white text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
                aria-label="Enlarge costume image"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Enlarge</span>
              </button>
              {!costume.imageUrl && (
                <button
                  type="button"
                  onClick={() => handleGenerate(true)}
                  className="p-1.5 rounded-lg bg-slate-950/70 hover:bg-slate-950/90 text-white backdrop-blur-xs transition-colors cursor-pointer"
                  title="Regenerate AI illustration"
                  aria-label="Regenerate AI illustration"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex flex-col">
            <div className="flex-1 min-h-0">
              <CostumeExhibitionPlate group={group} gender={gender} />
            </div>
          </div>
        )}
      </div>

      {/* Action / Disclaimer Strip */}
      <div className="px-4 py-2.5 bg-[#FFFDF7] border-b border-slate-900/8 flex flex-wrap items-center justify-between gap-2">
        {imageUrl ? (
          <p className="text-[10.5px] tracking-wide font-semibold text-amber-800/90">
            AI-GENERATED ILLUSTRATION — REFERENCE OF TRADITIONAL COSTUME FEATURES
          </p>
        ) : (
          <div className="w-full flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#15B8A6]" />
              <span>Traditional colour palette & silhouette</span>
            </span>
            <button
              type="button"
              onClick={() => handleGenerate(false)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15B8A6] hover:bg-[#119e8e] disabled:opacity-60 text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate 3D AI Image</span>
            </button>
          </div>
        )}
      </div>

      {/* Friendly Error Banner with Retry */}
      {errorMsg && (
        <div className="px-4 py-2.5 bg-amber-50 border-b border-amber-200 flex items-center justify-between gap-3">
          <div className="flex items-start gap-2 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => handleGenerate(false)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Structured Costume Information Placard */}
      <div className="p-4 lg:p-5 space-y-3 text-sm bg-white flex-1">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Costume Style & Structure
          </h4>
          <p className="mt-1 text-slate-800 leading-relaxed">{costume.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-900/6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Main Colours
            </h4>
            <p className="mt-0.5 text-slate-700 leading-relaxed">{costume.mainColors}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Traditional Materials
            </h4>
            <p className="mt-0.5 text-slate-700 leading-relaxed">{costume.materials}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-900/6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Characteristic Patterns
          </h4>
          <p className="mt-0.5 text-slate-700 leading-relaxed">{costume.patterns}</p>
        </div>

        <div className="pt-2 border-t border-slate-900/6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Accessories & Jewellery
          </h4>
          <p className="mt-0.5 text-slate-700 leading-relaxed">{costume.accessories}</p>
        </div>

        <div className="pt-2 border-t border-slate-900/6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Cultural Significance
          </h4>
          <p className="mt-0.5 text-slate-700 leading-relaxed">{costume.culturalMeaning}</p>
        </div>

        {costume.variantNote && (
          <p className="pt-2 border-t border-slate-900/6 text-xs text-slate-500 italic leading-relaxed">
            Variant notes: {costume.variantNote}
          </p>
        )}
      </div>
    </section>
  );
};

export const CostumeGallery: React.FC<CostumeGalleryProps> = ({ group, onZoomImage }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="font-display font-extrabold type-section text-slate-900">
            Traditional Costumes of the {group.name} People
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Side-by-side display of male and female attire highlighting the distinct colour palettes, woven motifs, and authentic accessories of the {group.name} community.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
        <CostumeColumn group={group} gender="male" onZoomImage={onZoomImage} />
        <CostumeColumn group={group} gender="female" onZoomImage={onZoomImage} />
      </div>
    </div>
  );
};
