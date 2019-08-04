class Stack {
    constructor() {
        this.tos = -1;
        this.container = [];
    }

    push(element) {
        this.container.push(element);
        this.tos++;
    }

    pop() {
        if (this.isEmpty())
            throw new Error('Stack Underflow Error');
        let element = this.container.pop();
        this.tos--;
        return element;
    }

    isEmpty() {
        if (this.tos === -1)
            return true;
        else
            return false;
    }

    getStack() {
        return this.container;
    }

}

module.exports = Stack;