document.addEventListener("DOMContentLoaded", () => {
  var triangleWrapper = document.getElementById("triangle__wrapper");
  var timer = setTimeout(() => {triangleWrapper.classList.add("triangle-spin")}, 5500);
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
  if (isNaN(Number(clickedValue))) {
    if (clickedValue.toLowerCase() === "backspace") {
      display = display.slice(0, -1);
    } else if (clickedValue === ".") {
      if (display === "") {
        display += clickedValue;
      } else {
        let splitDisplay = display.split(".");
        if (splitDisplay.length <= 1) {
          display += clickedValue;
        }
      }
    }
  } else {
    display += clickedValue;
  }
  readoutEl.value = display.slice(0, 12);
}

const positiveNegative = () => {
  if (display === undefined) {
    display = readoutEl.value;
    a = display;
  }
  display = display.includes("-") ? display.replace("-", "") : "-" + display;
  readoutEl.value = display.slice(0, 12);
}

const convertToPercent = () => {
  console.log(`Starting display val = ${display}`);
  if (display === undefined && a !== undefined && b === undefined) {
    display = a;
  }
  if (display !== undefined)  {
    display = (Number(display) * .01).toString();
    console.log(display);
    readoutEl.value = display.slice(0, 12);
  }
  console.log(`Ending display val = ${display}`);
}

const newTapeLine = tapeLineData => {
  let newText = document.createTextNode(tapeLineData);
  let newLine = document.createElement("span");
  newLine.classList.add("tape-line");
  newLine.appendChild(newText);
  tapeEl.appendChild(newLine);
  tapeEl.scrollTop = tapeEl.scrollHeight;
}

const firstOperation = () => {
  console.log("a === undefined || a === ''");
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
      readoutEl.value = "No can do";
      return;
    }
    console.log("b === undefined");
    console.log(`a = ${a}; b = ${b}`);
    result = operate(clickedFunction, a, b);
    console.log(`${a} ${clickedFunction} ${b} = ${result}`);
    readoutEl.value = result.toString().slice(0, 12);
    newTapeLine(`${a} ${clickedFunction} ${b} = ${result.toString().slice(0, 12)}`);
    display = undefined;
    a = result;
    b = undefined;
  }
}

const returnFinalResult = () => {
  console.log("clicked equals");
  b = Number(display);
  if (b === 0 && clickedFunction === "/") {
    readoutEl.value = "No can do";
    return;
  }
  console.log(`a = ${a}; b = ${b}`);
  if (!isNaN(a) && !isNaN(b) && a !== undefined && b !== undefined) {
    result = operate(clickedFunction, a, b);
    console.log(`${a} ${clickedFunction} ${b} = ${result}`);
    display = result.toString().slice(0, 12);
    readoutEl.value = display;
    newTapeLine(`${a} ${clickedFunction} ${b} = ${result.toString().slice(0, 12)}`);
    a = result;
    b = undefined;
  } else if (isNaN(a) && !isNaN(b)) {
    a = b;
    b = undefined;
  } else if (isNaN(a)) {
    a = undefined;
  } else if (isNaN(b)) {
    b = undefined;
  }
  display = undefined;
}

const evalKeyPressed = e => {
  // console.log(e.key);
  let pressed;

  if (e.key === "Enter") {
    pressed = document.body.querySelector(`.calc-btn[data-value="="]`);
  } else if (e.key === "*") {
    pressed = document.body.querySelector(`.calc-btn[data-value="x"]`);
  } else if (e.key === "c") {
    pressed = document.body.querySelector(`.calc-btn[data-value="clear"]`);
  } else if (e.key === "%") {
    pressed = document.body.querySelector(`.calc-btn[data-value="percent"]`);
  } else if (e.key === "p" || e.key === "n") {
    pressed = document.body.querySelector(`.calc-btn[data-value="positive, negative"]`);
  } else if (e.key === "Backspace" || e.key === ".") {
    updateDisplay(e.key);
  } else {
    pressed = document.body.querySelector(`.calc-btn[data-value="${e.key}"]`);
  }
  // console.log(pressed);
  return pressed;
}

const evalCalcButton = e => {
  evalToggleClick(e);
  let clickedEl;
  let keyPress = evalKeyPressed(e);
  
  if (keyPress) {
    clickedEl = keyPress;
    // console.log(clicked);
  } else {
    clickedEl = e.target;
  }

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
    } else if (clickedValue === ".") {
      updateDisplay(clickedValue);
    }
  }
  if (clickedEl.classList.contains("calc-operation-btn")) {
    if (clickedValue !== "=") {
      if (a === undefined || a === "") {
        firstOperation();
      } else if (a !== undefined) {
        secondOperation();
      }
      clickedFunction = clickedValue;
      // console.log(`clickedFunction = ${clickedFunction}`);
    } else if (clickedValue === "=") {
      returnFinalResult();
    }
  }
}

const evalToggleClick = e => {
  let clickedToggleParent = e.target.closest(".toggle__wrapper");
  if (clickedToggleParent === null) {
    return;
  } else {
    let toggleBtn = clickedToggleParent.querySelectorAll(".toggle__btn")[0];
    if (toggleBtn.classList.contains("on")) {
      toggleBtn.classList.remove("on");
      toggleBtn.classList.add("off");
    } else {
      toggleBtn.classList.remove("off");
      toggleBtn.classList.add("on");
    }
    if (clickedToggleParent.classList.contains("grid-animation-toggle__wrapper")) {
      let bgGrids = Array.from(document.getElementsByClassName("bg-grid"));
      if (toggleBtn.classList.contains("off")) {
        bgGrids.forEach(element => element.classList.remove("move-grid"));
      } else {
        bgGrids.forEach(element => element.classList.add("move-grid"));
      }
    } else if (clickedToggleParent.classList.contains("triangle-animation-toggle__wrapper")) {
      let triangleWrapper = document.getElementById("triangle__wrapper");
      if (triangleWrapper.classList.contains("triangle-spin")) {
        triangleWrapper.classList.remove("triangle-spin");
      } else {
        triangleWrapper.classList.add("triangle-spin");
      }
    } else if (clickedToggleParent.classList.contains("tape-visibility-toggle__wrapper")) {
      let calcWrapper = document.getElementById("calc__wrapper");
      if (calcWrapper.classList.contains("show-tape")) {
        calcWrapper.classList.add("hide-tape")
        calcWrapper.classList.remove("show-tape");
      } else {
        calcWrapper.classList.add("show-tape");
        calcWrapper.classList.remove("hide-tape")
      }
    }
  }
}

document.addEventListener("click", evalCalcButton, false);
document.addEventListener("keyup", evalCalcButton, false);