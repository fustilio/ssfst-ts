import { initAsync, Transducer } from "../src";
import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";

function printTransducerInfo(transducer: Transducer): void {
  console.log(`Input alphabet: ${transducer.inputAlphabet()}`);
  console.log(`Number of states: ${transducer.stateCount()}`);
  console.log(`Number of transitions: ${transducer.transitionCount()}`);
}

async function* readLinesGenAsync(): AsyncGenerator<{
  input: string;
  output: string;
}> {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "capitals.txt")),
  });

  for await (const line of lineReader) {
    const [input, output] = line.split(",");
    yield { input, output };
  }
}

const runExample = async (): Promise<void> => {
  const asyncIterableDict = readLinesGenAsync();

  const transducer = await initAsync(asyncIterableDict);

  printTransducerInfo(transducer);

  console.log(
    `Transducer output for "Amsterdam": ${transducer.process("Amsterdam")}`
  );
  console.log(`Transducer output for "Paris": ${transducer.process("Paris")}`);
  console.log(
    `Transducer output for "Canberra": ${transducer.process("Canberra")}`
  );
  console.log(
    `Transducer output for "unknown": ${transducer.process("unknown")}`
  );
};

export { runExample };
