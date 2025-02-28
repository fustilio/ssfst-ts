export interface InputEntry {
    input: string;
    output: string;
}

export interface Transducer {
    inputAlphabet(): Array<string>;
    stateCount(): number;
    transitionCount(): number;
    process(word: string): string;
}

