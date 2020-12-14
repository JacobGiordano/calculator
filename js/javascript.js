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
    case (operator === "add" ):
      return add(a, b);
      break;
    case (operator === "subtract" ):
      return subtract(a, b);
      break;
    case (operator === "multiply" ):
      return multiply(a, b);
      break;
    case (operator === "divide" ):
      return divide(a, b);
      break;
    default:
      result;
      break;
  }
}

let a;
let b;
let result;
let clickedFunction;
const readoutEl = document.getElementById("calc-read-out");

// on click
document.addEventListener("click", (e) => {
  let clickedEl = e.target;
  // console.log(clickedEl);
  if (clickedEl.classList.contains("calc-num-btn")) {
    let clickedNumVal = Number(clickedEl.getAttribute("data-value"));
    if (!isNaN(clickedNumVal)) {
      // console.log(clickedNumVal);
      result = clickedNumVal;
      // console.log(result);
      readoutEl.value = result;
      if (a != undefined) {
        b = clickedNumVal;
        result = operate(clickedFunction, a, b);
      }
    }
  }
  if (clickedEl.classList.contains("calc-operation-btn")) {
    a = result;
    console.log(result);
    clickedFunction = e.target.getAttribute("data-value");
    console.log(clickedFunction);
    if (clickedFunction == "clear") {
      result = 0;
      readoutEl.value = result;
      a = undefined;
      b = undefined;
    }
    if (a !== undefined && b !== undefined) {
      readoutEl.value = result;
      if (clickedFunction == "equals") {
        a = undefined;
        b = undefined;
      }
    }
  }
});