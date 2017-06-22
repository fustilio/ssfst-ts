'use strict';

const SSFST = require('./ssfst/ssfst');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    const alphabet = ['a', 'b', 'c'];

    const dict = [
        { input: 'ab', output: 'xx' },
        { input: 'abc', output: 'xyy' },
        { input: 'bab', output: 'yyx' },
        { input: 'babc', output: 'yyyy' },
        { input: 'bbb', output: 'yyz' },
        { input: 'bbbc', output: 'yzz' }
    ];

    const transducer = new SSFST(alphabet, dict);
    console.info(`Transducer constructed. \r\nInput alphabet: ${alphabet}`);


    rl.on('line', (input) => {
        console.log(transducer.process(input));
    });
}

main();
