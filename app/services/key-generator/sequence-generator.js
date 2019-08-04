const Stack = require('../../utilities/stack');

class SequenceGenerator {
    constructor() {
        this.initialTerm = 'AAAA';
        this.mainStack = new Stack();
        this.temporaryStack = new Stack();
        this.characterSet = {
            A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9, K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19, U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25,
            a: 26, b: 27, c: 28, d: 29, e: 30, f: 31, g: 32, h: 33, i: 34, j: 35, k: 36, l: 37, m: 38, n: 39, o: 40, p: 41, q: 42, r: 43, s: 44, t: 45, u: 46, v: 47, w: 48, x: 49, y: 50, z: 51,
            0: 52, 1: 53, 2: 54, 3: 55, 4: 56, 5: 57, 6: 58, 7: 59, 8: 60, 9: 61
        };
    }

    generateSequence(lastTerm = 'AAAA', termsCount = 10000) {
        this.convertTermToStackValue(lastTerm);
        let currentTermCount = 0;
        while (currentTermCount < termsCount) {
            this.generateTerm();
            if (this.isTermValid() === true) {
                let term = this.convertStackValueToTerm();
                this.saveTerm(term);//async function
                currentTermCount++;
            }
        }
    }

    convertTermToStackValue(term) {
        const stackValue = term.split('');
        for (let i = 0; i < stackValue.length; i++) {
            this.mainStack.push(this.characterSet[stackValue[i]]);
        }
        if (term === this.initialTerm)
            this.saveTerm(term);
    }

    generateTerm() {
        let incrementNextDigit = true;
        do {
            let stackFrameDigit;
            try {
                stackFrameDigit = this.mainStack.pop();
            } catch (err) {
                incrementNextDigit = false;
                this.temporaryStack.push(this.characterSet.A);
                break;
            }
            if (stackFrameDigit !== ((Object.keys(this.characterSet).length) - 1)) {
                incrementNextDigit = false;
                stackFrameDigit++;
                this.temporaryStack.push(stackFrameDigit);
            } else {
                stackFrameDigit = 0;
                this.temporaryStack.push(stackFrameDigit);
            }
        } while (incrementNextDigit === true);
        for (let i = this.temporaryStack.getStack().length - 1; i >= 0; i--) {
            let element = this.temporaryStack.pop();
            this.mainStack.push(element);
        }
    }

    isTermValid() {
        const stack = this.mainStack.getStack();
        for (let i = 0; i < stack.length; i++) {
            if (stack[i] <= 25)
                return true;
        }
        return false;
    }

    convertStackValueToTerm() {
        const mainStack = this.mainStack.getStack();
        let term = '';
        const mainStackLength = mainStack.length;
        let convertedDigitCount = 0;
        charSetLoop: for (let i = 0; i < mainStackLength; i++) {
            digitLoop: for (let key in this.characterSet) {
                if (mainStack[i] === this.characterSet[key]) {
                    term += key;
                    convertedDigitCount++;
                }
                if (convertedDigitCount === mainStackLength)
                    break charSetLoop;
            }
        }
        return term;
    }

    saveTerm(term) {
        console.log(term);
        return true;
    }
}

module.exports = SequenceGenerator;