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
let display;
let result;
let clickedFunction;
const readoutEl = document.getElementById("calc-read-out");
const tapeEl = document.getElementById("calc-tape");

const clearValues = () => {
  a = undefined;
  b = undefined;
  clickedFunction = undefined;
  result = undefined;
  display = "";
  readoutEl.value = "";
}

const evalCalcButton = e => {
  let clickedEl = e.target;
  let clickedValue = clickedEl.getAttribute("data-value");

  if (clickedEl.classList.contains("calc-num-btn")) {
    if (display === undefined){
      display = "";
    }
    display += clickedValue;
    readoutEl.value = display;
  }

  if (clickedEl.classList.contains("calc-operation-btn")) {
    if (clickedValue === "clear") {
      clearValues();
    } else if (clickedValue !== "=") {
      if (a === undefined) {
        console.log("a === undefined");
        a = Number(display);
        console.log(`a = ${a}`);
        display = undefined;
      } else if (a !== undefined) {
        console.log(`a !== undefined; a = ${a}`);
        console.log(`${a} ${clickedFunction} ${b} = ${result}`);
        if (display !== "" && display !== undefined && !isNaN(display)) {
          b = Number(display);
          console.log("b === undefined");
          console.log(`a = ${a}; b = ${b}`);
          result = operate(clickedFunction, a, b);
          console.log(`${a} ${clickedFunction} ${b} = ${result}`);
          readoutEl.value = result;
          display = undefined;
          a = result;
          b = undefined;
        }
      }
      clickedFunction = clickedValue;
      console.log(`clickedFunction = ${clickedFunction}`);
    } else if (clickedValue === "=") {
      console.log("clicked equals");
      b = Number(display);
      console.log(`a = ${a}; b = ${b}`);
      if (!isNaN(a) && !isNaN(b)) {
        result = operate(clickedFunction, a, b);
        console.log(`${a} ${clickedFunction} ${b} = ${result}`);
        display = result;
        readoutEl.value = display;
        a = result;
        b = undefined;
      }
      display = undefined;
    }
  }
}

document.addEventListener("click", evalCalcButton, false);
document.addEventListener("keyup", evalCalcButton, false);