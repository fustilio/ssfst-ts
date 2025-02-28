import { State } from './state.ts';
import { InputEntry, Transducer } from './types.ts';


interface InternalTransducer {
    inputAlphabet: Set<string>;
    startState: State;
    numberOfStates: number;
}

export const init = (iterableDict: Iterable<InputEntry>): Transducer => {
    if (!iterableDict) {
        throw new Error('The input dictionary should be defined.');
    }

    const transducer = createEmptyTransducer();
    constructTrie(transducer, iterableDict);
    performCanonicalLmlsExtension(transducer);

    return apiOf(transducer);
};

export const initAsync = async (asyncIterableDict: AsyncIterable<InputEntry>): Promise<Transducer> => {
    if (!asyncIterableDict) {
        throw new Error('The input dictionary should be defined.');
    }

    const transducer = createEmptyTransducer();
    await constructTrieAsync(transducer, asyncIterableDict);
    performCanonicalLmlsExtension(transducer);

    return apiOf(transducer);
};

function createEmptyTransducer(): InternalTransducer {
    return {
        inputAlphabet: new Set<string>(),
        startState: new State(),
        numberOfStates: 1,

    };
}

function apiOf(transducer: InternalTransducer): Transducer {
    return {
        inputAlphabet: () => [...transducer.inputAlphabet],
        stateCount: () => transducer.numberOfStates,
        transitionCount: () => transducer.numberOfStates * transducer.inputAlphabet.size,
        process: (word: string) => process(transducer, word)
    };
}

function process(transducer: InternalTransducer, word: string): string {
    let output = '';
    let state = transducer.startState;

    for (let symbol of word) {
        const transition = state.processTransition(symbol);

        if (transition) {
            output += transition.output;
            state = transition.next;
        }
        // In case an unknown symbol is read
        else {
            output += (state.output + symbol);
            state = transducer.startState;
        }
    }

    return output + state.output;
}


function constructTrie(transducer: InternalTransducer, iterableInputDict: Iterable<InputEntry>): void {
    for (const entry of iterableInputDict) {
        addTrieEntry(transducer, entry);
    }
}

async function constructTrieAsync(transducer: InternalTransducer, asyncIterableInputDict: AsyncIterable<InputEntry>): Promise<void> {
    for await (const entry of asyncIterableInputDict) {
        addTrieEntry(transducer, entry);
    }
}

function addTrieEntry(trie: InternalTransducer, entry: InputEntry): void {
    let state = trie.startState;

    for (let symbol of entry.input) {
        const transition = state.processTransition(symbol);

        if (transition) {
            state = transition.next;
        } else {
            const newState = new State();
            state.setTransition(newState, symbol);
            state = newState;

            trie.inputAlphabet.add(symbol);
            trie.numberOfStates++;
        }
    }

    state.isFinal = true;
    state.output = entry.output;
}

function performCanonicalLmlsExtension(transducer: InternalTransducer): void {
    const queue: { state: State; prev: State; output: string; }[] = [];
    transducer.startState.isFinal = true;
    transducer.startState.output = '';

    for (let symbol of transducer.inputAlphabet) {
        const transition = transducer.startState.processTransition(symbol);

        if (!transition) {
            transducer.startState.setTransition(transducer.startState, symbol, symbol);
        } else {
            queue.push({
                state: transition.next,
                prev: transducer.startState,
                output: transition.next.isFinal ? transition.next.output : symbol
            });
        }
    }

    while (queue.length) {
        complementState(transducer, queue.shift()!, queue);
    }
}

function complementState(transducer: InternalTransducer, triple: { state: State, prev: State, output: string }, queue: { state: State, prev: State, output: string }[]): void {
    const { state, prev, output } = triple;

    for (const symbol of transducer.inputAlphabet) {
        const transition = state.processTransition(symbol);
        const prevTransition = prev.processTransition(symbol);

        if (!transition) {
            if (prevTransition && prevTransition.next) {
                state.setTransition(prevTransition.next, symbol, output + prevTransition.output);
            }
        } else {
            if (transition.next.isFinal) {
                queue.push({
                    state: transition.next,
                    prev: transducer.startState,
                    output: transition.next.output
                });
            } else {
                if (prevTransition && prevTransition.next) {
                    queue.push({
                        state: transition.next,
                        prev: prevTransition.next,
                        output: output + prevTransition.output
                    });
                }
            }
        }
    }

    state.isFinal = true;
    state.output = output + prev.output;
}
