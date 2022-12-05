import { createReadStream } from "fs";
import { createInterface } from "readline";

const aCode = "a".charCodeAt(0);
const ACode = "A".charCodeAt(0);

(async () => {
  const inStream = createReadStream("in");

  const rl = createInterface({
    input: inStream,
  });

  let sum = 0;

  for await (const line of rl) {
    const left = line.substring(0, line.length / 2);
    const right = line.substring(line.length / 2);

    let priority = 0;

    const used = new Set<string>();
    for (const leftC of left) {
      used.add(leftC);
    }
    for (const rightC of right) {
      if (used.has(rightC)) {
        used.delete(rightC);
        const value = rightC.charCodeAt(0);
        if (value >= aCode) {
          priority += 1 + (value - aCode);
        } else {
          priority += 27 + (value - ACode);
        }
      }
    }

    sum += priority;
  }

  console.log(sum);
})();
