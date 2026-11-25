import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line roast of an alarm clock that rings at 6 AM on a Saturday.
// The clock is the target: it saved its voice all week, then chose the
// one morning nobody wanted a performance — and its own snooze button
// knows it, apologising in nine-minute instalments.
const ROAST =
  "My alarm clock sat silent all week saving its voice, then headlined 6 AM on Saturday to an empty room — even its snooze button apologises in nine-minute instalments.";

function validate(line: string): void {
  if (typeof line !== "string") {
    throw new Error("roast must be a string");
  }
  if (line.trim().length === 0) {
    throw new Error("roast must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("roast must be a single line");
  }
  // Reject tabs and other control characters: the entry must read as
  // one clean printed line, not smuggle in extra formatting.
  for (const ch of line) {
    const code = ch.codePointAt(0) ?? 0;
    if (code < 0x20 || code === 0x7f) {
      throw new Error("roast must not contain control characters");
    }
  }
  const length = [...line].length;
  if (length < 1 || length > 200) {
    throw new Error(`roast must be 1-200 characters, got ${length}`);
  }
}

function main(): void {
  validate(ROAST);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), ROAST, "utf8");
}

main();
