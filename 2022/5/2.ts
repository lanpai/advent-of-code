import { createReadStream } from "fs";
import { createInterface } from "readline";

class Stack {
  stack: string[] = [];

  constructor() {
  }
}

(async () => {
  const inStream = createReadStream("in");

  const rl = createInterface({
    input: inStream,
  });

  const stacks: Stack[] = [];

  let step: "stacks" | "filler" | "instructions" = "stacks";

  for await (let line of rl) {
    switch (step) {
      case "stacks": {
        if (line.startsWith(" 1 ")) {
          step = "filler";
          continue;
        }

        let stackVal = "";
        let columnIndex = 0;

        const getValue = () => {
          stackVal = line.substring(0, 4);
          line = line.substring(4);
          return stackVal;
        };

        while (getValue()) {
          while (stacks[columnIndex] === undefined) {
            stacks.push(new Stack());
          }

          const c = stackVal.substring(1, 2);
          if (c !== " ") {
            stacks[columnIndex].stack.push(c);
          }

          columnIndex++;
        }
        break;
      }
      case "filler": {
        if (line === "") {
          step = "instructions";
        }
        break;
      }
      case "instructions": {
        const values = line.split(" ");
        const count = parseInt(values[1], 10);
        const from = parseInt(values[3], 10) - 1;
        const to = parseInt(values[5], 10) - 1;

        const poppedValues = [];
        for (let i = 0; i < count; i++) {
          const value = stacks[from].stack.shift();
          if (value) {
            poppedValues.push(value);
          }
        }
        for (const value of poppedValues.reverse()) {
          stacks[to].stack.unshift(value);
        }

        break;
      }
    }
  }

  console.log(stacks.map((s) => s.stack[0] ?? " ").join(""));
})();
