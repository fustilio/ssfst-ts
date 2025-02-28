const exampleFromArray = require('../../examples/from-array');
const { spawnSync } = require('child_process');
const path = require('path');

describe('Example: from-array.js', () => {
    it('should run example without errors and produce expected output', async () => {
        let consoleOutput = '';
        const originalConsoleLog = console.log;
        console.log = (...args) => {
            consoleOutput += args.join('\n') + '\n';
        };

        exampleFromArray.runExample(); // Call runExample directly

        console.log = originalConsoleLog;

        expect(consoleOutput).toContain('Input alphabet: a,b,c');
        expect(consoleOutput).toContain('Number of states:');
        expect(consoleOutput).toContain('Number of transitions:');
        expect(consoleOutput).toContain('Transducer output for "cab": 714');
        expect(consoleOutput).toContain('Transducer output for "abab": 1414');
        expect(consoleOutput).toContain('Transducer output for "ccc": 9');
        expect(consoleOutput).toContain('Transducer output for "unknown": unknown');
    });

    it('should run example when executed directly', () => {
        const examplePath = path.join(__dirname, '../../examples/from-array.js');
        const result = spawnSync('node', [examplePath]);
        const consoleOutput = result.stdout.toString();

        expect(consoleOutput).toContain('Input alphabet: a,b,c');
        expect(consoleOutput).toContain('Number of states:');
        expect(consoleOutput).toContain('Number of transitions:');
        expect(consoleOutput).toContain('Transducer output for "cab": 714');
        expect(consoleOutput).toContain('Transducer output for "abab": 1414');
        expect(consoleOutput).toContain('Transducer output for "ccc": 9');
        expect(consoleOutput).toContain('Transducer output for "unknown": unknown');
    });
});
