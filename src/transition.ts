import { State } from './state.ts';

export class Transition {
    output: string;
    next: State;

    constructor(output: string, next: State) {
        this.output = output;
        this.next = next;
    }
}
