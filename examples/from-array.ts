import { init, Transducer } from "../src";

function printTransducerInfo(transducer: Transducer): void {
  console.log(`Input alphabet: ${transducer.inputAlphabet()}`);
  console.log(`Number of states: ${transducer.stateCount()}`);
  console.log(`Number of transitions: ${transducer.transitionCount()}`);
}

const runExample = (): void => {
  const dict = [
    { input: "a", output: "1" },
    { input: "aa", output: "2" },
    { input: "aaa", output: "3" },
    { input: "b", output: "4" },
    { input: "bb", output: "5" },
    { input: "bbb", output: "6" },
    { input: "c", output: "7" },
    { input: "cc", output: "8" },
    { input: "ccc", output: "9" },
  ];

  const transducer = init(dict);

  printTransducerInfo(transducer);

  console.log(`Transducer output for "cab": ${transducer.process("cab")}`);
  console.log(`Transducer output for "abab": ${transducer.process("abab")}`);
  console.log(`Transducer output for "ccc": ${transducer.process("ccc")}`);
  console.log(
    `Transducer output for "unknown": ${transducer.process("unknown")}`
  );
};

export { runExample };
