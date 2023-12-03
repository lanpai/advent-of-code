import { getInput } from "./utils";

const input = await getInput();

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

let maxTotal = 0;
let sumPower = 0;

for (const line of input.split("\n")) {
  const [header, body] = line.split(":");

  const cubes = body
    .split(";")
    .map((roll) =>
      roll
        .split(",")
        .map((cube) => cube.trim().split(" "))
        .reduce<Record<string, string>>((acc, [count, color]) => {
          acc[color] = count;
          return acc;
        }, {}),
    )
    .reduce<Record<string, number>>(
      (acc, roll) => {
        for (const [color, count] of Object.entries(roll)) {
          acc[color] = Math.max(acc[color], parseInt(count, 10));
        }
        return acc;
      },
      { red: 0, green: 0, blue: 0 },
    );

  if (
    cubes.red <= MAX_RED &&
    cubes.green <= MAX_GREEN &&
    cubes.blue <= MAX_BLUE
  ) {
    const gameId = header.split(" ")[1];
    maxTotal += parseInt(gameId, 10);
  }

  const power = cubes.red * cubes.green * cubes.blue;
  sumPower += power;
}

console.log("Sum of the IDs of All Valid Games:", maxTotal);
console.log("Sum of Game Powers:", sumPower);
