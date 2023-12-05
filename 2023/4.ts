import { getInput } from "./utils";

const input = await getInput();

const numCardCopies: Record<number, number> = {};

let sumCardScore = 0;
let sumCardCopies = 0;
for (const card of input.split("\n")) {
  const startIndex = card.indexOf(": ");
  const separatorIndex = card.indexOf(" | ");

  const currentCard = parseInt(card.substring(4, startIndex), 10);

  const winningSet = new Set<string>();
  const winningNumbers = card
    .substring(startIndex, separatorIndex)
    .trim()
    .split(" ")
    .filter(Boolean);
  winningNumbers.forEach((num) => winningSet.add(num));

  const playersNumbers = card
    .substring(separatorIndex + 3)
    .trim()
    .split(" ")
    .filter(Boolean);

  const numCopiesCurrentCard = numCardCopies[currentCard] ?? 1;
  numCardCopies[currentCard] = numCopiesCurrentCard;

  let numWinningNumbers = 0;
  for (const num of playersNumbers) {
    if (winningSet.has(num)) {
      numWinningNumbers++;
      numCardCopies[currentCard + numWinningNumbers] =
        (numCardCopies[currentCard + numWinningNumbers] ?? 1) +
        numCopiesCurrentCard;
    }
  }

  const cardScore =
    numWinningNumbers > 0 ? Math.pow(2, numWinningNumbers - 1) : 0;

  sumCardScore += cardScore;
  sumCardCopies += numCopiesCurrentCard;
}

console.log("Sum of All Card Scores", sumCardScore);
console.log("Sum of All Card Copies", sumCardCopies);
