let num1; 
let operator; 
let num2;
const bigDisplay = document.querySelector('.total');
const smallDisplay = document.querySelector('.history');
const smallDisplayText = document.querySelector('.smallDisplayText'); 
const bigDisplayText = document.querySelector('.bigDisplayText')

function updateDisplay (e) {
    if (e.target.dataset.type == 'num' && !operator) {
        !num1 ? num1 = `${e.target.innerText}` :
        num1 += `${e.target.innerText}`; 
        bigDisplayText.textContent = `${num1}`;}

    else if (e.target.dataset.type == 'operator' && num1 && !num2) {
        operator = `${e.target.innerText}`; 
        smallDisplayText.textContent = `${num1} ${operator}`
    }

    else if (e.target.dataset.type == 'clear') {
        bigDisplayText.textContent = '';
        smallDisplayText.textContent = '';
        num1 = null; 
        operator = null;
        num2 = null;
    }

    else if (e.target.dataset.type == 'num' && num1 && operator){
        !num2 ? num2 = `${e.target.innerText}` :
        num2 += `${e.target.innerText}`; 
        smallDisplayText.textContent = `${num1} ${operator}`;
        bigDisplayText.textContent = `${num2}`
        }

    else if (e.target.dataset.type == 'equals' && num1 && operator && num2) {

        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        smallDisplayText.textContent = `${num1} ${operator} ${num2} =`
        let answer = operate(num1, operator, num2); 
        bigDisplayText.textContent = `${answer}`;
        num1 = `${answer}`; 
    }

    else if (e.target.dataset.type == 'operator' && num1 && operator && num2) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        let answer = operate(num1, operator, num2); 
        bigDisplayText.textContent = `${answer}`;
        num1 = `${answer}`; 
        operator = `${e.target.innerText}`; 
        smallDisplayText.textContent = `${num1} ${operator}`
    }

    else if (e.target.dataset.type == 'backspace') {

        if (num1 && !operator) {
            num1 = backspace(num1);
            bigDisplayText.textContent = `${num1}`
        }
        else if (num2) {
            num2 = backspace(num2);
            bigDisplayText.textContent = `${num2}`
        }
        else {return}
    }


    else {return};

    adjustBigFont();
    adjustSmallFont();
}

const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    button.addEventListener('mousedown', updateDisplay); 

}); 

// window.addEventListener('keydown', e => {
//     updateDisplay(e); 
// })

function backspace (str) {
    return str.slice(0, -1)
}

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


function adjustBigFont() {
    const maxFontSize = 5;
    bigDisplayText.style.fontSize = maxFontSize + 'rem';
    
    let fontSize = maxFontSize;

    while (bigDisplayText.offsetWidth > bigDisplay.offsetWidth) {
        fontSize -= 0.1;
        bigDisplayText.style.fontSize = fontSize + 'rem';
    }

}

function adjustSmallFont() {
    const maxFontSize = 2;
    smallDisplayText.style.fontSize = maxFontSize + 'rem';
    
    let fontSize = maxFontSize;

    while (smallDisplayText.offsetWidth > smallDisplay.offsetWidth) {
        fontSize -= 0.1;
        bigDisplayText.style.fontSize = fontSize + 'rem';
    }
}