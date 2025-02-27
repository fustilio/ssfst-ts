const ssfst = require('../index');

function printTransducerInfo(transducer) {
    console.log(`Input alphabet: ${transducer.inputAlphabet()}`);
    console.log(`Number of states: ${transducer.stateCount()}`);
    console.log(`Number of transitions: ${transducer.transitionCount()}`);
}

function* dictGen() {
    yield { input: 'dog', output: '<a href="https://en.wikipedia.org/wiki/Dog">dog</a>' };
    yield { input: 'fox', output: '<a href="https://en.wikipedia.org/wiki/Fox">fox</a>' };
    yield { input: 'cat', output: '<a href="https://en.wikipedia.org/wiki/Cat">cat</a>' };
}

const runExample = () => {
    const iterableDict = dictGen();

    const transducer = ssfst.init(iterableDict);

    printTransducerInfo(transducer);

    console.log(`Transducer output for "dog": ${transducer.process('dog')}`);
    console.log(`Transducer output for "fox": ${transducer.process('fox')}`);
    console.log(`Transducer output for "cat": ${transducer.process('cat')}`);
    console.log(`Transducer output for "unknown": ${transducer.process('unknown')}`);

};


if (require.main === module) {
    runExample();
}

module.exports.runExample = runExample;
