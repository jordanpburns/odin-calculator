function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b
}

function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case '+':
        return add(firstNumber, secondNumber);

        case '-':
            return subtract(firstNumber, secondNumber);
        
        case '*':
            return multiply(firstNumber, secondNumber);

        case '/':
            return divide(firstNumber, secondNumber);

    }
}

const numbersContainer = document.querySelector("#numbers-container");

for (i=0; i<3; i=i+1) {
    let row = document.createElement("div");
    for (j=0; j<3; j=j+1) {
        let button = document.createElement("button");
        button.textContent = `${i*3 + j + 1}`;
        row.appendChild(button);
    }
    numbersContainer.appendChild(row);
}

row = document.createElement("div");
const lastRowSymbols = ["0"];

lastRowSymbols.forEach((value) => {
    let button = document.createElement("button");
    button.textContent = `${value}`;
    row.appendChild(button);
})
numbersContainer.appendChild(row);
numbersContainer.addEventListener("click", (event) => {
    numberPress(event);
});

const operatorsContainer = document.querySelector("#operators-container");
const operatorSymbols = ["+", "-", "*", "/", "="];

operatorSymbols.forEach((value) => {
   let button = document.createElement("button");
   button.textContent = `${value}`;
   operatorsContainer.appendChild(button);
})

operatorsContainer.addEventListener("click", (event) => {
    operatorPress(event);
})

let display = document.querySelector("#display")

function numberPress(event) {
    let target = event.target;
    if (target.textContent.length > 1) {
        return;
    }
    let displayText = display.textContent;
    if (displayText === "0") {
        displayText = "";
    }
    if (!reset) {
        displayText = "";
        reset = true;
    }
    displayText += target.textContent;
    display.textContent = displayText;
}

let firstNumber;
let secondNumber;
let operator;
let reset;

function operatorPress(event) {
    let target = event.target;
    if (target.textContent === "=") {
        if (operator === undefined) {
            return;
        }
        let secondNumber = parseFloat(display.textContent);
        let result = operate(firstNumber, secondNumber, operator);
        display.textContent = result;
        secondNumber = undefined;
        operator = undefined;
        firstNumber = result;
    } else {
        firstNumber = parseFloat(display.textContent);
        operator = target.textContent;
        reset = false;
    }
}