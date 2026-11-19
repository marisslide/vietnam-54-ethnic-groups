export interface EthnicGroupEnTranslation {
  name?: string;
  aliases: string[];
  languageFamily: string;
  languageGroup: string;
  traditionalRegions: string[];
  currentDistributionNotes: string;
  introduction: string;
  livingEnvironment: string;
  climateAndTerrain: string;
  traditionalSettlements: string;
  traditionalHouse: {
    name: string;
    materials: string;
    architecture: string;
    livingSpace: string;
    distinctiveFeatures: string;
    climateAdaptation: string;
  };
  economy: {
    agriculture: string;
    livestock: string;
    handicrafts: string;
    trade: string;
    otherActivities: string;
  };
  culture: {
    language: string;
    customs: string;
    festivals: string;
    beliefs: string;
    music: string;
    cuisine: string;
    crafts: string;
    otherFeatures: string;
  };
  costumes: {
    male: {
      description: string;
      mainColors: string;
      patterns: string;
      materials: string;
      accessories: string;
      culturalMeaning: string;
      variantNote: string;
    };
    female: {
      description: string;
      mainColors: string;
      patterns: string;
      materials: string;
      accessories: string;
      culturalMeaning: string;
      variantNote: string;
    };
  };
  notes: string;
}

export const STD_REFS_EN = [
  'National Statistics Office of Vietnam (nso.gov.vn)',
  'Vietnam Government Portal — The 54 Ethnic Groups (chinhphu.vn/dan-toc)',
  'Vietnam Museum of Ethnology (vme.org.vn)',
  'Ministry of Culture, Sports and Tourism — Department of Cultural Heritage (dsvh.gov.vn)',
];
