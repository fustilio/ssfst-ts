import * as exampleFromArray from "../../examples/from-array.ts";
import { describe, it, expect } from "vitest";

describe("Example: from-array.js", () => {
  it("should run example without errors and produce expected output", async () => {
    let consoleOutput = "";
    const originalConsoleLog = console.log;
    console.log = (...args: any[]) => {
      // Explicitly type args as any[]
      consoleOutput += args.join("\n") + "\n";
    };

    exampleFromArray.runExample(); // Call runExample directly

    console.log = originalConsoleLog;

    expect(consoleOutput).toContain("Input alphabet: a,b,c");
    expect(consoleOutput).toContain("Number of states:");
    expect(consoleOutput).toContain("Number of transitions:");
    expect(consoleOutput).toContain('Transducer output for "cab": 714');
    expect(consoleOutput).toContain('Transducer output for "abab": 1414');
    expect(consoleOutput).toContain('Transducer output for "ccc": 9');
    expect(consoleOutput).toContain('Transducer output for "unknown": unknown');
  });
});
