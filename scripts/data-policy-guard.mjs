import { guardSeedDirectory } from './data-policy.mjs';

const approved = await guardSeedDirectory();
for (const item of approved) {
  console.log(`DEC-020 approved: ${item.relativePath} (${item.metadata.dataset_id}, ${item.metadata.provenance})`);
}
console.log(`DEC-020 data guard passed for ${approved.length} dataset(s).`);
