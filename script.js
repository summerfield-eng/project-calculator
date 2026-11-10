const operatorContainer = document.querySelector(".numANdOperatorsBtns");
const display = document.querySelector(".display");

let calc = [];
let lastOperator = "";

function addNum(a, b) {
  return a + b;
}
function subtractNum(a, b) {
  return a - b;
}
function multiplyNum(a, b) {
  return a * b;
}
function divideNum(a, b) {
  return a / b;
}

function operate(operate, arr) {
  switch (operate) {
    case operate === "+":
      let sum = addNum(arr[0], arr[1]);
      return sum;
    case operate === "-":
      let diff = addNum(arr[0], arr[1]);
      display.value = diff;
      arr = diff;
      break;
    case operate === "*":
      let multi = addNum(arr[0], arr[1]);
      display.value = multi;
      arr = multi;
      break;
    case operate === "/":
      let divi = addNum(arr[0], arr[1]);
      display.value = divi;
      arr = divi;
      break;
    default:
      console.log("nothing happened");
  }
}

function createBtns(text) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.classList.add(text);
  btn.classList.add("btn");
  if (
    btn.classList.contains("+") ||
    btn.classList.contains("-") ||
    btn.classList.contains("*") ||
    btn.classList.contains("/") ||
    btn.classList.contains("=")
  ) {
    btn.classList.add("operator");
  }

  return btn;
}

function appendOperators(container) {
  let operators = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    "+",
    "-",
    "*",
    "/",
    "=",
    "Clear",
  ];
  let arrBtns = operators.map((operator) => createBtns(operator));
  let frag = document.createDocumentFragment();

  for (let btn of arrBtns) {
    frag.appendChild(btn);
  }

  container.appendChild(frag);
}

function calcButtonWidthHeight() {
  const h = operatorContainer.closest(".calcContainer").clientHeight / 4;
  const w = operatorContainer.closest(".calcContainer").clientWidth / 4;

  operatorContainer.querySelectorAll(".btn").forEach((btn) => {
    btn.style.height = h + "px";
    btn.style.width = w + "px";
  });
}

function appInit() {
  appendOperators(operatorContainer);
  calcButtonWidthHeight();
}

function showValueOnDisplay(target) {
  display.value += target.textContent;
}

operatorContainer.addEventListener("click", function (e) {
  let target = e.target;

  if (target.classList.contains("Clear")) {
    display.value = "";
    return;
  } else if (target.classList.contains("operator")) {
    if (calc.length === 2) {
      console.log(`lastOperator: ${lastOperator}`);
      let answer = operate(lastOperator, calc);
      calc = []; // clear the value of the array
      calc.push(answer); // passed the previous answer to the array
      console.log(answer);
    } else {
      lastOperator = target.innerText;
      calc.push(display.value);
      display.value = "";
      console.log(calc);
    }
  } else {
    showValueOnDisplay(target);
    console.log(calc);
  }
});

function equalHandler() {}
appInit();
