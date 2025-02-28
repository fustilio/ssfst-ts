import { Transition } from './transition.ts';

export class State {
    isFinal: boolean;
    output: string;
    transitions: Map<string, Transition>;

    constructor(isFinal: boolean = false, output: string = '') {
        this.isFinal = isFinal;
        this.output = output;
        this.transitions = new Map<string, Transition>();
    }

    setTransition(nextState: State, input: string, output: string = ''): void {
        this.transitions.set(input, new Transition(output, nextState));
    }

    processTransition(input: string): Transition | undefined {
        return this.transitions.get(input);
    }
}
