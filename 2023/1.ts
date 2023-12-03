import { getInput } from "./utils";

const input = await getInput();

type Leaf = string;

type Branch = {
  [char: string]: Branch | Leaf;
};

const tree: Branch = {};

function addWord(word: string, result: string) {
  let currentBranch = tree;
  word.split("").forEach((char, i) => {
    if (i === word.length - 1) {
      currentBranch[char] = result;
    } else {
      if (currentBranch[char] && !(typeof currentBranch[char] === "object")) {
        throw new Error("Writing branch onto leaf");
      }

      currentBranch[char] = currentBranch[char] ?? {};
      currentBranch = currentBranch[char] as Branch;
    }
  });
}
addWord("one", "1");
addWord("two", "2");
addWord("three", "3");
addWord("four", "4");
addWord("five", "5");
addWord("six", "6");
addWord("seven", "7");
addWord("eight", "8");
addWord("nine", "9");
addWord("zero", "0");

function parseDigit(str: string) {
  let currentNode = tree;
  for (const char of str) {
    let nextNode = currentNode[char];
    if (!nextNode) {
      return undefined;
    }

    if (typeof nextNode === "string") {
      return nextNode;
    }

    currentNode = nextNode;
  }
}

const result = input
  .split("\n")
  .map((line) => {
    let firstDigit: string | undefined = undefined;
    let lastDigit: string | undefined = undefined;

    while (line.length > 0) {
      const char = line[0];
      const code = char.charCodeAt(0);
      const digit = code >= 48 && code <= 57 ? char : parseDigit(line);
      if (digit) {
        firstDigit = firstDigit ?? digit;
        lastDigit = digit;
      }

      line = line.substring(1);
    }

    if (!firstDigit || !lastDigit) {
      return 0;
    }

    return parseInt(firstDigit + lastDigit, 10);
  })
  .reduce((acc, num) => acc + num, 0);

console.log(result);
