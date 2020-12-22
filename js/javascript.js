document.addEventListener("DOMContentLoaded", () => {
  var triangleWrapper = document.getElementById("triangle__wrapper");
  var timer = setTimeout(() => {triangleWrapper.classList.remove("fade-in")}, 5500);
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
const calculator = document.getElementById("calc-body");
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

const updateDisplay = (clickedValue) => {
  if (display === undefined){
    display = "";
  }
  display += clickedValue;
  readoutEl.value = display;
}

const positiveNegative = () => {
  display = display.includes("-") ? display.replace("-", "") : "-" + display;
  readoutEl.value = display;
}

const convertToPercent = () => {
  display = (Number(display) * .01).toString();
  console.log(display);
  readoutEl.value = display;
}

const firstOperation = () => {
  console.log("a === undefined");
  a = Number(display);
  console.log(`a = ${a}`);
  display = undefined;
}

const secondOperation = () => {
  console.log(`a !== undefined; a = ${a}`);
  console.log(`${a} ${clickedFunction} ${b} = ${result}`);
  if (display !== "" && display !== undefined && !isNaN(display)) {
    b = Number(display);
    if (b === 0 && clickedFunction === "/") {
      readoutEl.value = "No, no, no."
      return;
    }
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

const returnFinalResult = () => {
  console.log("clicked equals");
  b = Number(display);
  if (b === 0 && clickedFunction === "/") {
    readoutEl.value = "No, no, no."
    return;
  }
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

const evalKeyPressed = e => {
  console.log(e.key);
  let pressed = document.body.querySelector(`.calc-btn[data-value="${e.key}"]`);
  console.log(pressed);
  // pressed.click();
}

const evalCalcButton = e => {
  evalKeyPressed(e);
  
  let clickedEl = e.target;
  let clickedValue = clickedEl.getAttribute("data-value");

  if (clickedEl.classList.contains("calc-num-btn")) {
    updateDisplay(clickedValue);
  }
  if (clickedEl.classList.contains("calc-function-btn")) {
    if (clickedValue === "clear") {
      clearValues();
    } else if (clickedValue === "positive, negative") {
      positiveNegative();
    } else if (clickedValue === "percent") {
      convertToPercent();
    }
  }
  if (clickedEl.classList.contains("calc-operation-btn")) {
    if (clickedValue !== "=") {
      if (a === undefined) {
        firstOperation();
      } else if (a !== undefined) {
        secondOperation();
      }
      clickedFunction = clickedValue;
      console.log(`clickedFunction = ${clickedFunction}`);
    } else if (clickedValue === "=") {
      returnFinalResult();
    }
  }
}

document.addEventListener("click", evalCalcButton, false);
document.addEventListener("keyup", evalKeyPressed, false);