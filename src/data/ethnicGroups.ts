import { EthnicGroup, LanguageFamilyId, RegionId, RegionInfo } from '../types/ethnic';
import { STATIC_ASSETS } from './staticAssets';
import { ETHNIC_PART_1 } from './parts/part1';
import { ETHNIC_PART_2 } from './parts/part2';
import { ETHNIC_PART_3 } from './parts/part3';
import { ETHNIC_PART_4 } from './parts/part4';
import { ETHNIC_PART_5 } from './parts/part5';
import { ETHNIC_PART_6 } from './parts/part6';
import { translateEthnicGroupToEn } from './ethnicTranslatorEn';
import { Language } from '../i18n/translations';

export const ETHNIC_GROUPS_VI: EthnicGroup[] = [
  ...ETHNIC_PART_1,
  ...ETHNIC_PART_2,
  ...ETHNIC_PART_3,
  ...ETHNIC_PART_4,
  ...ETHNIC_PART_5,
  ...ETHNIC_PART_6,
];

// Lazy cached English dataset
let cachedEthnicGroupsEn: EthnicGroup[] | null = null;

export function getEthnicGroupsEn(): EthnicGroup[] {
  if (!cachedEthnicGroupsEn) {
    cachedEthnicGroupsEn = ETHNIC_GROUPS_VI.map(translateEthnicGroupToEn);
  }
  return cachedEthnicGroupsEn;
}

export const ETHNIC_GROUPS: EthnicGroup[] = ETHNIC_GROUPS_VI;

export const REGIONS_VI: RegionInfo[] = [
  {
    id: 'mien-nui-phia-bac',
    name: 'Miền núi phía Bắc',
    shortName: 'Miền núi phía Bắc',
    description:
      'Vùng núi cao Đông Bắc và Tây Bắc hùng vĩ, là nơi cư trú của số lượng dân tộc phong phú nhất Việt Nam với ruộng bậc thang kỳ vĩ, nhà sàn gỗ, nhà trình tường đất, điệu hát Then và sắc màu thổ cẩm rực rỡ.',
    landmarks: ['Nhà sàn gỗ', 'Ruộng bậc thang', 'Chợ phiên vùng cao'],
    accentColor: '#36B86B',
    dioramaImage: STATIC_ASSETS.regionNorthernMountains,
  },
  {
    id: 'dong-bang-bac-bo',
    name: 'Đồng bằng Bắc Bộ',
    shortName: 'Đồng bằng Bắc Bộ',
    description:
      'Cái nôi lịch sử của nền văn minh lúa nước sông Hồng, đặc trưng bởi cổng làng cổ, cây đa, bến nước, sân đình, nhà gỗ ngói mũi hài và các làng nghề thủ công trăm tuổi.',
    landmarks: ['Đình làng & Hồ sen', 'Nhà gỗ mái ngói', 'Làng nghề truyền thống'],
    accentColor: '#F58BA8',
    dioramaImage: STATIC_ASSETS.regionDeltaCoastal,
  },
  {
    id: 'bac-trung-bo',
    name: 'Bắc Trung Bộ',
    shortName: 'Bắc Trung Bộ',
    description:
      'Dải đất giàu truyền thống từ tây Thanh Hóa, Nghệ An dọc theo sườn đông dãy Trường Sơn, nổi tiếng với kỹ thuật dệt Dèng A Lưới, lễ hội cồng chiêng và nếp nhà sàn ven sông suối.',
    landmarks: ['Dãy núi Trường Sơn', 'Dệt Dèng A Lưới', 'Nhà sàn ven suối'],
    accentColor: '#15B8A6',
    dioramaImage: STATIC_ASSETS.houseTraditionalStilt,
  },
  {
    id: 'duyen-hai-mien-trung',
    name: 'Duyên hải miền Trung',
    shortName: 'Duyên hải miền Trung',
    description:
      'Nơi dải đồng bằng ven biển đón nắng gió gắn liền sườn núi, nổi bật với tháp Chăm gạch đỏ cổ kính, gốm Bàu Trúc, nhà Gươl Cơ-tu và những rẫy quế thơm ngát.',
    landmarks: ['Tháp Chăm cổ kính', 'Nhà Gươl Cơ-tu', 'Gốm Bàu Trúc'],
    accentColor: '#FF8C42',
    dioramaImage: STATIC_ASSETS.regionDeltaCoastal,
  },
  {
    id: 'tay-nguyen',
    name: 'Tây Nguyên',
    shortName: 'Tây Nguyên',
    description:
      'Vùng cao nguyên đất đỏ bazan hùng vĩ với Không gian văn hóa Cồng chiêng Tây Nguyên (UNESCO), Nhà Rông cao vút, nhà dài Ê-đê, kho tàng sử thi và những đêm hội buôn làng rộn rã.',
    landmarks: ['Nhà Rông mái lưỡi rìu', 'Nhà dài Ê-đê', 'Cồng chiêng Tây Nguyên'],
    accentColor: '#E11D48',
    dioramaImage: STATIC_ASSETS.regionCentralHighlands,
  },
  {
    id: 'nam-bo',
    name: 'Nam Bộ',
    shortName: 'Nam Bộ',
    description:
      'Vùng đất trù phú phương Nam bao gồm miền Đông và châu thổ sông Cửu Long, hội tụ chùa Khmer vàng rực, hội quán người Hoa, chợ nổi sông nước và miệt vườn cây trái sum suê.',
    landmarks: ['Chùa Khmer Nam Bộ', 'Chợ nổi & Ghe thuyền', 'Khu di tích Sóc Bom Bo'],
    accentColor: '#3D9BE9',
    dioramaImage: STATIC_ASSETS.regionDeltaCoastal,
  },
];

export const REGIONS_EN: RegionInfo[] = [
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

export const REGIONS: RegionInfo[] = REGIONS_EN;

export const LANGUAGE_FAMILIES_VI: { id: LanguageFamilyId; label: string; groups: string }[] = [
  { id: 'nam-a', label: 'Nam Á', groups: 'Việt - Mường, Môn - Khơ-me' },
  { id: 'tai-kadai', label: 'Thái - Ca Đai', groups: 'Tày - Thái, Ca Đai' },
  { id: 'hmong-dao', label: 'H’Mông - Dao', groups: 'H’Mông, Dao' },
  { id: 'nam-dao', label: 'Nam Đảo', groups: 'Malayô - Pôlinêxia' },
  { id: 'han-tang', label: 'Hán - Tạng', groups: 'Hán, Tạng - Miến' },
];

export const LANGUAGE_FAMILIES_EN: { id: LanguageFamilyId; label: string; groups: string }[] = [
  { id: 'nam-a', label: 'Austroasiatic', groups: 'Viet - Muong, Mon - Khmer' },
  { id: 'tai-kadai', label: 'Kra-Dai', groups: 'Tay - Thai, Kra - Dai' },
  { id: 'hmong-dao', label: 'Hmong-Mien', groups: 'Hmong, Dao' },
  { id: 'nam-dao', label: 'Austronesian', groups: 'Malayo - Polynesian' },
  { id: 'han-tang', label: 'Sino-Tibetan', groups: 'Sinitic, Tibeto - Burman' },
];

export const LANGUAGE_FAMILIES = LANGUAGE_FAMILIES_EN;

export function getRegions(language: Language = 'vi'): RegionInfo[] {
  return language === 'vi' ? REGIONS_VI : REGIONS_EN;
}

export function getRegionById(id: RegionId, language: Language = 'vi'): RegionInfo | undefined {
  const list = getRegions(language);
  return list.find((r) => r.id === id);
}

export function getLanguageFamilies(
  language: Language = 'vi'
): { id: LanguageFamilyId; label: string; groups: string }[] {
  return language === 'vi' ? LANGUAGE_FAMILIES_VI : LANGUAGE_FAMILIES_EN;
}

export function getEthnicGroups(language: Language = 'vi'): EthnicGroup[] {
  return language === 'vi' ? ETHNIC_GROUPS_VI : getEthnicGroupsEn();
}

export function getEthnicById(id: string, language: Language = 'vi'): EthnicGroup | undefined {
  const list = getEthnicGroups(language);
  return list.find((g) => g.id === id);
}

export function countGroupsInRegion(regionId: RegionId): number {
  return ETHNIC_GROUPS_VI.filter((g) => g.regionIds.includes(regionId)).length;
}

export const OFFICIAL_REFERENCE_SOURCES_VI = [
  {
    name: 'Cục Thống kê Quốc gia Việt Nam (NSO / Tổng cục Thống kê)',
    url: 'https://www.nso.gov.vn/',
    note: 'Danh mục 54 dân tộc chính thức của Việt Nam và kết quả điều tra dân số, phân bố cư trú toàn quốc.',
  },
  {
    name: 'Cổng Thông tin Điện tử Chính phủ — 54 Dân tộc Việt Nam',
    url: 'https://chinhphu.vn/dan-toc',
    note: 'Hồ sơ tổng quan chính thức về ngôn ngữ, địa bàn sinh sống, tập quán kinh tế và di sản văn hóa.',
  },
  {
    name: 'Bộ Văn hóa, Thể thao và Du lịch',
    url: 'https://bvhttdl.gov.vn/',
    note: 'Dữ liệu di sản văn hóa, lễ hội truyền thống và chính sách bảo tồn bản sắc văn hóa các dân tộc anh em.',
  },
  {
    name: 'Cục Di sản Văn hóa',
    url: 'https://dsvh.gov.vn/',
    note: 'Hồ sơ Di sản văn hóa phi vật thể Quốc gia và Di sản văn hóa đại diện nhân loại của UNESCO.',
  },
  {
    name: 'Bảo tàng Dân tộc học Việt Nam',
    url: 'https://www.vme.org.vn/',
    note: 'Hệ thống trưng bày, tư liệu hiện vật, kiến trúc và trang phục truyền thống của 54 dân tộc Việt Nam.',
  },
];

export const OFFICIAL_REFERENCE_SOURCES_EN = [
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

export const OFFICIAL_REFERENCE_SOURCES = OFFICIAL_REFERENCE_SOURCES_EN;

export function getOfficialReferenceSources(language: Language = 'vi') {
  return language === 'vi' ? OFFICIAL_REFERENCE_SOURCES_VI : OFFICIAL_REFERENCE_SOURCES_EN;
}

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

