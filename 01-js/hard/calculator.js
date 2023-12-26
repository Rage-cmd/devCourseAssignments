/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

// function isNumber(str) {
//   let asciiVal = str - '0';
//   console.log("[debug] isNumber", str, asciiVal)
//   return asciiVal >= 0 && asciiVal <= 9;
// }

function isNumber(str) {
  if(str == ".") return true;
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function isOperator(str) {
  return str == "(" || str == ")" || str == "+" || str == "-" || str == "/" || str == "*"
}

class Calculator {

  constructor() {
    this.result = 0;
    this.precedence = {
      "*": 2,
      "/": 2,
      "+": 1,
      "-": 1
    }
    this.operators = [];
    this.operands = [];
  }

  add(x) {
    this.result = this.result + x;
  }

  subtract(x) {
    this.result = this.result - x;
  }

  multiply(x) {
    this.result = this.result * x;
  }

  divide(x) {
    if(x == 0) {
      throw new Error("Can't divide by 0");
    }
    this.result = this.result / x;
  }

  clear(x) {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  hasLowerPrecedenceThanTop(str) {
    return this.precedence[this.operators[this.operators.length - 1]] >= this.precedence[str];
  }

  peekStack(stk) {
    return stk[stk.length - 1];
  }

  popAndPush() {
    let B = this.operands.pop();
    let A = this.operands.pop();

    let operator = this.operators.pop();

    if (operator == "+") {
      this.operands.push(A + B);
    }

    if (operator == "-") {
      this.operands.push(A - B);
    }

    if (operator == "*") {
      this.operands.push(A * B);
    }

    if (operator == "/") {
      if(B == 0) {
      throw new Error("Can't divide by 0");
      }
      this.operands.push(A / B);
    }
  }

  calculate(str) {

    // console.log(this.operands, this.operators);

    for (let i = 0; i < str.length; ++i) {
      // console.log(`Stack of the iteration ${i}`, str[i])
      // console.log(this.operands, this.operators);
      
      if (isNumber(str[i])) {

        let currNum = "";
        while (isNumber(str[i])) {
          currNum += str[i];
          i++;
        }
        --i;
        // console.log(currNum, i);
        this.operands.push(parseFloat(currNum));

      } else if (isOperator(str[i])) {
        if (str[i] == "(") {
          this.operators.push(str[i]);
          continue;
        }

        if (str[i] == ")") {
          console.log("Closing bracket observerd!")
          console.log(this.operands, this.operators);
          while (this.operators.length > 0 && this.peekStack(this.operators) != "(") {
            this.popAndPush();
          }
          if (this.operators.length > 0 && this.peekStack(this.operators) == "(") {
            console.log("Popping the opening bracket...");
            this.operators.pop();
          } else {
            throw new Error("CHECK EQUATION");
          }
          // console.log("Stacks after ( is popped")

          continue;
        }

        while (this.operators.length > 0 && this.hasLowerPrecedenceThanTop(str[i])) {
          // console.log("Came to the precedence thing")
          this.popAndPush();
        }
        // console.log(str[i])
        this.operators.push(str[i]);

        // console.log(this.operands, this.operators);

      } else if (str[i] != " ") {
        throw new Error("NOT A VALID INPUT");
      }
    }

    while (this.operators.length > 0) {
      // console.log("inside last loop")
      if(this.peekStack(this.operators) == "(" || this.peekStack(this.operators) == "(") {
        throw new Error("Not correct expression!");
      }
      this.popAndPush();
    }

    // console.log(this.operands, this.operators);


    this.result = this.operands.pop();
    return this.result;
  }
}

let calc = new Calculator();
// calc.add(5);
// calc.subtract(2);
// console.log(calc.calculate('(2 + 3) * 3'));
// console.log(calc.calculate('10 + 2) + 3'));

module.exports = Calculator;