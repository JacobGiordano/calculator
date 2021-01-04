document.addEventListener("DOMContentLoaded", () => {
  let triangleWrapper = document.getElementById("triangle__wrapper");
  let triangleTimer = setTimeout(() => {
    triangleWrapper.classList.remove("fade-delay--1");
    triangleWrapper.classList.add("triangle-spin");
  }, 5500);
  triangleTimer;
  document.querySelector('.calc-body').focus();
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
    if (clickedValue.toLowerCase() === "backspace" || clickedValue.toLowerCase() === "delete") {
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
  if (display === undefined && a !== undefined && b === undefined) {
    display = a;
  }
  if (display !== undefined)  {
    display = (Number(display) * .01).toString();
    readoutEl.value = display.slice(0, 12);
  }
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
  a = Number(display);
  display = undefined;
}

const secondOperation = () => {
  if (display !== "" && display !== undefined && !isNaN(display)) {
    b = Number(display);
    if (b === 0 && clickedFunction === "/") {
      readoutEl.value = "No can do";
      return;
    }
    result = operate(clickedFunction, a, b);
    readoutEl.value = result.toString().slice(0, 12);
    newTapeLine(`${a} ${clickedFunction} ${b} = ${result.toString().slice(0, 12)}`);
    display = undefined;
    a = result;
    b = undefined;
  }
}

const returnFinalResult = () => {
  b = Number(display);
  if (b === 0 && clickedFunction === "/") {
    readoutEl.value = "No can do";
    return;
  }
  if (!isNaN(a) && !isNaN(b) && a !== undefined && b !== undefined) {
    result = operate(clickedFunction, a, b);
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
  let pressed;

  if (e.key === "Tab") {
    return false;
  } else if (e.key === "Enter") {
    pressed = document.body.querySelector(`.calc-btn[data-value="="]`);
  } else if (e.key === "*") {
    pressed = document.body.querySelector(`.calc-btn[data-value="x"]`);
  } else if (e.key === "c") {
    pressed = document.body.querySelector(`.calc-btn[data-value="clear"]`);
  } else if (e.key === "%") {
    pressed = document.body.querySelector(`.calc-btn[data-value="percent"]`);
  } else if (e.key === "p" || e.key === "n") {
    pressed = document.body.querySelector(`.calc-btn[data-value="positive, negative"]`);
  } else if (e.key === "Backspace" || e.key === "Delete") {
    updateDisplay(e.key);
    pressed = document.getElementById("calc-read-out");
  } else if (e.key === ".") {
    updateDisplay(e.key);
    pressed = document.body.querySelector(`.calc-btn[data-value="${e.key}"]`);
  } else if (e.key === "m") {
    document.getElementById("nav-btn").click();
  } else if (e.key === "t") {
    document.querySelector(".tape-visibility-toggle__wrapper").click();
  } else if (e.key === "h") {
    document.querySelector(".calculator-visibility-toggle__wrapper").click();
  } else if (e.key === "j") {
    document.querySelector(".title-visibility-toggle__wrapper").click();
  } else if (e.key === "k") {
    document.querySelector(".horizon-line-visibility-toggle__wrapper").click();
  } else if (e.key === "s") {
    document.querySelector(".sun-visibility-toggle__wrapper").click();
  } else if (e.key === "d") {
    document.querySelector(".triangle-visibility-toggle__wrapper").click();
  } else if (e.key === "f") {
    document.querySelector(".top-grid-visibility-toggle__wrapper").click();
  } else if (e.key === "g") {
    document.querySelector(".bottom-grid-visibility-toggle__wrapper").click();
  } else {
    pressed = document.body.querySelector(`.calc-btn[data-value="${e.key}"]`);
  }
  showClick(pressed, 100);
  return pressed;
}

const showClick = (element, timeoutDuration) => {
  if (element !== null & element !== undefined) {
    element.classList.add("clicked");
    let clickTimer = setTimeout(() => {
      element.classList.remove("clicked");
    }, timeoutDuration);
    clickTimer;
  }
}

const evalCalcButton = e => {
  if (document.activeElement.nodeName === "INPUT" && document.activeElement.id !== "calc-read-out") {
    return;
  }
  
  evalToggleClick(e);

  let clickedEl;
  let keyPress = evalKeyPressed(e);
  
  if (keyPress === false) {
    return;
  } else if (keyPress) {
    clickedEl = keyPress;
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
    } else if (clickedValue === "=") {
      returnFinalResult();
    }
  }
}

const evalToggleClick = e => {
  if (a11yClick(e) === true) {
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
        toggleClass("triangle__wrapper", "triangle-spin");
      } else if (clickedToggleParent.classList.contains("tape-visibility-toggle__wrapper")) {
        toggleClass("calc__wrapper", "show-tape", "hide-tape");
      } else if (clickedToggleParent.classList.contains("calculator-visibility-toggle__wrapper")) {
        toggleClass("calc__inner-wrapper", "no-opacity");
      } else if (clickedToggleParent.classList.contains("title-visibility-toggle__wrapper")) {
        toggleClass("page-title__wrapper", "no-opacity");
      } else if (clickedToggleParent.classList.contains("sun-visibility-toggle__wrapper")) {
        toggleClass("sun-wrapper", "no-opacity");
      } else if (clickedToggleParent.classList.contains("triangle-visibility-toggle__wrapper")) {
        toggleClass("triangle__inner-wrapper", "no-opacity");
      } else if (clickedToggleParent.classList.contains("top-grid-visibility-toggle__wrapper")) {
        toggleClass("top-grid-wrapper", "no-opacity");
      } else if (clickedToggleParent.classList.contains("bottom-grid-visibility-toggle__wrapper")) {
        toggleClass("bottom-grid-wrapper", "no-opacity");
      } else if (clickedToggleParent.classList.contains("horizon-line-visibility-toggle__wrapper")) {
        toggleClass("horizon-line", "no-opacity");
      }
    }
  }
}

const toggleClass = (elementID, className, optionalSecondClass, optionalInitialState) => {
  let element = document.getElementById(elementID);
  if (element.classList.contains(className)) {
    optionalSecondClass !== undefined ? element.classList.add(optionalSecondClass) : null;
    element.classList.remove(className);
  } else if (element.classList.contains(optionalInitialState)) {
    element.classList.add(className);
    element.classList.remove(optionalInitialState);
  } else {
    element.classList.add(className);
    optionalSecondClass !== undefined ? element.classList.remove(optionalSecondClass) : null;
  }
}

const updateAnimation = e => {
  let clickedInputParent = e.target.closest(".nav-child");
  let speed = clickedInputParent.querySelector(".animation-input-element").value;
  if (clickedInputParent.classList.contains("grid-animation-speed__wrapper")) {
    let bgGrids = document.querySelectorAll(".bg-grid");
    for (let i = 0; i < bgGrids.length; i++) {
      let grid = bgGrids[i];
      grid.style.animationDuration = speed + "s";
      grid.style.display = "inline-grid";
      let gridTimer = setTimeout(() => { grid.style.display = "grid", 0 }, 0);
      gridTimer;
    }
  } else if (clickedInputParent.classList.contains("triangle-animation-speed__wrapper")) {
    let triangleWrapper = document.getElementById("triangle__wrapper");
    triangleWrapper.style.animationDuration = speed + "s";
    triangleWrapper.style.display = "none";
    let triangleTimer = setTimeout(() => { triangleWrapper.style.display = "block", 0 }, 0);
    triangleTimer;
  }
}

const handleMenuClick = e => {
  if (a11yClick(e) === true) {
    const nav = document.getElementById("nav");
    toggleClass("nav", "open", "closed", "initial");
    if (nav.classList.contains("closed")) {
      nav.blur();
      document.querySelector('.calc-body').focus();
    } else {
      document.querySelector('.calc-body').blur();
      nav.focus();
    }
  }
}

const a11yClick = e => {
  // from: https://karlgroves.com/2014/11/24/ridiculously-easy-trick-for-keyboard-accessibility
  if(e.type === 'click'){
    return true;
  }
  else if(e.type === 'keydown'){
    if ((e.key === " ") || (e.key === "Enter")) {
      if (e.key === " ") {
        e.preventDefault();
      }
      return true;
    }
  }
  else {
    return false;
  }
}

document.addEventListener("click", evalCalcButton);
document.addEventListener("keydown", evalCalcButton);
const animationInputs = document.querySelectorAll(".animation-input-element");
for (const input of animationInputs) {
  input.addEventListener("change", updateAnimation);
  input.addEventListener("keyup", updateAnimation);
}

const closeNavBtn = document.getElementById("nav-btn");
closeNavBtn.addEventListener("click", handleMenuClick);
closeNavBtn.addEventListener("keydown", handleMenuClick);
