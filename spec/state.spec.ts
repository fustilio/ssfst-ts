import { describe, expect, it } from 'vitest';
import { State } from '../src/state.ts';

describe('SSFST State Tests', () => {
    it('Invoking the constructor should create an instance', () => {
        expect(new State()).toBeInstanceOf(State);
    });

    it('Should have "isFinal" property set to false after invoking the constructor, without providing arguments.', () => {
        expect(new State().isFinal).toBe(false);
    });

    it('Should have "isFinal" property set to true after invoking the constructor, by providing it with an argument of "true".', () => {
        expect(new State(true).isFinal).toBe(true);
    });

    it('Should have "output" property set to "abc" after invoking the constructor, by providing it with an arguments of "true" and "abc".', () => {
        expect(new State(true, 'abc').output).toBe('abc');
    });

    it('Should return an instance with a defined "transitions" property with size of 0 after Invoking the constructor, without providing arguments.', () => {
        expect(new State().transitions.size).toBe(0);
    });

    it('Should return an instance with a defined "output" property with value of "" after invoking the constructor, without providing arguments', () => {
        expect(new State().output).toBe('');
    });

    it('Should add a transition when "setTransition" is invoked with valid arguments.', () => {
        const state1 = new State();
        const state2 = new State();
        state1.setTransition(state2, 'a', '1');
        expect(state1.transitions.get('a')?.next).toBe(state2);
        expect(state1.transitions.get('a')?.output).toBe('1');
    });
});
