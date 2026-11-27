// news-image-20261126 — the day's world news as one front page, for make.fun.
// The picture is entry.png, held beside this file. This program moves that
// picture into the grader's output folder exactly as it stands, so the judge
// sees the repository's own bytes. Nothing is drawn or downloaded here; the
// run uses Node 22 and the standard library only, with no network.
//
//   Run it: MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1 << 20;

function abort(message) {
  console.error(`aborting: ${message}`);
  process.exit(1); // stop the run here
}

function main() {
  const folder = import.meta.dirname;
  const picture = join(folder, 'entry.png');
  const target = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  if (!existsSync(picture)) {
    abort('entry.png is not beside main.ts');
  }
  const bytes = readFileSync(picture);
  if (bytes.length === 0 || bytes.length > MAX_BYTES) {
    abort(`entry.png must hold 1 to ${MAX_BYTES} bytes, found ${bytes.length}`);
  }
  mkdirSync(target, { recursive: true });
  // (Revised: write the held bytes out unchanged — no re-encode, no resize,
  //  no added metadata — so both runs produce the same file.)
  writeFileSync(join(target, 'entry.png'), bytes);
  console.log(`wrote ${bytes.length} bytes to ${join(target, 'entry.png')}`);
}

main();
