import { getEthnicGroupsEn, ETHNIC_GROUPS_VI } from '../src/data/ethnicGroups';
import { ETHNIC_TRANSLATIONS_EN } from '../src/data/translations_en';

console.log('VI count:', ETHNIC_GROUPS_VI.length);
console.log('Translations count:', Object.keys(ETHNIC_TRANSLATIONS_EN).length);
const enList = getEthnicGroupsEn();
console.log('EN list count:', enList.length);

const missing = ETHNIC_GROUPS_VI.filter((g) => !ETHNIC_TRANSLATIONS_EN[g.id]);
if (missing.length > 0) {
  console.error(
    'Missing translations for:',
    missing.map((m) => m.id)
  );
  process.exit(1);
}

// Check all 54 groups for required fields
let errorCount = 0;
for (const g of enList) {
  if (!g.name) {
    console.error(`Group ${g.id} missing name`);
    errorCount++;
  }
  if (!g.currentDistributionNotes) {
    console.error(`Group ${g.id} missing currentDistributionNotes`);
    errorCount++;
  }
  if (!g.introduction) {
    console.error(`Group ${g.id} missing introduction`);
    errorCount++;
  }
  if (!g.livingEnvironment) {
    console.error(`Group ${g.id} missing livingEnvironment`);
    errorCount++;
  }
  if (!g.climateAndTerrain) {
    console.error(`Group ${g.id} missing climateAndTerrain`);
    errorCount++;
  }
  if (!g.traditionalSettlements) {
    console.error(`Group ${g.id} missing traditionalSettlements`);
    errorCount++;
  }
  if (!g.traditionalHouse?.name) {
    console.error(`Group ${g.id} missing traditionalHouse.name`);
    errorCount++;
  }
  if (!g.economy?.agriculture) {
    console.error(`Group ${g.id} missing economy.agriculture`);
    errorCount++;
  }
  if (!g.culture?.language) {
    console.error(`Group ${g.id} missing culture.language`);
    errorCount++;
  }
  if (!g.costumes?.male?.description) {
    console.error(`Group ${g.id} missing costumes.male.description`);
    errorCount++;
  }
  if (!g.costumes?.female?.description) {
    console.error(`Group ${g.id} missing costumes.female.description`);
    errorCount++;
  }
  if (!g.notes) {
    console.error(`Group ${g.id} missing notes`);
    errorCount++;
  }
}

if (errorCount > 0) {
  console.error(`Found ${errorCount} field errors!`);
  process.exit(1);
}

console.log('ALL 54 ETHNIC GROUPS PASSED FULL STRUCTURAL & FIELD INTEGRITY CHECK!');

const tay = enList.find((g) => g.id === 'tay');
console.log('\n--- Tay Verification ---');
console.log('Name:', tay?.name);
console.log('Settlement:', tay?.currentDistributionNotes);
console.log('Notes (Cultural Highlights):', tay?.notes);
console.log('Living Environment:', tay?.livingEnvironment);
console.log('Terrain & Climate:', tay?.climateAndTerrain);
console.log('Village Layout:', tay?.traditionalSettlements);
console.log('References:', tay?.referenceSources);
