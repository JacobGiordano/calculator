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
let result;
let clickedFunction;
const readoutEl = document.getElementById("calc-read-out");
const tape = document.getElementById("calc-tape");

// on click

document.addEventListener("click", (e) => {
  let clickedEl = e.target;
  let clickedValue = clickedEl.getAttribute("data-value");
  if (clickedEl.classList.contains("calc-num-btn")) {
    readoutEl.value += clickedValue;
    if (clickedFunction !== undefined && b === undefined) {
      readoutEl.value = clickedValue;
      b = readoutEl.value;
    }
  }
  if (clickedEl.classList.contains("calc-operation-btn")) {
    a = Number(readoutEl.value);
    clickedFunction = clickedValue;
  }
  if (clickedEl.classList.contains("equals-btn")) {
    b = Number(readoutEl.value);
    result = operate(clickedFunction, a, b);
    readoutEl.value = result;
    console.log(`${a} ${clickedFunction} ${b} = ${result}`);
  }
  if (clickedValue === "clear") {
    a = undefined;
    b = undefined;
    clickedFunction = undefined;
    readoutEl.value = "";
  }
});





// document.addEventListener("click", (e) => {
//   let clickedEl = e.target;
//   // console.log(clickedEl);
//   if (clickedEl.classList.contains("calc-num-btn")) {
//     let clickedNumVal = Number(clickedEl.getAttribute("data-value"));
//     if (!isNaN(clickedNumVal)) {
//       // console.log(clickedNumVal);
//       display = clickedNumVal;
//       // console.log(display);
//       readoutEl.value = display;
//       if (a != undefined) {
//         b = clickedNumVal;
//         result = operate(clickedFunction, a, b);
//       }
//     }
//   }
//   if (clickedEl.classList.contains("calc-operation-btn")) {
//     a = display;
//     console.log(display);
//     clickedFunction = e.target.getAttribute("data-value");
//     console.log(clickedFunction);
//     if (clickedFunction == "clear") {
//       display = 0;
//       readoutEl.value = display;
//       a = undefined;
//       b = undefined;
//     }
//     if (a !== undefined && b !== undefined) {
//       readoutEl.value = result;
//       console.log(result);
//       if (clickedFunction == "=") {
//         let docFrag = new DocumentFragment;
//         let newEntryLine = document.createElement("span");
//         newEntryLine.classList.add("tape-line");
//         let newEntry = document.createTextNode(`${a} ${clickedFunction} ${b} = ${result}
//         `);
//         newEntryLine.appendChild(newEntry);
//         docFrag.appendChild(newEntryLine);
//         tape.appendChild(docFrag);
//         a = undefined;
//         b = undefined;
//       }
//     }
//   }
// });

