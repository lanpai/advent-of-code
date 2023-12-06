import { getInput } from "./utils";

const input = await getInput();

const [durations, records] = input.split("\n").map((line) =>
  line
    .substring(line.indexOf(": ") + 2)
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((num) => parseInt(num, 10)),
);

let productValidChargeDurationCounts = 1;

function getValidChargeDurationsCount(duration: number, record: number) {
  const minChargeDuration =
    (duration - Math.sqrt(duration * duration - 4 * record)) / 2;
  const maxChargeDuration =
    (duration + Math.sqrt(duration * duration - 4 * record)) / 2;

  const minIntegerChargeDuration = Number.isInteger(minChargeDuration)
    ? minChargeDuration + 1
    : Math.ceil(minChargeDuration);
  const maxIntegerChargeDuration = Number.isInteger(maxChargeDuration)
    ? maxChargeDuration - 1
    : Math.floor(maxChargeDuration);

  return maxIntegerChargeDuration - minIntegerChargeDuration + 1;
}

for (let i = 0; i < Math.min(durations.length, records.length); i++) {
  const duration = durations[i];
  const record = records[i];

  productValidChargeDurationCounts *= getValidChargeDurationsCount(
    duration,
    record,
  );
}

console.log(
  "Product of Valid Charge Duration Counts:",
  productValidChargeDurationCounts,
);
console.log(
  "Product of Valid Charge Duration Counts (Concatenated):",
  getValidChargeDurationsCount(
    parseInt(durations.join(""), 10),
    parseInt(records.join(""), 10),
  ),
);
