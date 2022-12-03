import { createReadStream } from "fs";
import { createInterface } from "readline";

(async () => {
  const inStream = createReadStream("in");

  const rl = createInterface({
    input: inStream,
  });

  const ROCK_SCORE = 1;
  const PAPER_SCORE = 2;
  const SCISSORS_SCORE = 3;

  const WIN_SCORE = 6;
  const TIE_SCORE = 3;

  let leftScore = 0;
  let rightScore = 0;

  for await (const line of rl) {
    const [left, right] = line.split(" ");

    switch (left) {
      case "A": // ROCK
        leftScore += ROCK_SCORE;
        switch (right) {
          case "X": // LOSE
            rightScore += SCISSORS_SCORE;
            break;
          case "Y": // DRAW
            rightScore += ROCK_SCORE;
            leftScore += TIE_SCORE;
            rightScore += TIE_SCORE;
            break;
          case "Z": // WIN
            rightScore += PAPER_SCORE;
            rightScore += WIN_SCORE;
            break;
        }
        break;
      case "B": // PAPER
        leftScore += PAPER_SCORE;
        switch (right) {
          case "X": // LOSE
            rightScore += ROCK_SCORE;
            break;
          case "Y": // DRAW
            rightScore += PAPER_SCORE;
            leftScore += TIE_SCORE;
            rightScore += TIE_SCORE;
            break;
          case "Z": // WIN
            rightScore += SCISSORS_SCORE;
            rightScore += WIN_SCORE;
            break;
        }
        break;
      case "C": // SCISSORS
        leftScore += SCISSORS_SCORE;
        switch (right) {
          case "X": // LOSE
            rightScore += PAPER_SCORE;
            break;
          case "Y": // DRAW
            rightScore += SCISSORS_SCORE;
            leftScore += TIE_SCORE;
            rightScore += TIE_SCORE;
            break;
          case "Z": // WIN
            rightScore += ROCK_SCORE;
            rightScore += WIN_SCORE;
            break;
        }
        break;
    }
  }

  console.log(leftScore, rightScore);
})();
