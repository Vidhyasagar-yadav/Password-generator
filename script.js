const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const lengthDisplay = document.querySelector('[data-lengthNumber]');
const inputSlider = document.querySelector('[data-lengthSlider]');
const indicator = document.querySelector('[data-indicator]');
const symbols = "`!@#$%^&*()_-+={[]};:',<.>/?/*-+";
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');
const copyMsg = document.querySelector('[data-copyMsg]');
const allCheckBox = document.querySelector('input[type=checkbox]');
const copyBtn = document.querySelector('[data-copy]');
const generateBtn = document.querySelector('.generateButton')
 // console.log(passwordNo.textContent);
 
// initially
let password="";
let passwordLength= 10;
let checkCount= 0;

handleSlider();
function handleSlider(){
    lengthDisplay.innerText = passwordLength;
    inputSlider.value = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"

};

// Set Password Length
inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
});

// Set Indicator
setIndicator('#ccc');

function setIndicator(color){
    indicator.style.backgroundColor= color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
};

function getRndInteger(min,max){
   return Math.floor(Math.random()*(max-min))+ min;
}

function generateRandomNumber(){
   return getRndInteger(0,9);
};

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,90)); 
};

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,122));
};

function generateSymbol(){
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
};

function calcStrength(){
let hasUpper = false;
let hasLower = false;
let hasNum = false;
let hasSymbol = false;

if(lowercaseCheck.checked ) hasLower = true;
if(uppercaseCheck.checked) hasUpper = true;
if(numbersCheck.checked) hasNum = true;
if (symbolsCheck.checked) hasSymbol = true;

if(hasLower && hasNum && (hasUpper || hasSymbol) && passwordLength >= 6){
    setIndicator('#ff0');
}
if(hasNum && hasSymbol &&(hasNum || hasSymbol) && passwordLength >= 8){
    setIndicator('#0f0');
}
else{
    setIndicator('#f00');
};

};

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = 'Copied';
    }
    catch (e){
        copyMsg.innerText = 'Failed';
    }

    // To make span visible
        copyMsg.classList.add('active');
    setTimeout(()=>{
        copyMsg.classList.remove('active');
    },2000);

};


// Handle CheckBox change
function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    // Special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    };
};



let arr = Array.from(allCheckBox);
arr.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copyContent();
})


// Shuffle password

function shufflePassword(array){
    // Fisher Yates Method
    for(let i = array.length - 1; i > 0 ; i--){
        const  j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((value)=>{
        str = str + value;
        return str;
    })
}

// console.log('start the process');

generateBtn.addEventListener('click',()=>{
    console.log('process starting');
    
    // if(checkCount == 0){ 
    //     return  console.log('nothing')
    // };
    console.log('process starting aAZcxzc');

    // if(passwordLength < checkCount) {
    //     passwordLength = checkCount;
    //     handleSlider();
    // };

    // Let's start a journey to find a new password
    console.log('starting the journey');
    // clear password
    password = "";

    console.log('password cleared');

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    console.log('loop starting');

    

    for(let i = 0; i < funcArr.length; i++){
        password += funcArr[i]();
        console.log('checked password ' + password)
    };

    console.log('Compulsory addition done');


    // Remaining addition  
    for(let i = 0; i < passwordLength - funcArr.length; i++){
        let randIndex = getRndInteger(0,funcArr.length);
        console.log('randIndex value' + randIndex);
        password += funcArr[randIndex]();
    }

    console.log('password ' + password); 
    passwordDisplay.value = password;
    calcStrength();
    console.log('done' + password.length);

    // Shuffle the password
    password = shufflePassword(Array.from(password));
    console.log('shuffling done');
});




// console.log('end the process');




