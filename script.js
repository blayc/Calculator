let num1; 
let operator; 
let num2;
const bigDisplay = document.querySelector('.total');
const smallDisplay = document.querySelector('.history');

function updateDisplay (e) {
    if (e.target.dataset.type == 'num' && !operator) {
        !num1 ? num1 = `${e.target.innerText}` :
        num1 += `${e.target.innerText}`; 
        bigDisplay.textContent = `${num1}`;}

    else if (e.target.dataset.type == 'operator' && num1 && !num2) {
        operator = `${e.target.innerText}`; 
        smallDisplay.textContent = `${num1} ${operator}`
    }

    else if (e.target.dataset.type == 'clear') {
        bigDisplay.textContent = '';
        smallDisplay.textContent = '';
        num1 = null; 
        operator = null;
        num2 = null;
    }

    else if (e.target.dataset.type == 'num' && num1 && operator){
        !num2 ? num2 = `${e.target.innerText}` :
        num2 += `${e.target.innerText}`; 
        smallDisplay.textContent = `${num1} ${operator}`;
        bigDisplay.textContent = `${num2}`
        }

    else if (e.target.dataset.type == 'equals' && num1 && operator && num2 ||
             e.target.dataset.type == 'operator' && num1 && operator && num2) {

        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        smallDisplay.textContent = `${num1} ${operator} ${num2}`
        let answer = operate(num1, operator, num2); 
        bigDisplay.textContent = `${answer}`;
        num1 = `${answer}`; 
        operator = `${e.target.innerText}`
    }

    else {return};
}

const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    button.addEventListener('click', updateDisplay)

}); 

function newCalc () {
    num2 = null; 
    operator = null; 
}

function add (num1, num2) {
    return num1 + num2; 
};

function subtract (num1, num2) {
    return num1 - num2; 
};

function multiply (num1, num2) {
    return num1 * num2; 
    
};

function divide (num1, num2) {
    return num1 / num2; 
    
};


function operate (num1, operator, num2) {

    let result;

    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case 'x':
            result =  multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
    }

    newCalc();

    return result;

};

function backspace () {

}