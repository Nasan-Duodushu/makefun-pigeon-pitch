// Pigeon Pitch, One Line — one line, <=200 chars: the elevator pitch a city
// pigeon gives to investors for its startup. Judge: funnier pitch wins; the
// pigeon's voice and city life must stay in view, with an original twist.
// The twist here is literal: the startup term "moat" is a park fountain,
// and the pigeon's cousins live in it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

class Pitch {
  private readonly hook: string;
  private readonly twist: string;

  constructor(hook: string, twist: string) {
    this.hook = hook;
    this.twist = twist;
  }

  deliver(): string {
    // Hook first (the investor question), twist second (the pigeon answer).
    return [this.hook, this.twist].join(" ").replace(/\s+/g, " ").trim();
  }
}

const PITCH = new Pitch(
  "Investors keep asking about my moat.",
  "It is a fountain in the park, and I have four hundred cousins living in it rent-free.",
);

function checkPitch(text: string): void {
  if (text.length < 1 || text.length > LIMIT) {
    throw new Error(`pitch must be 1-${LIMIT} chars, got ${text.length}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("pitch must be one line");
  }
  if (!/moat|fountain|cousins/.test(text)) {
    throw new Error("pitch must keep the pigeon's city life in view");
  }
}

const line = PITCH.deliver();
checkPitch(line);
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "entry.txt"), line + "\n", "utf8");
console.log(`${line.length} chars: ${line}`);
