const buttons = [
  { text: "AC", className: "btn-clear" },
  { text: "√", className: "btn-operation" },
  { text: "x²", className: "btn-operation" },
  { text: "%", className: "btn-operation" },
  { text: "7", className: "btn-number" },
  { text: "8", className: "btn-number" },
  { text: "9", className: "btn-number" },
  { text: "/", className: "btn-operation" },
  { text: "4", className: "btn-number" },
  { text: "5", className: "btn-number" },
  { text: "6", className: "btn-number" },
  { text: "*", className: "btn-operation" },
  { text: "1", className: "btn-number" },
  { text: "2", className: "btn-number" },
  { text: "3", className: "btn-number" },
  { text: "-", className: "btn-operation" },
  { text: "0", className: "btn-number" },
  { text: ".", className: "btn-number" },
  { text: "=", className: "btn-equals" },
  { text: "+", className: "btn-operation" },
];

const buttonsContainer = document.querySelector(".buttons-container");
const display = document.querySelector(".display");

let inputArray = "";

buttons.forEach(({ text, className }) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = text;
  buttonElement.className = className;
  buttonElement.addEventListener("click", handleButtonClick);
  buttonsContainer.appendChild(buttonElement);
});

function handleButtonClick(event) {
  event.preventDefault();

  const pressedButton = event.target.innerText;
  switch (pressedButton) {
    case "AC":
      handleACButton();
      break;
    case "=":
      handleEqualsButton();
      break;
    case "x²":
      handleSquareButton();
      break;
    case "√":
      handleRootButton();
      break;
    case "%":
      handlePercentageButton();
      break;
    default:
      handleNumberButton(pressedButton);
      break;
  }
}

function handleNumberButton(pressedButton) {
  inputArray += pressedButton;
  updateDisplay();
}

function handlePercentageButton() {
  inputArray += "/100*";
  updateDisplay();
}

function handleACButton() {
  display.textContent = "0";
  inputArray = "";
}

function handleSquareButton() {
  inputArray += "**2";
  handleEqualsButton();
}

function handleRootButton() {
  const regex = /-/g;
  const matches = inputArray.match(regex);

  if (matches && matches.includes("-")) {
    inputArray = "ERROR";
  } else {
    inputArray += "**(1/2)";
  }

  updateDisplay();
  handleEqualsButton();
}

function handleEqualsButton() {
  if (inputArray === "") return;
  const result = evaluateExpression(inputArray);
  inputArray = result.toString(); // Assign the evaluated result back to inputArray
  updateDisplay();
}

function updateDisplay() {
  if (inputArray.includes("/100*")) {
    display.textContent = inputArray.replace("/100*", "%");
  } else {
    display.textContent = inputArray;
  }
}

function evaluateExpression(str) {
  return Function(`'use strict'; return (${str})`)();
}
