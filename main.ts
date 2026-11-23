// One Emoji, One Smile — entry program.
//
// Writes exactly one emoji to /output/entry.txt: the hugging face,
// the warmest single gesture a stranger can receive at a glance.
// A hug reads as kind with no context, no irony and no in-joke, and
// it is a deliberate pick rather than the first smiley on the keyboard.
//
// The gate: entry.txt must be UTF-8 text of 1 to 8 characters, not
// only white space. One emoji plus a trailing newline is 2 characters.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "\u{1F917}"; // 🤗 hugging face

// Empty a directory's contents only — never remove the directory
// itself, because the grader's /output is a mounted empty directory
// and removing the mount point fails.
function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  emptyDir(outDir);
  const text = EMOJI + "\n";
  // Gate guard: the entry must be 1 to 8 characters, not only whitespace.
  const chars = [...text.trim()];
  if (chars.length < 1 || chars.length > 8) {
    throw new Error(`entry is ${chars.length} characters, outside the 1-8 gate`);
  }
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

main();
