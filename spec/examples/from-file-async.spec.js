const exampleFromFileAsync = require('../../examples/from-file-async');
const { spawnSync } = require('child_process');
const path = require('path');

describe('Example: from-file-async.js', () => {
    it('should run example without errors and produce expected output', async () => {
        let consoleOutput = '';
        const originalConsoleLog = console.log;
        console.log = (...args) => {
            consoleOutput += args.join('\n') + '\n';
        };

        await exampleFromFileAsync.runExample();

        console.log = originalConsoleLog;

        expect(consoleOutput).toContain('Input alphabet:');
        expect(consoleOutput).toContain('A');
        expect(consoleOutput).toContain('C');
        expect(consoleOutput).toContain('P');
        expect(consoleOutput).toContain('Number of states:');
        expect(consoleOutput).toContain('Number of transitions:');
        expect(consoleOutput).toContain('Transducer output for "Amsterdam": Amsterdam');
    });

    it('should run example when executed directly', () => {
        const examplePath = path.join(__dirname, '../../examples/from-file-async.js');
        const result = spawnSync('node', [examplePath]);
        const consoleOutput = result.stdout.toString();

        expect(consoleOutput).toContain('Input alphabet:');
        expect(consoleOutput).toContain('A');
        expect(consoleOutput).toContain('C');
        expect(consoleOutput).toContain('P');
        expect(consoleOutput).toContain('Number of states:');
        expect(consoleOutput).toContain('Number of transitions:');
        expect(consoleOutput).toContain('Transducer output for "Amsterdam": Amsterdam');
    });
});
