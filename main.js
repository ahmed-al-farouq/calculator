const PREVOPERAND = document.querySelector('[data-prev-operand]');
const NEXTOPERAND = document.querySelector('[data-next-operand]');
const OPERATOROUTPUT = document.querySelector('[data-operator-output]');
const ALLCLEAR = document.querySelector('[data-all-clear]');
const DOT = document.querySelector('[data-dot]');
const DELETE = document.querySelector('[data-delete]');
const NUMS = document.querySelectorAll('[data-number]');
const OPERATORS = document.querySelectorAll('[data-operator]');
const EQUAL = document.querySelector('[data-equals]');

class Calculator {
  constructor(prevOperandContent, nextOperandContent, operatorOutput) {
    this.prevOperandContent = prevOperandContent;
    this.nextOperandContent = nextOperandContent;
    this.operatorOutput = operatorOutput;
    this.clear();
  }

  clear() {
    this.prevOperandContent = '';
    this.nextOperandContent = '';
    this.operatorOutput = undefined;
    return this.operatorOutput;
  }

  delete() {
    if (this.nextOperandContent !== ' ') {
      this.nextOperandContent = this.nextOperandContent.toString().slice(0, this.nextOperandContent.length - 1);
      this.nextOperandContent = this.nextOperandContent.slice(0, this.nextOperandContent.length - 1);
    } else if (this.nextOperandContent === '' && this.operatorOutput !== '') {
      this.operatorOutput = undefined;
    }
  }

  addNum(num) {
    this.nextOperandContent += num;
    return this.nextOperandContent;
  }

  addDot() {
    if (this.nextOperandContent.indexOf('.') === -1) {
      this.nextOperandContent += '.';
    }
  }

  addOperator(operation) {
    if (this.operatorOutput === undefined && this.nextOperandContent !== '') {
      this.operatorOutput = operation;
      this.prevOperandContent = this.nextOperandContent;
      this.nextOperandContent = '';
      return this.nextOperandContent;
    } if (this.operatorOutput !== undefined && this.prevOperandContent !== '' && this.nextOperandContent !== '') { // Call compute Here......
      this.compute();
      this.operatorOutput = operation;
      return this.operatorOutput;
    }
    return this.operatorOutput;
  }

  compute() {
    const prev = parseFloat(this.prevOperandContent, 10);
    const current = parseFloat(this.nextOperandContent, 10);
    switch (this.operatorOutput) {
      case '+':
        this.prevOperandContent = prev + current;
        break;
      case '-':
        this.prevOperandContent = prev - current;
        break;
      case '*':
        this.prevOperandContent = prev * current;
        break;
      case '÷':
        this.prevOperandContent = prev / current;
        break;
      default:
        return 0;
    }
    this.nextOperandContent = '';
    return this.nextOperandContent;
  }

  equal() {
    if (this.nextOperandContent !== '' && this.prevOperandContent !== '') {
      this.compute();
      this.nextOperandContent = this.prevOperandContent;
      this.prevOperandContent = '';
      this.operatorOutput = undefined;
      return this.operatorOutput;
    } if (this.nextOperandContent === '' && this.operatorOutput !== undefined && this.prevOperandContent !== '') {
      this.nextOperandContent = this.prevOperandContent;
      this.prevOperandContent = '';
      this.operatorOutput = undefined;
      return this.nextOperandContent;
    }
    return this.nextOperandContent;
  }
}
const calculator = new Calculator(PREVOPERAND.textContent, NEXTOPERAND.textContent, OPERATOROUTPUT.textContent);
/* Numbers
************************* */
NUMS.forEach((num) => {
  num.addEventListener('click', () => {
    calculator.addNum(num.textContent);
    NEXTOPERAND.textContent = calculator.nextOperandContent;
    PREVOPERAND.textContent = calculator.prevOperandContent;
  });
});

/* AddDot
************************* */
DOT.addEventListener('click', () => {
  calculator.addDot();
  NEXTOPERAND.textContent = calculator.nextOperandContent;
});

/* Operators
************************* */
OPERATORS.forEach((operatorBtn) => {
  operatorBtn.addEventListener('click', () => {
    calculator.addOperator(operatorBtn.textContent);
    OPERATOROUTPUT.textContent = calculator.operatorOutput;
    NEXTOPERAND.textContent = calculator.nextOperandContent;
    PREVOPERAND.textContent = calculator.prevOperandContent;
  });
});

/* Delete
************************* */
DELETE.addEventListener('click', () => {
  calculator.delete();
  NEXTOPERAND.textContent = calculator.nextOperandContent;
  OPERATOROUTPUT.textContent = calculator.operatorOutput;
});

/* DeleteAll
************************* */
ALLCLEAR.addEventListener('click', () => {
  calculator.clear();
  NEXTOPERAND.textContent = calculator.nextOperandContent;
  PREVOPERAND.textContent = calculator.prevOperandContent;
  OPERATOROUTPUT.textContent = calculator.operatorOutput;
});

/* Equal
************************* */
EQUAL.addEventListener('click', () => {
  calculator.equal();
  NEXTOPERAND.textContent = calculator.nextOperandContent;
  PREVOPERAND.textContent = calculator.prevOperandContent;
  OPERATOROUTPUT.textContent = calculator.operatorOutput;
});
