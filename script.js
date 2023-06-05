let num1; 
let operator; 
let num2;
const bigDisplay = document.querySelector('.total');
const smallDisplay = document.querySelector('.history');
const smallDisplayText = document.querySelector('.smallDisplayText'); 
const bigDisplayText = document.querySelector('.bigDisplayText')


const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    button.addEventListener('mousedown', e => {
        handleInput({type: 'mouse', target: e.target})
    }); 
});

window.addEventListener('keydown', e => {
    handleInput({type: 'keyboard', target: e.key});
    const keyButton = document.querySelector(`.button[data-key="${e.key}"]`); 
    keyButton.classList.add('pressed')
}); 

window.addEventListener('keyup', e => {
    const keyButton = document.querySelector(`.button[data-key="${e.key}"]`); 
    keyButton.classList.remove('pressed')
});


function handleInput (input) {

    let pushedButton;

    if (input.type === 'mouse') {
        pushedButton = input.target;
    }
    else if (input.type === 'keyboard') {
        pushedButton = document.querySelector(`.button[data-key="${input.target}"]`)
    }

    const buttonType = pushedButton.dataset.type;
    const buttonValue = `${pushedButton.innerText}`; 

    switch(buttonType) {
        
        case 'num':

            if(!operator) {
                !num1 ? num1 = buttonValue :
                num1 += buttonValue;
                bigDisplayText.textContent = `${num1}`
            } 
            else if (operator) {
                !num2 ? num2 = buttonValue :
                num2 += buttonValue; 
                smallDisplayText.textContent = `${num1} ${operator}`;
                bigDisplayText.textContent = `${num2}`
            }
            break;

        case 'operator':

            if (num1 && !num2) {
                operator = buttonValue; 
                smallDisplayText.textContent = `${num1} ${operator}`
            }
            else if (num1 && operator && num2) {
                num1 = parseFloat(num1);
                num2 = parseFloat(num2);
                let answer = operate(num1, operator, num2); 
                bigDisplayText.textContent = `${answer}`;
                num1 = `${answer}`; 
                operator = buttonValue; 
                smallDisplayText.textContent = `${num1} ${operator}`
            }
            break;

        case 'equals':

             if (num1 && operator && num2) {
                num1 = parseFloat(num1);
                num2 = parseFloat(num2);
                smallDisplayText.textContent = `${num1} ${operator} ${num2} =`
                let answer = operate(num1, operator, num2); 
                bigDisplayText.textContent = `${answer}`;
                num1 = `${answer}`; 
             }
            break;

        case 'clear':

            bigDisplayText.textContent = '';
            smallDisplayText.textContent = '';
            num1 = null; 
            operator = null;
            num2 = null;
            break;

        case 'backspace':

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

    adjustBigFont();
    adjustSmallFont();

};


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