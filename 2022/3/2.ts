import { createReadStream } from "fs";
import { createInterface } from "readline";

const aCode = "a".charCodeAt(0);
const ACode = "A".charCodeAt(0);

function intersection(a: Set<string>, b: Set<string>) {
  return new Set([...a].filter((x) => b.has(x)));
}

function getValue(c: string) {
  const value = c.charCodeAt(0);
  if (value >= aCode) {
    return 1 + (value - aCode);
  } else {
    return 27 + (value - ACode);
  }
}

function calcPriority(lines: string[]): number {
  let used: Set<string> | undefined = undefined;
  for (const line of lines) {
    const currUsed = new Set<string>();
    for (const c of line) {
      currUsed.add(c);
    }

    if (!used) {
      used = currUsed;
    } else {
      used = intersection(used, currUsed);
    }
  }
  if (used) {
    return getValue([...used.values()][0]);
  }
  return 0;
}

(async () => {
  const inStream = createReadStream("in");

  const rl = createInterface({
    input: inStream,
  });

  let sum = 0;

  let index = 0;
  let lines: string[] = [];
  for await (const line of rl) {
    lines.push(line);
    index++;
    if (index === 3) {
      sum += calcPriority(lines);

      index = 0;
      lines = [];
    }
  }

  console.log(sum);
})();
