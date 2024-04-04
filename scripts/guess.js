let gameName="Guess The Word";
document.title=gameName;
document.querySelector('h1').innerHTML= gameName;
document.querySelector('footer').innerHTML=gameName+' Game Developped By Ouss';

let numberOfTries = 6;
let numberOfLetters = 6;
let CurrentTry = 1;
let numberOfHints = 2;

let messageArea = document.querySelector('.message');
//Maange Words
let wordToGuess ="";
const words=["Bochra","Felfou","Amiraa","Fatima"];
wordToGuess= words[Math.floor(Math.random()*words.length)].toLowerCase();

//Manage Hints
document.querySelector('.hint span').innerHTML= numberOfHints;
const hintButton = document.querySelector('.hint');
hintButton.addEventListener("click",getHints);

function generateInputs() {
    const inputsContainer = document.querySelector('.inputs');
    
    for(let i=1;i<=numberOfTries;i++){
        const tryDiv = document.createElement('div');
        tryDiv.classList.add('try-'+i);
        tryDiv.innerHTML = '<span>Try '+i+' </span>';
        
        if (i!= 1) tryDiv.classList.add('disabled-inputs');
        
        for(let j=1;j<=numberOfLetters;j++){
            const input = document.createElement('input');
            input.type="text";
            input.id="guess-"+i+"-letter-"+j;
            input.setAttribute('maxlength','1');
            tryDiv.appendChild(input);
        }
        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();
    
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabledDiv.forEach((input)=>(input.disabled=true));
    
    const inputs = document.querySelectorAll("input");
    
    inputs.forEach((input,index)=>{
        input.addEventListener("input",function(){
            this.value= this.value.toUpperCase();
            const nextInput= inputs[index+1];
            if(nextInput) nextInput.focus();
        })
        input.addEventListener("keydown",function(event){
            const currentIndex= Array.from(inputs).indexOf(event.target);
            
            if(event.key==="ArrowRight"){
                const nextInput= currentIndex+1;
                if(nextInput < inputs.length) inputs[nextInput].focus();
                console.log(inputs.length);
            }
            if(event.key==="ArrowLeft"){
                const prevInput= currentIndex-1;
                if(prevInput >=0) inputs[prevInput].focus();
                console.log(prevInput);
            }
        });
    });
}


const guessButton = document.querySelector('.check');
guessButton.addEventListener("click",hundleGuesses);



function hundleGuesses(){
    let seccessGuess= true;
    for(i=1; i<= numberOfLetters; i++){
        const inputField= document.querySelector('#guess-'+CurrentTry+'-letter-'+i);
        const letter = inputField.value.toLowerCase();
        const currentLetter = wordToGuess[i-1];
        
        if(letter === currentLetter){
            inputField.classList.add("in-place");
        }else if(wordToGuess.includes(letter) && letter !==""){
            inputField.classList.add("not-in-place");
            seccessGuess= false;
        }else{
            inputField.classList.add("wrong");
            seccessGuess= false;
        }
    } 
    //Check if user win or lose
    if(seccessGuess){
            messageArea.innerHTML= 'You win. The word is <span>'+wordToGuess+'</span>';
            
            //Add Disabled Class on All Try Divs
            let allTries = document.querySelectorAll('.inputs > div');
            allTries.forEach((tryDiv) => tryDiv.classList.add('disabled-inputs'));
            
            //Disable Guess Button
            guessButton.disabled= true;
            hintButton.disabled = true;
    }else{
            document.querySelector('.try-'+CurrentTry).classList.add('disabled-inputs');
            const currentTryInputs = document.querySelectorAll('.try-'+CurrentTry+' input');
            currentTryInputs.forEach((input) =>(input.disabled=true));
            //console.log(CurrentTry);
            CurrentTry++;
            const nextTryInputs =document.querySelectorAll('.try-'+CurrentTry+' input');
            nextTryInputs.forEach((input) =>(input.disabled=false));
            
            let element = document.querySelector('.try-'+CurrentTry);
            if(element){
                document.querySelector('.try-'+CurrentTry).classList.remove('disabled-inputs');
                element.children[1].focus();
            }else{
                //Disable Guess Button
                guessButton.disabled= true;
                messageArea.innerHTML= 'You Lose. The word is <span>'+wordToGuess+'</span>';
            }
    }
        
    
}


function getHints(){
    if(numberOfHints > 0){
        numberOfHints--;
        document.querySelector('.hint span').innerHTML= numberOfHints;
        
    }
    if(numberOfHints === 0){
        hintButton.disabled = true;
    }
    const enabledInputs = document.querySelectorAll('input:not([disabled])');
    
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value==="");
    
    if(emptyEnabledInputs.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        console.log(randomIndex);
        console.log(randomInput);
        console.log(indexToFill);
        
        if(indexToFill !== -1){
            randomInput.value = wordToGuess[indexToFill].toUpperCase(); 
            
        }
    }
}


window.onload = function (){
    generateInputs();
    
}