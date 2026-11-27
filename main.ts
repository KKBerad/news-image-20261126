// Entry for make.fun's "Sum up 26 November's world news in one image" bounty.
// The whole entry is the picture: entry.png sitting next to this file. The program
// places an exact copy of it in the grader's output directory, byte for byte, so
// the judge is shown precisely the file in this repository. Nothing is drawn,
// re-encoded, resized or fetched here; the run needs no network at all.
//
// Try it locally:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const picture = join(here, 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const MAX_BYTES = 1048576;

if (!existsSync(picture)) {
  console.error('entry.png is missing next to main.ts');
  process.exit(1);
}

const bytes = statSync(picture).size;
if (bytes === 0 || bytes > MAX_BYTES) {
  console.error(`entry.png must be 1 to ${MAX_BYTES} bytes, got ${bytes}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
// A plain copy keeps the run deterministic: both runs write the same bytes.
// (Revised: the copy must not re-encode the image, resize it, or add any metadata;
//  the file in the repository is already the exact 1024x1024 JPEG the judge sees.)
copyFileSync(picture, join(outputDir, 'entry.png'));
console.log(`entry.png (${bytes} bytes) copied to ${join(outputDir, 'entry.png')}`);
