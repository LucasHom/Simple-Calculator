const calculator = {
  displayValue:"0",
  firstOperand:null,
  waitingForSecondOperand:false,
  operator:null,
}

function updateDisplay() {
  //Select the element with the class of calculator-screen
  const calcScreen = document.querySelector(".calculator-screen");
  //Update the value of the element with the content of displayValue
  calcScreen.value = calculator.displayValue;
}

updateDisplay();

const allKeys = document.querySelector(".calculator-keys");
allKeys.addEventListener("click", (event)=>{
  //Access the clicked element
  const {target} = event;
  //const target = event.target

  const {value} = target;
  //const value = target.value

  //Check if the clicked element is a button, if not, exit from the function
  if (!target.matches("button")) {
    return
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      clear();
      break;
    default:
         // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigits(value);
      }
    
    }
      updateDisplay();
}
                        )

function inputDigits(digit) {
  const {displayValue, waitingForSecondOperand} = calculator;
  //overwrite displayValue if current value is 0, otherwise, append digit to it
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } 
  else {
    calculator.displayValue = (displayValue === "0" ? digit : displayValue+digit);
  }
  
  console.log(calculator);
}

function inputDecimal(decimal) {
  //if the displayvalue property does not contain a decimal point --> 
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return
  }
  if (!calculator.displayValue.includes(decimal)) {
      //then append the decimal point
      calculator.displayValue += decimal;
  } 
}

//ensure floating point precision 0.1 + 0.2 = 0.3 not 0.3000000000004
function handleOperator(nextOperator) {
  // Destructure the required properties  on the calculator object
  const {displayValue, operator, firstOperand} = calculator;
  // `parseFloat` converts the string contents of `displayValue`
  // to a floating-point number
  const inputVal = parseFloat(displayValue);
  // verify that `firstOperand` is null and that the `inputValue`
  // is not a `NaN` value
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return
  } 
  if (firstOperand === null && !isNaN(inputVal)) {
     // Update the firstOperand property in the calculator object
    calculator.firstOperand=inputVal;
  }
  else if (operator) {
    const result = calculate(firstOperand, inputVal, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(11))}`;
    //console.log(`${parseFloat(result.toFixed(7))}`);
    calculator.firstOperand = result;
  }
  //update the operator and the waitingForSecondOperand property values
  calculator.operator = nextOperator;
  calculator.waitingForSecondOperand = true;
  
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  }
  else if (operator === "-") {
    return firstOperand - secondOperand;
  }
  else if (operator === "*") {
    return firstOperand * secondOperand;
  }
  else if (operator === "/") {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

function clear() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}