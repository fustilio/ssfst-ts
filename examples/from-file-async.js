const ssfst = require('../index');
const fs = require('fs');
const readline = require('readline');

function printTransducerInfo(transducer) {
    console.log(`Input alphabet: ${transducer.inputAlphabet()}`);
    console.log(`Number of states: ${transducer.stateCount()}`);
    console.log(`Number of transitions: ${transducer.transitionCount()}`);
}

async function* readLinesGenAsync() {
    const lineReader = readline.createInterface({
        input: fs.createReadStream(__dirname + '/capitals.txt')
    });

    for await (const line of lineReader) {
        const [input, output] = line.split(',');
        yield { input, output };
    }
}

const runExample = async () => {
    const asyncIterableDict = readLinesGenAsync();

    const transducer = await ssfst.initAsync(asyncIterableDict);

    printTransducerInfo(transducer);

    console.log(`Transducer output for "Amsterdam": ${transducer.process('Amsterdam')}`);
    console.log(`Transducer output for "Paris": ${transducer.process('Paris')}`);
    console.log(`Transducer output for "Canberra": ${transducer.process('Canberra')}`);
    console.log(`Transducer output for "unknown": ${transducer.process('unknown')}`);
};


if (require.main === module) {
    runExample();
}

module.exports.runExample = runExample;
