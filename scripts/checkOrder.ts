import { ETHNIC_GROUPS_VI, getEthnicGroupsEn } from '../src/data/ethnicGroups';
import fs from 'fs';
import path from 'path';

console.log('=== VERIFYING COMPLETE 54/54 ETHNIC GROUPS ORDER & AVATARS ===');
console.log('Total VI groups:', ETHNIC_GROUPS_VI.length);
const enGroups = getEthnicGroupsEn();
console.log('Total EN groups:', enGroups.length);

let missingAvatarCount = 0;
let fileMissingCount = 0;

for (let i = 0; i < 54; i++) {
  const vi = ETHNIC_GROUPS_VI[i];
  const en = enGroups[i];
  const expectedNum = i + 1;

  if (vi.number !== expectedNum || en.number !== expectedNum) {
    console.error(`Number mismatch at index ${i}: VI=${vi.number}, EN=${en.number}, expected=${expectedNum}`);
  }

  if (!vi.avatarUrl) {
    console.error(`Missing avatarUrl for group #${expectedNum} (${vi.id})`);
    missingAvatarCount++;
  } else {
    // Check if file exists on disk in public
    const diskPath = path.join(process.cwd(), 'public', vi.avatarUrl.replace(/^\//, ''));
    if (!fs.existsSync(diskPath)) {
      console.error(`Avatar file does not exist on disk: ${diskPath}`);
      fileMissingCount++;
    }
  }

  console.log(
    `#${String(vi.number).padStart(2, '0')}/54 | id=${vi.id.padEnd(14)} | VI=${vi.name.padEnd(12)} | EN=${en.name.padEnd(12)} | avatar=${vi.avatarUrl}`
  );
}

if (missingAvatarCount === 0 && fileMissingCount === 0) {
  console.log('\nSUCCESS! ALL 54/54 ETHNIC GROUPS HAVE VALID AVATARS AND EXACT MATCHING SEQUENTIAL ORDER 01-54!');
} else {
  console.error(`ERRORS FOUND: missingAvatars=${missingAvatarCount}, missingFiles=${fileMissingCount}`);
  process.exit(1);
}
