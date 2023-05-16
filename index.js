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
  const buttonEl = document.createElement("button");
  buttonEl.textContent = text;
  buttonEl.className = className;
  buttonEl.addEventListener("click", (event) => {
    event.preventDefault();
    let pressedButton = event.target.innerText;
    switch (pressedButton) {
      case "AC":
        inputArray = "";
        display.textContent = "0";
        console.log(
          `Pressed button: ${pressedButton}. Input array is: ${inputArray}`
        );
        break;
      case "=":
        if (inputArray === "") { return; } //prettier-ignore
        // inputArray = calculate(inputArray);
        inputArray = evaluateExpression(inputArray);
        display.textContent = inputArray;
        console.log(
          `Pressed button: ${pressedButton}. Input array is: ${inputArray}`
        );
        break;
      default:
        inputArray += pressedButton;
        console.log(
          `Pressed button: ${pressedButton}. Input array is: ${inputArray}`
        );
        display.textContent = inputArray;
        break;
    }
  });

  buttonsContainer.appendChild(buttonEl);
});
function evaluateExpression(str) {
  return Function(`'use strict'; return (${str})`)();
}
