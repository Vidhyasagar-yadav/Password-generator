const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const lengthDisplay = document.querySelector('[data-lengthNumber]');
const inputSlider = document.querySelector('[data-lengthSlider]');
const indicator = document.querySelector('[data-indicator]');
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const symbolsCheck = document.querySelector('#symbols');
const numbersCheck = document.querySelector('#numbers');
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// console.log(passwordNo.textContent);

// initially
let password="";
let passwordLength= 10;
let checkcount= 0;
lengthDisplay.innerText = 10;


// handleSlider();
inputSlider.addEventListener('input',(e)=>{
    lengthDisplay.innerText = e.target.value;
});

// SetIndicator
function setIndicator(color){
    indicator.style.backgroundColor= color;
};

function calcStrength(){
    if (numbersCheck.checked & lowercaseCheck.checked){
        setIndicator('red');
    }
    if (passwordLength >= 12){
        setIndicator('green')
    }
    else(        
        setIndicator('green');
    )    
};

// calcStrength();


function getRndInteger(min,max){
   return Math.floor( Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    getRndInteger(0,9);
}

function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt[randNum]
}

function generateLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,90));
}
