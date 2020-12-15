document.addEventListener("DOMContentLoaded", () => {
  var triangleWrapper = document.getElementById("triangle__wrapper");
  var timer = setTimeout(() => {triangleWrapper.classList.remove("fade-in")}, 4000);
  timer;
});

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (operator, a, b) => {
  switch (true) {
    case (operator === "+" ):
      return add(a, b);
    case (operator === "-" ):
      return subtract(a, b);
    case (operator === "x" ):
      return multiply(a, b);
    case (operator === "/" ):
      return divide(a, b);
    default:
      result;
  }
}

let a;
let b;
let display = "";
let result;
let clickedFunction;
const readoutEl = document.getElementById("calc-read-out");
const tapeEl = document.getElementById("calc-tape");

const evalCalcButton = e => {
  let clickedEl = e.target;
  let clickedValue = clickedEl.getAttribute("data-value");
  if (clickedEl.classList.contains("calc-num-btn")) {
    display += clickedValue;
    readoutEl.value = display;
  }
  if (clickedEl.classList.contains("calc-operation-btn")) {
    if (a !== undefined && b === undefined) {
      b = Number(display);
      console.log("b = " + b);
      result = operate(clickedFunction, a, b);
      readoutEl.value = result;
      console.log(`${a} ${clickedFunction} ${b} = ${result}`);
      a = result
      b = undefined;
      display = 0;
    } else if (a === undefined) {
      a = Number(display);
      console.log("a = " + a);
      console.log(`${a} ${clickedFunction} ${b} = ${result}`);
    }
    display = "";
    if (clickedValue !== "=") {
      clickedFunction = clickedValue;
    }
  }
  if (clickedValue === "clear") {
    a = undefined;
    b = undefined;
    clickedFunction = undefined;
    result = undefined;
    display = "";
    readoutEl.value = "";
  }
}

document.addEventListener("click", evalCalcButton, false);
document.addEventListener("keyup", evalCalcButton, false);