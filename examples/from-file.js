const fs = require('fs');
const readline = require('readline');
const ssfst = require('../index');

async function* readLinesGen() {
    const lineReader = readline.createInterface({ 
        input: fs.createReadStream('./dict.txt')
    });

    for await (const line of lineReader) {
        const [input, output] = line.split(',');
        yield { input, output };
    }
}

(async () => {
    const transducer = await ssfst.initAsync(readLinesGen());
    printTransducerInfo(transducer);

    readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }).on('line', text => console.log(transducer.process(text)));
})();

function printTransducerInfo(transducer) {
    console.log(`Input alphabet: ${transducer.inputAlphabet()}`);
    console.log(`Number of states: ${transducer.stateCount()}`);
    console.log(`Number of transitions: ${transducer.transitionCount()}`);
}