function add (a, b) {
    return Number(a) + Number(b);
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    // if (b == 0) return "ZeroDivisionError";
    return a / b;
}

let operandOne = "";
let operandTwo = "";
let operator;

let readState = "greeting"; // toggles between "greeting", "1" and "2" to show which operand is currently being modified

function operate () {
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
            return"Error | No Operator";        
    }
    if (result == Infinity) result = "nice try...";
    return lintResult(result);
}


const display = document.querySelector(".display");
const clearButton = document.querySelector("#clear-btn");

// clear display only
function clearDisplay() {
    display.innerText = "";
}

// reset all variables and set readState to "greeting"
function reset() {
    operandOne = "";
    operandTwo = "";
    operator = "";
    readState = "greeting";
    operatorKeyList.forEach(item => item.classList.remove("active"));
    dotActive = false;
}

clearButton.addEventListener("click", (e) => {
    clearDisplay();
    reset();
});

// handle number input for various scenarios
const numberButtons = [...document.querySelectorAll(".number-key")]
    .filter(item => item.innerText.match(/[0-9.]/));

numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", (e) => {
        if (readState === "greeting") {
            reset();
            readState = 1;
            clearDisplay();
        }

        if (readState === 1) {
            if (!operandOne.includes(".") || numberButton.innerText !== ".") {
                operandOne += numberButton.innerText;
                display.innerText = operandOne;
            }
            
        } else {
            if (!operandTwo.includes(".") || numberButton.innerText !== ".") {
                operatorKeyList.forEach(item => item.classList.remove("active"));
                operandTwo += numberButton.innerText;
                display.innerText = operandTwo;
            }
        }
        
    });
});

// handle behavior of operator buttons for (hopefully) all scenarios
const operatorKeyList = document.querySelectorAll(".operator-key");
const operators = [...document
    .querySelectorAll(".operator-key")]
    .filter(item => item.id !== "equals-btn")
    .forEach(o => {
        o.addEventListener("click", (e) => {
            switch(readState) {

                case "greeting": // we are here when we (1) first load the page or (2) have obtained a result via the "equals" key
                    if (o.dataset.value === "-" && operandOne === "") {
                        readState = 1;
                        clearDisplay();
                        operandOne += "-";
                        display.innerText = "-";
                    } else {
                        o.classList.add("active");
                        readState = 2;
                        operator = o.dataset.value;
                    }
                    break;

                case 1: // this state is reached when the first operand has been read to

                    // make the minus button "toggleable" 
                    if(operandOne === "-") {
                        if (o.dataset.value === "-") {
                            operandOne = "";
                            display.innerText = operandOne;
                            readState = "greeting";
                        }
                    } else if (operandOne !== "") {
                        o.classList.add("active");
                        readState = 2;
                        operator = o.dataset.value;
                    }
                    break;
                  
                case 2: // this state indicates that an operator key has been pushed while or after the second operand is beeing/has been defined
                    // allow user to change operand choice 
                    if (operandTwo === "") {
                        operatorKeyList.forEach(item => item.classList.remove("active"));
                        o.classList.add("active");
                        operator = o.dataset.value;
                    } 
                    // allow for chained calculations
                    else {        
                        let result = operate();
                        operandOne = result;
                        display.innerText = lintResult(result);
                        operator = o.dataset.value;
                        operandTwo = "";
                    }
                    break;
                default:
                    console.log("something went wrong with the 'readState'");
                    break;
            }
        });
    });


const equalsButton = document.querySelector("#equals-btn");
equalsButton.addEventListener("click", (e) => {
    if(readState === 2) {
        let result = operate();
        display.innerText = lintResult(result);
        reset();
        operandOne = lintResult(result);
    }
});

// add keyboard functionality
document.addEventListener("keydown", (e) => {
    const key = e.key;
    const button = document.querySelector(`[data-value="${key}"]`);

    if(button) button.click();
})

// handle fractions and large numbers to fit the display
function lintResult(result) {
    if (String(result).length > 10 && typeof result != "string") {
        
        if (Number(result) < 9999999999) {
            result = result.toFixed(11).slice(0, 11);
        } else {
            result = result.toExponential(6);
        }
    }
    return result;
}