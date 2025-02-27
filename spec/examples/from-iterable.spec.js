const exampleFromIterable = require('../../examples/from-iterable');

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
});
