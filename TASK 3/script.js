const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

let currentInput = '';
let operator = '';
let firstNumber = '';
let secondNumber = '';
let resultDisplayed = false;

//It Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    // If it's an operator then
    if (['+', '-', '*', '/'].includes(value)) {
      if (firstNumber && currentInput && !resultDisplayed) {
        secondNumber = currentInput;
        calculate();
      }
      operator = value;
      firstNumber = currentInput || firstNumber;
      currentInput = '';
    }

    // It Clears the input
    else if (button.id === 'clear') {
      currentInput = '';
      operator = '';
      firstNumber = '';
      secondNumber = '';
      display.textContent = '0';
    }

    // Equals button
    else if (button.id === 'equals') {
      if (firstNumber && currentInput && operator) {
        secondNumber = currentInput;
        calculate();
      }
    }

    // gives the Numbers or dot
    else {
      if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
      }
      if (!(value === '.' && currentInput.includes('.'))) {
        currentInput += value;
        display.textContent = currentInput;
      }
    }
  });
});

// Performs calculation
function calculate() {
  let result = 0;
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num2 === 0 ? 'Error' : num1 / num2;
      break;
  }

  display.textContent = result;
  firstNumber = result.toString();
  currentInput = '';
  resultDisplayed = true;
}