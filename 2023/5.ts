import { getInput } from "./utils";

const input = await getInput();

class RangeMap {
  ranges = [] as [number, number, number][];

  addRange(sourceStart: number, destStart: number, length: number) {
    let rangeIndex = 0;
    for (
      ;
      rangeIndex < this.ranges.length &&
      this.ranges[rangeIndex][0] < sourceStart;
      rangeIndex++
    );
    this.ranges.splice(rangeIndex, 0, [sourceStart, destStart, length]);
  }

  getDest(source: number) {
    const rangeIndex = this.ranges.findLastIndex(
      ([sourceStart]) => sourceStart <= source,
    );

    if (rangeIndex < 0) {
      return source;
    }

    const [sourceStart, destStart, length] = this.ranges[rangeIndex];

    if (sourceStart > source || sourceStart + length < source) {
      return source;
    }

    return source - sourceStart + destStart;
  }

  // sourceRange: [startIndex, endIndex]
  getRangeDest(sourceRange: [number, number]) {
    const rangeIndexStart = this.ranges.findIndex(
      ([sourceStart, _destStart, length]) =>
        sourceStart <= sourceRange[1] && sourceStart + length >= sourceRange[0],
    );
    const rangeIndexEnd = this.ranges.findIndex(
      ([sourceStart, _destStart, length]) =>
        sourceStart <= sourceRange[1] && sourceStart + length >= sourceRange[0],
    );

    if (rangeIndexStart < 0 || rangeIndexEnd < 0) {
      return [sourceRange];
    }

    const destRanges: [number, number][] = [];
    let index = sourceRange[0];
    let currentRangeIndex = rangeIndexStart;
    while (index <= sourceRange[1]) {
      const currentRange = this.ranges[currentRangeIndex];

      // Ran out of ranges
      if (!currentRange) {
        destRanges.push([index, sourceRange[1]]);
        break;
      }

      const [sourceStart, destStart, length] = currentRange;

      // Not in the bounds of the current range
      if (sourceStart > index) {
        const end = Math.min(sourceRange[1], sourceStart - 1);
        destRanges.push([index, end]);
        index = end + 1;
        continue;
      }

      // In the bounds of the current range
      const end = Math.min(sourceRange[1], sourceStart + length - 1);
      destRanges.push([
        index - sourceStart + destStart,
        end - sourceStart + destStart,
      ]);
      index = end + 1;

      // Go to next range
      currentRangeIndex++;
    }

    return destRanges;
  }
}

const [seedsStr, ...maps] = input.split("\n\n");
const seeds = seedsStr
  .substring(seedsStr.indexOf(": ") + 2)
  .trim()
  .split(" ")
  .map((x) => parseInt(x, 10));

function getFinalValues(initialValues: number[]) {
  let currentValues = initialValues;
  for (const map of maps) {
    const rangeMap = new RangeMap();
    map
      .split("\n")
      .slice(1)
      .map((line) => {
        const [destStart, sourceStart, length] = line
          .split(" ")
          .map((x) => parseInt(x, 10));
        rangeMap.addRange(sourceStart, destStart, length);
      });

    currentValues = currentValues.map((value) => rangeMap.getDest(value));
  }

  return currentValues;
}

function getFinalValuesRange(initialValues: [number, number][]) {
  let currentValues = initialValues;
  for (const map of maps) {
    const rangeMap = new RangeMap();
    map
      .split("\n")
      .slice(1)
      .map((line) => {
        const [destStart, sourceStart, length] = line
          .split(" ")
          .map((x) => parseInt(x, 10));
        rangeMap.addRange(sourceStart, destStart, length);
      });

    currentValues = currentValues.flatMap((value) =>
      rangeMap.getRangeDest(value),
    );
  }

  return currentValues;
}

const minFinalValue = getFinalValues(seeds).reduce(
  (acc, val) => Math.min(acc, val),
  Number.MAX_SAFE_INTEGER,
);

const minFinalValuesInRange = getFinalValuesRange(
  seeds.reduce<[number, number][]>((acc, val, index) => {
    if (index % 2 === 0) {
      acc.push([val, val]);
    } else {
      const lastRange = acc.at(-1);
      if (lastRange) {
        lastRange[1] = lastRange[0] + val - 1;
      }
    }
    return acc;
  }, []),
).reduce((acc, val) => Math.min(acc, val[0]), Number.MAX_SAFE_INTEGER);

console.log("Lowest Location Value:", minFinalValue);
console.log("Lowest Location Value in Range:", minFinalValuesInRange);
