const operatorContainer = document.querySelector(".numANdOperatorsBtns");
const display = document.querySelector(".display");

let firstNum = 0;
let secondNum = 0;
let operator = "";

//let answer = 0;
// let indexes = 0;

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
function operate(operate, a, b) {
  // console.table({
  //   typeofA: `${typeof a}`,
  //   typeofB: `${typeof b}`,
  // });
  switch (operate) {
    case "+":
      return addNum(a, b);
    case "-":
      return subtractNum(a, b);
    case "*":
      return multiplyNum(a, b);
    case "/":
      return divideNum(a, b);
    default:
      console.warn("You shouldnt see this");
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
    "+",
    4,
    5,
    6,
    "-",
    7,
    8,
    9,
    "*",
    0,
    ".",
    "=",
    "/",
    "Delete",
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
  const h = operatorContainer.closest(".calcContainer").clientHeight / 5;
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
    firstNum = 0;
    secondNum = 0;
    return;
  } else if (target.classList.contains("operator")) {
    if (target.classList.contains("=")) {
      target.classList.remove("currentOperator");
      handleEquals(target);
    } else {
      target.classList.add("currentOperator");
      handleOperator(target);
    }
  } else {
    handleNumber(target);
  }
});

function handleNumber(target) {
  showValueOnDisplay(target);

  if (!operator) {
    firstNum = Number(display.value);
  } else {
    secondNum = Number(display.value);
  }

  console.log(`firstNum: ${firstNum}`);
  console.log(`secondNum: ${secondNum}`);
}
function handleOperator(target) {
  const nextOperator = target.innerText;

  if (operator && display.value !== "") {
    // Finish the pending calculation first
    secondNum = Number(display.value);
    firstNum = operate(operator, firstNum, secondNum);
  } else if (!operator && display.value !== "") {
    // No pending operation: use the displayed value as the first number
    firstNum = Number(display.value);
  }

  operator = nextOperator;
  secondNum = 0;
  display.value = "";
}
function handleEquals(target) {
  let answer = operate(operator, firstNum, secondNum);
  display.value = answer;
  firstNum = answer;
  operator = "";
}
// function valueAssignToggler(target) {
//   if (indexes === 0) {
//     firstNum = parseInt(display.value);
//     initialOperator = target.innerText;
//     display.value = target.innerText;
//     indexes++;
//   } else if (indexes === 1) {
//     secondNum = parseInt(display.value);
//   }
// }

appInit();

/*
when an operator is pressed,
  check what operator
    IF the operator is not an equal sign,
      THEN check the index
        IF the index is 0 THEN assign the current displayed value to firstNum
          THEN assign the operator on the initialOperator
        IF the index is 1 THEN assign the current displayed value to secondNum
          THEN operate on firstNum and secondNum
          THEN assign the answer to the firstNum
          THEN initialized secondNum to 0
      THEN clear the display and add the operator
      THEN increase the index
    IF the operator is an equal sign
      THEN take the displayed value and assign it o secondNum
      THEN operate on the firstNum and secondNum
      THEN assign the answer to the firstNum
      THEN display the answer on the input
      THEN initialized the index to 0



   // console.table({
    //   firstNum: `${firstNum}`,
    //   secondNum: `${secondNum}`,
    //   index: `${indexes}`,
    //   initialOperator: `${initialOperator}`,
    // });
 



*/
