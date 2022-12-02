import { createReadStream } from "fs";
import { createInterface } from "readline";

(async () => {
  const inStream = createReadStream("in");

  const rl = createInterface({
    input: inStream,
  });

  let max = 0;
  let total = 0;
  for await (const line of rl) {
    if (line === "") {
      max = Math.max(max, total);
      total = 0;
      continue;
    }

    total += parseInt(line, 10);
  }

  console.log(max);
})();
