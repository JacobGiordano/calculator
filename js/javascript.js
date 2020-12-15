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

// on click
// 1. On num click, update readout with clicked, concatted string
// 2. On operator click,
  // a. Store current readout string
  // b. Store clicked operator
// 3. On num click, update readout with clicked, concatted string
// 4. On equals — or operator — click, 
  // a. Set readout to result
  // b. Take result of previous operation and use it as "a"
  // c. Store clicked operator
  // d. On num click, update readout with clicked, concatted string
  // e. On equals — or operator click, 
    // a. Set readout to result
    // b. Take result of previous operation and use it as "a"
    // c. Store clicked operator

const evalCalcButton = e => {
  let clickedEl = e.target;
  let clickedValue = clickedEl.getAttribute("data-value");
  if (clickedEl.classList.contains("calc-num-btn")) {
    display += clickedValue;
    readoutEl.value = display;
  }
  if (clickedEl.classList.contains("calc-operation-btn")) {
    if (clickedFunction === undefined && clickedValue !== "=") {
      clickedFunction = clickedValue;
    }
    if (a !== undefined && b === undefined) {
      b = Number(display);
      console.log("b = " + b);
      result = operate(clickedFunction, a, b);
      readoutEl.value = result;
      console.log(`${a} ${clickedFunction} ${b} = ${result}`);
      a = result
      b = undefined;
      display = 0;
      clickedFunction = undefined;
      
    } else if (a === undefined) {
      a = Number(display);
      console.log("a = " + a);
      console.log(`${a} ${clickedFunction} ${b} = ${result}`);
    }
    display = "";
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