import { getInput } from "./utils";

const input = await getInput();

const grid = input.split("\n");

function isDigit(char?: string) {
  if (!char) return false;

  const code = char.charCodeAt(0);
  return code >= 48 && code <= 57;
}

function isValidSymbol(char?: string) {
  return Boolean(char && char !== "." && !isDigit(char));
}

function getNeighboringCoords(x: number, y: number) {
  return [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x - 1],
    [y, x + 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
  ] as [number, number][];
}

function hasSymbolNeighbor(x: number, y: number) {
  return getNeighboringCoords(x, y).some(([neighborY, neighborX]) =>
    isValidSymbol(grid[neighborY]?.[neighborX]),
  );
}

function getNeighboringGears(x: number, y: number) {
  return getNeighboringCoords(x, y).filter(
    ([gearY, gearX]) => grid[gearY]?.[gearX] === "*",
  );
}

let sumPartNum = 0;

let gearRatios: Record<string, number[]> = {};

for (const [y, line] of grid.entries()) {
  let currNum = "";
  let foundSymbolNeighbor = false;
  let neighboringGears = new Set<string>();

  for (let x = 0; x < line.length; x++) {
    const char = line[x];

    if (isDigit(char)) {
      currNum += char;
      if (hasSymbolNeighbor(x, y)) {
        foundSymbolNeighbor = true;

        for (const [gearX, gearY] of getNeighboringGears(x, y)) {
          neighboringGears.add(`${gearX},${gearY}`);
        }
      }
    }

    if (x === line.length - 1 || !isDigit(line[x + 1])) {
      if (currNum && foundSymbolNeighbor) {
        const partNum = parseInt(currNum, 10);
        sumPartNum += partNum;

        for (const gearKey of neighboringGears.values()) {
          gearRatios[gearKey] = [...(gearRatios[gearKey] ?? []), partNum];
        }
      }
      currNum = "";
      foundSymbolNeighbor = false;
      neighboringGears = new Set<string>();
    }
  }
}

const sumGearRatios = Object.values(gearRatios).reduce((acc, partNums) => {
  if (partNums.length !== 2) {
    return acc;
  }
  return acc + partNums[0] * partNums[1];
}, 0);

console.log("Sum of Valid Part Numbers:", sumPartNum);
console.log("Sum of Gear Ratios:", sumGearRatios);
