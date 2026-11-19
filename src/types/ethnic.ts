export type RegionId =
  | 'mien-nui-phia-bac'
  | 'dong-bang-bac-bo'
  | 'bac-trung-bo'
  | 'duyen-hai-mien-trung'
  | 'tay-nguyen'
  | 'nam-bo';

export type LanguageFamilyId =
  | 'nam-a'
  | 'tai-kadai'
  | 'hmong-dao'
  | 'nam-dao'
  | 'han-tang';

export type CulturalSymbolType =
  | 'lotus'
  | 'stilt-house'
  | 'terrace'
  | 'gong'
  | 'cham-tower'
  | 'khmer-pagoda'
  | 'khen'
  | 'brocade'
  | 'boat'
  | 'drum'
  | 'lantern'
  | 'nha-rong';

export type MotifPatternType =
  | 'diamond'
  | 'wave'
  | 'zigzag'
  | 'sunburst'
  | 'floral'
  | 'lattice'
  | 'spiral'
  | 'stepped';

export type ImageSlot =
  | 'environment'
  | 'house'
  | 'economy'
  | 'culture'
  | 'maleCostume'
  | 'femaleCostume';

export interface TraditionalHouseData {
  name: string;
  materials: string;
  architecture: string;
  livingSpace: string;
  distinctiveFeatures: string;
  climateAdaptation: string;
  imagePrompt: string;
  imageUrl: string;
}

export interface EconomyData {
  agriculture: string;
  livestock: string;
  handicrafts: string;
  trade: string;
  otherActivities: string;
  imagePrompt: string;
  imageUrl: string;
}

export interface CultureData {
  language: string;
  customs: string;
  festivals: string;
  beliefs: string;
  music: string;
  cuisine: string;
  crafts: string;
  otherFeatures: string;
  imagePrompt: string;
  imageUrl: string;
}

export interface CostumeItemData {
  description: string;
  mainColors: string;
  colorSwatches: string[];
  patterns: string;
  materials: string;
  accessories: string;
  culturalMeaning: string;
  variantNote: string;
  imagePrompt: string;
  imageUrl: string;
}

export interface EthnicGroup {
  id: string;
  number: number;
  name: string;
  aliases: string[];
  avatarUrl?: string;
  languageFamily: string;
  languageFamilyId: LanguageFamilyId;
  languageGroup: string;
  traditionalRegions: string[];
  regionIds: RegionId[];
  currentDistributionNotes: string;
  introduction: string;
  livingEnvironment: string;
  climateAndTerrain: string;
  traditionalSettlements: string;
  environmentImagePrompt: string;
  environmentImageUrl: string;
  traditionalHouse: TraditionalHouseData;
  economy: EconomyData;
  culture: CultureData;
  costumes: {
    male: CostumeItemData;
    female: CostumeItemData;
  };
  referenceSources: string[];
  notes: string;
  accentColor: string;
  secondaryColor: string;
  culturalSymbol: CulturalSymbolType;
  motifPattern: MotifPatternType;
}

export interface RegionInfo {
  id: RegionId;
  name: string;
  shortName: string;
  description: string;
  landmarks: string[];
  accentColor: string;
  dioramaImage: string;
}

export interface LightboxImage {
  src: string;
  title: string;
  subtitle?: string;
  isAiGenerated?: boolean;
}
