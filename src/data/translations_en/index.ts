import { EthnicGroup } from '../../types/ethnic';
import { EthnicGroupEnTranslation, STD_REFS_EN } from './types';
import { PART1_TRANSLATIONS_EN } from './part1';
import { PART2_TRANSLATIONS_EN } from './part2';
import { PART3_TRANSLATIONS_EN } from './part3';
import { PART4_TRANSLATIONS_EN } from './part4';
import { PART5_TRANSLATIONS_EN } from './part5';
import { PART6_TRANSLATIONS_EN } from './part6';

export const ETHNIC_TRANSLATIONS_EN: Record<string, EthnicGroupEnTranslation> = {
  ...PART1_TRANSLATIONS_EN,
  ...PART2_TRANSLATIONS_EN,
  ...PART3_TRANSLATIONS_EN,
  ...PART4_TRANSLATIONS_EN,
  ...PART5_TRANSLATIONS_EN,
  ...PART6_TRANSLATIONS_EN,
};

export function applyEnglishTranslation(group: EthnicGroup): EthnicGroup {
  const en = ETHNIC_TRANSLATIONS_EN[group.id];
  if (!en) {
    return group;
  }

  return {
    ...group,
    name: en.name ?? group.name,
    aliases: en.aliases ?? group.aliases,
    languageFamily: en.languageFamily ?? group.languageFamily,
    languageGroup: en.languageGroup ?? group.languageGroup,
    traditionalRegions: en.traditionalRegions ?? group.traditionalRegions,
    currentDistributionNotes: en.currentDistributionNotes ?? group.currentDistributionNotes,
    introduction: en.introduction ?? group.introduction,
    livingEnvironment: en.livingEnvironment ?? group.livingEnvironment,
    climateAndTerrain: en.climateAndTerrain ?? group.climateAndTerrain,
    traditionalSettlements: en.traditionalSettlements ?? group.traditionalSettlements,
    traditionalHouse: {
      ...group.traditionalHouse,
      name: en.traditionalHouse?.name ?? group.traditionalHouse.name,
      materials: en.traditionalHouse?.materials ?? group.traditionalHouse.materials,
      architecture: en.traditionalHouse?.architecture ?? group.traditionalHouse.architecture,
      livingSpace: en.traditionalHouse?.livingSpace ?? group.traditionalHouse.livingSpace,
      distinctiveFeatures: en.traditionalHouse?.distinctiveFeatures ?? group.traditionalHouse.distinctiveFeatures,
      climateAdaptation: en.traditionalHouse?.climateAdaptation ?? group.traditionalHouse.climateAdaptation,
    },
    economy: {
      ...group.economy,
      agriculture: en.economy?.agriculture ?? group.economy.agriculture,
      livestock: en.economy?.livestock ?? group.economy.livestock,
      handicrafts: en.economy?.handicrafts ?? group.economy.handicrafts,
      trade: en.economy?.trade ?? group.economy.trade,
      otherActivities: en.economy?.otherActivities ?? group.economy.otherActivities,
    },
    culture: {
      ...group.culture,
      language: en.culture?.language ?? group.culture.language,
      customs: en.culture?.customs ?? group.culture.customs,
      festivals: en.culture?.festivals ?? group.culture.festivals,
      beliefs: en.culture?.beliefs ?? group.culture.beliefs,
      music: en.culture?.music ?? group.culture.music,
      cuisine: en.culture?.cuisine ?? group.culture.cuisine,
      crafts: en.culture?.crafts ?? group.culture.crafts,
      otherFeatures: en.culture?.otherFeatures ?? group.culture.otherFeatures,
    },
    costumes: {
      male: {
        ...group.costumes.male,
        description: en.costumes?.male?.description ?? group.costumes.male.description,
        mainColors: en.costumes?.male?.mainColors ?? group.costumes.male.mainColors,
        patterns: en.costumes?.male?.patterns ?? group.costumes.male.patterns,
        materials: en.costumes?.male?.materials ?? group.costumes.male.materials,
        accessories: en.costumes?.male?.accessories ?? group.costumes.male.accessories,
        culturalMeaning: en.costumes?.male?.culturalMeaning ?? group.costumes.male.culturalMeaning,
        variantNote: en.costumes?.male?.variantNote ?? group.costumes.male.variantNote,
      },
      female: {
        ...group.costumes.female,
        description: en.costumes?.female?.description ?? group.costumes.female.description,
        mainColors: en.costumes?.female?.mainColors ?? group.costumes.female.mainColors,
        patterns: en.costumes?.female?.patterns ?? group.costumes.female.patterns,
        materials: en.costumes?.female?.materials ?? group.costumes.female.materials,
        accessories: en.costumes?.female?.accessories ?? group.costumes.female.accessories,
        culturalMeaning: en.costumes?.female?.culturalMeaning ?? group.costumes.female.culturalMeaning,
        variantNote: en.costumes?.female?.variantNote ?? group.costumes.female.variantNote,
      },
    },
    referenceSources: STD_REFS_EN,
    notes: en.notes ?? group.notes,
  };
}
