import { ETHNIC_GROUPS_VI, getEthnicGroupsEn } from '../src/data/ethnicGroups';

console.log('=== VERIFYING ORDER & AVATARS (BATCH 1-45) ===');
console.log('Total VI groups:', ETHNIC_GROUPS_VI.length);
const enGroups = getEthnicGroupsEn();
console.log('Total EN groups:', enGroups.length);

console.log('\n--- Groups 31 to 45 (New Batch 3) ---');
for (let i = 30; i < 45; i++) {
  const vi = ETHNIC_GROUPS_VI[i];
  const en = enGroups[i];
  console.log(
    `#${String(vi.number).padStart(2, '0')}: id=${vi.id} | VI=${vi.name} | EN=${en.name} | avatar=${vi.avatarUrl}`
  );
}

console.log('\n--- Remaining 9 Groups (46 to 54) ---');
for (let i = 45; i < 54; i++) {
  const vi = ETHNIC_GROUPS_VI[i];
  const en = enGroups[i];
  console.log(
    `#${String(vi.number).padStart(2, '0')}: id=${vi.id} | VI=${vi.name} | EN=${en.name} | avatar=${vi.avatarUrl || 'none'}`
  );
}

// Check uniqueness of numbers 1..54
const viNumbers = ETHNIC_GROUPS_VI.map((g) => g.number).sort((a, b) => a - b);
const enNumbers = enGroups.map((g) => g.number).sort((a, b) => a - b);
const all1to54 = Array.from({ length: 54 }, (_, i) => i + 1);

const viMismatch = all1to54.filter((n, idx) => n !== viNumbers[idx]);
const enMismatch = all1to54.filter((n, idx) => n !== enNumbers[idx]);

if (viMismatch.length === 0 && enMismatch.length === 0) {
  console.log('\nSUCCESS: All numbers 01 to 54 are perfectly sequential and unique in both languages!');
} else {
  console.error('MISMATCH FOUND!', { viMismatch, enMismatch });
  process.exit(1);
}
