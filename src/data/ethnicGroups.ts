import { EthnicGroup, LanguageFamilyId, RegionId, RegionInfo } from '../types/ethnic';
import { STATIC_ASSETS } from './staticAssets';
import { ETHNIC_PART_1 } from './parts/part1';
import { ETHNIC_PART_2 } from './parts/part2';
import { ETHNIC_PART_3 } from './parts/part3';
import { ETHNIC_PART_4 } from './parts/part4';
import { ETHNIC_PART_5 } from './parts/part5';
import { ETHNIC_PART_6 } from './parts/part6';

export const ETHNIC_GROUPS: EthnicGroup[] = [
  ...ETHNIC_PART_1,
  ...ETHNIC_PART_2,
  ...ETHNIC_PART_3,
  ...ETHNIC_PART_4,
  ...ETHNIC_PART_5,
  ...ETHNIC_PART_6,
];

export const REGIONS: RegionInfo[] = [
  {
    id: 'mien-nui-phia-bac',
    name: 'Northern Mountains',
    shortName: 'Northern Mountains',
    description:
      'The rugged mountain ranges of the North-East and North-West are home to the greatest variety of ethnic groups in Vietnam, celebrated for dramatic terraced rice fields, stilt houses, earthen walled homes, Then singing, and colourful brocade textiles.',
    landmarks: ['Stilt Houses', 'Terraced Rice Fields', 'Highland Markets'],
    accentColor: '#36B86B',
    dioramaImage: STATIC_ASSETS.regionNorthernMountains,
  },
  {
    id: 'dong-bang-bac-bo',
    name: 'Red River Delta',
    shortName: 'Red River Delta',
    description:
      'The historic cradle of wet-rice cultivation along the Red River, distinguished by ancient village gates, banyan trees, lotus ponds, communal courtyard houses with curved terracotta roofs, and historic craft guilds.',
    landmarks: ['Communal Houses & Lotus Ponds', 'Tiled Wooden Houses', 'Traditional Craft Villages'],
    accentColor: '#F58BA8',
    dioramaImage: STATIC_ASSETS.regionDeltaCoastal,
  },
  {
    id: 'bac-trung-bo',
    name: 'North Central Coast',
    shortName: 'North Central',
    description:
      'A culturally rich strip running from western Thanh Hoa and Nghe An down along the Truong Son range, renowned for traditional Zeng weaving, vibrant drum festivals, and riverside stilt villages.',
    landmarks: ['Truong Son Mountain Range', 'A Luoi Zeng Weaving', 'Riverside Stilt Houses'],
    accentColor: '#15B8A6',
    dioramaImage: STATIC_ASSETS.houseTraditionalStilt,
  },
  {
    id: 'duyen-hai-mien-trung',
    name: 'South Central Coast',
    shortName: 'South Central',
    description:
      'Where sunny coastal plains meet the eastern slopes of the Truong Son mountains, celebrated for ancient red-brick Cham towers, Bau Truc pottery, Co-tu communal Guol houses, and fragrant cinnamon groves.',
    landmarks: ['Ancient Cham Towers', 'Co-tu Guol House', 'Bau Truc Pottery'],
    accentColor: '#FF8C42',
    dioramaImage: STATIC_ASSETS.regionDeltaCoastal,
  },
  {
    id: 'tay-nguyen',
    name: 'Central Highlands',
    shortName: 'Central Highlands',
    description:
      'A majestic red-basalt plateau home to the UNESCO-recognised Space of Gong Culture, soaring communal Rong houses, Ede longhouses, epic oral storytelling, and joyous community gatherings.',
    landmarks: ['Axe-Roofed Rong House', 'Ede Longhouse', 'Central Highlands Gongs'],
    accentColor: '#E11D48',
    dioramaImage: STATIC_ASSETS.regionCentralHighlands,
  },
  {
    id: 'nam-bo',
    name: 'Southern Region',
    shortName: 'Southern Region',
    description:
      'A fertile land spanning the south-eastern plains and the waterways of the Mekong Delta, blending golden Khmer pagodas, Chinese assembly halls, bustling floating markets, and lush riverside orchards.',
    landmarks: ['Southern Khmer Pagodas', 'Floating Markets & Boats', 'Soc Bom Bo Heritage'],
    accentColor: '#3D9BE9',
    dioramaImage: STATIC_ASSETS.regionDeltaCoastal,
  },
];

export const LANGUAGE_FAMILIES: { id: LanguageFamilyId; label: string; groups: string }[] = [
  { id: 'nam-a', label: 'Austroasiatic', groups: 'Viet - Muong, Mon - Khmer' },
  { id: 'tai-kadai', label: 'Kra-Dai', groups: 'Tay - Thai, Kra - Dai' },
  { id: 'hmong-dao', label: 'Hmong-Mien', groups: 'Hmong, Dao' },
  { id: 'nam-dao', label: 'Austronesian', groups: 'Malayo - Polynesian' },
  { id: 'han-tang', label: 'Sino-Tibetan', groups: 'Sinitic, Tibeto - Burman' },
];

export function normalizeVietnamese(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[-'’`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getEthnicById(id: string): EthnicGroup | undefined {
  return ETHNIC_GROUPS.find((g) => g.id === id);
}

export function getRegionById(id: RegionId): RegionInfo | undefined {
  return REGIONS.find((r) => r.id === id);
}

export function countGroupsInRegion(regionId: RegionId): number {
  return ETHNIC_GROUPS.filter((g) => g.regionIds.includes(regionId)).length;
}

export const OFFICIAL_REFERENCE_SOURCES = [
  {
    name: 'National Statistics Office of Vietnam (NSO / GSO)',
    url: 'https://www.nso.gov.vn/',
    note: 'Official catalogue of Vietnam’s 54 ethnic groups and official population distribution records.',
  },
  {
    name: 'Vietnam Government Portal — The 54 Ethnic Groups',
    url: 'https://chinhphu.vn/dan-toc',
    note: 'Authoritative overviews of languages, residential territories, economies, and cultural heritage.',
  },
  {
    name: 'Ministry of Culture, Sports and Tourism',
    url: 'https://bvhttdl.gov.vn/',
    note: 'Cultural heritage records, traditional festivals, and national identity preservation policies.',
  },
  {
    name: 'Department of Cultural Heritage',
    url: 'https://dsvh.gov.vn/',
    note: 'National and UNESCO Intangible Cultural Heritage registries of Vietnam’s ethnic groups.',
  },
  {
    name: 'Vietnam Museum of Ethnology',
    url: 'https://www.vme.org.vn/',
    note: 'Exhibition archives of traditional architecture, attire, and material culture of the 54 ethnic groups.',
  },
];
