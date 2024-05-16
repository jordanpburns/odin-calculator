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

const topRowContainer = document.querySelector("#top-row-container");
const topRowSymbols = ["AC", "+/-", "%"];

topRowSymbols.forEach((value) => {
    let button = document.createElement("button");
    button.textContent = `${value}`;
    topRowContainer.appendChild(button);
})

topRowContainer.addEventListener("click", (event) => {
    topRowPress(event);
})

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

lastRow = document.createElement("div");

let zeroButton = document.createElement("button");
zeroButton.textContent = "0";
zeroButton.id = "zeroButton";
lastRow.appendChild(zeroButton);

let decimalButton = document.createElement("button");
decimalButton.textContent = ".";
decimalButton.id = "decimalButton";
lastRow.appendChild(decimalButton);

numbersContainer.appendChild(lastRow);
numbersContainer.addEventListener("click", (event) => {
    numberPress(event);
});

const operatorsContainer = document.querySelector("#operators-container");
const operatorSymbols = ["+", "-", "*", "/", "="];
const operatorColors = ["#63c28d", "#59be86", "#50bb7f", "#46b778", "#3cb371"];

operatorSymbols.forEach((value, index) => {
   let button = document.createElement("button");
   button.textContent = `${value}`;
   button.style.cssText = `background-color: ${operatorColors[index]}`
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
    if (target.textContent === ".") {
        if (display.textContent.includes(".")) {
            return;
        }
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
        let result = +operate(firstNumber, secondNumber, operator).toFixed(6);
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

function topRowPress(event) {
    let target = event.target;
    switch(target.textContent) {
        case "AC":
            display.textContent = "0";
            firstNumber = undefined;
            operator = undefined;
            secondNumber = undefined;
            break;
        case "+/-":
            display.textContent = parseFloat(display.textContent) * -1;
            break;
        case "%":
            display.textContent = +(parseFloat(display.textContent) / 100).toFixed(6);
            break;
    }
}