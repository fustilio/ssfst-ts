import * as exampleFromFileAsync from "../../examples/from-file-async.ts";
import { describe, it, expect } from "vitest";

describe("Example: from-file-async.ts", () => {
  it("should run example without errors and produce expected output", async () => {
    let consoleOutput = "";
    const originalConsoleLog = console.log;
    console.log = (...args: any[]) => {
      consoleOutput += args.join("\n") + "\n";
    };

    await exampleFromFileAsync.runExample();

    console.log = originalConsoleLog;

    expect(consoleOutput).toContain("Input alphabet:");
    expect(consoleOutput).toContain("A");
    expect(consoleOutput).toContain("C");
    expect(consoleOutput).toContain("P");
    expect(consoleOutput).toContain("Number of states:");
    expect(consoleOutput).toContain("Number of transitions:");
    expect(consoleOutput).toContain(
      'Transducer output for "Amsterdam": Amsterdam'
    );
  });
});
