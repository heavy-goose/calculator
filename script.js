function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    if (b == 0) return "ZeroDivisionError";
    return a / b;
}

let operandOne = "";
let operandTwo = "";
let operator;

// toggles between "1" and "2" to show which operand is currently being modified
let readState = 1;

function operate (operator, operandOne, operandTwo) {
    let result;
    switch (operator) {
        case "+":
            result = add(operandOne, operandTwo);
            break;
        case "-":
            result = subtract(operandOne, operandTwo);
            break;
        case "*":
            result = multiply(operandOne, operandTwo);
            break;
        case "/":
            result = divide(operandOne, operandTwo);
            break;
        default:
            console.log("Unknown Operator");
            result = "Error | Unknown Operator";        
    }
    return result;
}


const display = document.querySelector(".display");
const clearButton = document.querySelector("#clear-btn");

clearButton.addEventListener("click", (e) => {
    display.innerText = "";
    operandOne = "";
    operandTwo = "";
    operator = "";
});

const numberButtons = [...document.querySelectorAll(".number-key")]
    .filter(item => item.innerText.match(/[0-9.]/));

numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", (e) => {
        if (readState === 1) {
            operandOne += numberButton.innerText;
        } else {
            operandTwo += numberButton.innerText;
        }
        display.innerText += numberButton.innerText
    });
});


const multButton = document.querySelector("#mult-btn");
multButton.addEventListener("click", (e) => {
    readState = 2;
    display.innerText = "";
    operator = "*" 
});

const divideButton = document.querySelector("#divide-btn");
divideButton.addEventListener("click", (e) => {
    readState = 2;
    display.innerText = "";
    operator = "/" 
});

const plusButton = document.querySelector("#plus-btn");
plusButton.addEventListener("click", (e) => {
    readState = 2;
    display.innerText = "";
    operator = "+" 
});

const minusButton = document.querySelector("#minus-btn");
minusButton.addEventListener("click", (e) => {
    readState = 2;
    display.innerText = "";
    operator = "-" 
});



const equalsButton = document.querySelector("#equals-btn");
equalsButton.addEventListener("click", (e) => {
    result = operate(operator, operandOne, operandTwo);
    display.innerText = result;
    operandOne = result;
    readState = 1;   
});