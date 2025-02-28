const exampleFromIterable = require('../../examples/from-iterable');
const { spawnSync } = require('child_process');
const path = require('path');

describe('Example: from-iterable.js', () => {
    it('should run example without errors and produce expected output', async () => {
        let consoleOutput = '';
        const originalConsoleLog = console.log;
        console.log = (...args) => {
            consoleOutput += args.join('\n') + '\n';
        };

        await exampleFromIterable.runExample();

        console.log = originalConsoleLog;

        expect(consoleOutput).toContain('Input alphabet:');
        expect(consoleOutput).toContain('c');
        expect(consoleOutput).toContain('d');
        expect(consoleOutput).toContain('f');
        expect(consoleOutput).toContain('g');
        expect(consoleOutput).toContain('o');
        expect(consoleOutput).toContain('t');
        expect(consoleOutput).toContain('x');
        expect(consoleOutput).toContain('Number of states:');
        expect(consoleOutput).toContain('Number of transitions:');
        expect(consoleOutput).toContain('Transducer output for "dog": <a href="https://en.wikipedia.org/wiki/Dog">dog</a>');
    });

    it('should run example when executed directly', () => {
        const examplePath = path.join(__dirname, '../../examples/from-iterable.js');
        const result = spawnSync('node', [examplePath]);
        const consoleOutput = result.stdout.toString();

        expect(consoleOutput).toContain('Input alphabet:');
        expect(consoleOutput).toContain('c');
        expect(consoleOutput).toContain('d');
        expect(consoleOutput).toContain('f');
        expect(consoleOutput).toContain('g');
        expect(consoleOutput).toContain('o');
        expect(consoleOutput).toContain('t');
        expect(consoleOutput).toContain('x');
        expect(consoleOutput).toContain('Number of states:');
        expect(consoleOutput).toContain('Number of transitions:');
        expect(consoleOutput).toContain('Transducer output for "dog": <a href="https://en.wikipedia.org/wiki/Dog">dog</a>');
    });
});
