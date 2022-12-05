import { createReadStream } from "fs";
import { createInterface } from "readline";

class Range {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  contains(range: Range) {
    return this.start <= range.start && this.end >= range.end;
  }

  overlaps(range: Range) {
    return this.start <= range.end && this.end >= range.start;
  }
}

(async () => {
  const inStream = createReadStream("in");

  const rl = createInterface({
    input: inStream,
  });

  let sum = 0;

  for await (const line of rl) {
    const [a, b] = line.split(",");
    const aRange = new Range(
      parseInt(a.split("-")[0]),
      parseInt(a.split("-")[1])
    );
    const bRange = new Range(
      parseInt(b.split("-")[0]),
      parseInt(b.split("-")[1])
    );

    if (aRange.overlaps(bRange) || bRange.overlaps(aRange)) {
      sum++;
    }
  }

  console.log(sum);
})();
