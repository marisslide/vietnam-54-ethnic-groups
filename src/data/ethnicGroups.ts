import { EthnicGroup, LanguageFamilyId, RegionId, RegionInfo } from '../types/ethnic';
import { STATIC_ASSETS } from './staticAssets';
import { ETHNIC_PART_1 } from './parts/part1';
import { ETHNIC_PART_2 } from './parts/part2';
import { ETHNIC_PART_3 } from './parts/part3';
import { ETHNIC_PART_4 } from './parts/part4';
import { ETHNIC_PART_5 } from './parts/part5';
import { ETHNIC_PART_6 } from './parts/part6';
import { applyEnglishTranslation } from './translations_en';
import { Language } from '../i18n/translations';

export const RAW_ETHNIC_GROUPS: EthnicGroup[] = [
  ...ETHNIC_PART_1,
  ...ETHNIC_PART_2,
  ...ETHNIC_PART_3,
  ...ETHNIC_PART_4,
  ...ETHNIC_PART_5,
  ...ETHNIC_PART_6,
];

// Mapping of custom avatar portraits uploaded by user
export const ETHNIC_AVATAR_MAP: Record<string, string> = {
  cong: '/images/avatars/cong.jpg', // 01
  'ha-nhi': '/images/avatars/ha-nhi.jpg', // 02
  khang: '/images/avatars/khang.jpg', // 03
  'kho-mu': '/images/avatars/kho-mu.jpg', // 04
  'la-ha': '/images/avatars/la-ha.jpg', // 05
  'la-hu': '/images/avatars/la-hu.jpg', // 06
  lao: '/images/avatars/lao.jpg', // 07
  lu: '/images/avatars/lu.jpg', // 08
  mang: '/images/avatars/mang.jpg', // 09
  'si-la': '/images/avatars/si-la.jpg', // 10
  'xinh-mun': '/images/avatars/xinh-mun.jpg', // 11
  'bo-y': '/images/avatars/bo-y.jpg', // 12
  dao: '/images/avatars/dao.jpg', // 13
  giay: '/images/avatars/giay.jpg', // 14
  hmong: '/images/avatars/hmong.jpg', // 15
  'phu-la': '/images/avatars/phu-la.jpg', // 16
  thai: '/images/avatars/thai.jpg', // 17
  'co-lao': '/images/avatars/co-lao.jpg', // 18
  'la-chi': '/images/avatars/la-chi.jpg', // 19
  'lo-lo': '/images/avatars/lo-lo.jpg', // 20
  ngai: '/images/avatars/ngai.jpg', // 21
  nung: '/images/avatars/nung.jpg', // 22
  'pa-then': '/images/avatars/pa-then.jpg', // 23
  'pu-peo': '/images/avatars/pu-peo.jpg', // 24
  'san-chay': '/images/avatars/san-chay.jpg', // 25
  'san-diu': '/images/avatars/san-diu.jpg', // 26
  tay: '/images/avatars/tay.jpg', // 27
  muong: '/images/avatars/muong.jpg', // 28
  kinh: '/images/avatars/kinh.jpg', // 29
  'bru-van-kieu': '/images/avatars/bru-van-kieu.jpg', // 30
  chut: '/images/avatars/chut.jpg', // 31
  'co-tu': '/images/avatars/co-tu.jpg', // 32
  'o-du': '/images/avatars/o-du.jpg', // 33
  'ta-oi': '/images/avatars/ta-oi.jpg', // 34
  tho: '/images/avatars/tho.jpg', // 35
  co: '/images/avatars/co.jpg', // 36
  'ra-glai': '/images/avatars/ra-glai.jpg', // 37
  brau: '/images/avatars/brau.jpg', // 38
  'chu-ru': '/images/avatars/chu-ru.jpg', // 39
  'co-ho': '/images/avatars/co-ho.jpg', // 40
  'e-de': '/images/avatars/e-de.jpg', // 41
  'gia-rai': '/images/avatars/gia-rai.jpg', // 42
  ma: '/images/avatars/ma.jpg', // 43
  mnong: '/images/avatars/mnong.jpg', // 44
  'ro-mam': '/images/avatars/ro-mam.jpg', // 45
};

// Priority ordering matching user's avatar card numbers (01/54 -> 45/54)
export const ORDERED_ETHNIC_IDS: string[] = [
  'cong', // 01/54
  'ha-nhi', // 02/54
  'khang', // 03/54
  'kho-mu', // 04/54
  'la-ha', // 05/54
  'la-hu', // 06/54
  'lao', // 07/54
  'lu', // 08/54
  'mang', // 09/54
  'si-la', // 10/54
  'xinh-mun', // 11/54
  'bo-y', // 12/54
  'dao', // 13/54
  'giay', // 14/54
  'hmong', // 15/54
  'phu-la', // 16/54
  'thai', // 17/54
  'co-lao', // 18/54
  'la-chi', // 19/54
  'lo-lo', // 20/54
  'ngai', // 21/54
  'nung', // 22/54
  'pa-then', // 23/54
  'pu-peo', // 24/54
  'san-chay', // 25/54
  'san-diu', // 26/54
  'tay', // 27/54
  'muong', // 28/54
  'kinh', // 29/54
  'bru-van-kieu', // 30/54
  'chut', // 31/54
  'co-tu', // 32/54
  'o-du', // 33/54
  'ta-oi', // 34/54
  'tho', // 35/54
  'co', // 36/54
  'ra-glai', // 37/54
  'brau', // 38/54
  'chu-ru', // 39/54
  'co-ho', // 40/54
  'e-de', // 41/54
  'gia-rai', // 42/54
  'ma', // 43/54
  'mnong', // 44/54
  'ro-mam', // 45/54
];

function buildOrderedEthnicGroups(rawList: EthnicGroup[]): EthnicGroup[] {
  const map = new Map<string, EthnicGroup>();
  for (const g of rawList) {
    map.set(g.id, g);
  }

  const result: EthnicGroup[] = [];

  // 1. First add prioritized groups in exact ordered sequence
  ORDERED_ETHNIC_IDS.forEach((id, index) => {
    const group = map.get(id);
    if (group) {
      result.push({
        ...group,
        number: index + 1,
        avatarUrl: ETHNIC_AVATAR_MAP[id] || group.avatarUrl,
      });
      map.delete(id);
    }
  });

  // 2. Append all remaining groups, continuing numbering from 16 to 54
  let nextNumber = ORDERED_ETHNIC_IDS.length + 1;
  for (const group of rawList) {
    if (map.has(group.id)) {
      result.push({
        ...group,
        number: nextNumber++,
        avatarUrl: ETHNIC_AVATAR_MAP[group.id] || group.avatarUrl,
      });
      map.delete(group.id);
    }
  }

  return result;
}

export const ETHNIC_GROUPS_VI: EthnicGroup[] = buildOrderedEthnicGroups(RAW_ETHNIC_GROUPS);

// Lazy cached English dataset
let cachedEthnicGroupsEn: EthnicGroup[] | null = null;

export function getEthnicGroupsEn(): EthnicGroup[] {
  if (!cachedEthnicGroupsEn) {
    cachedEthnicGroupsEn = ETHNIC_GROUPS_VI.map(applyEnglishTranslation);
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

