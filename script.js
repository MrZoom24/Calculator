const numBtn = document.querySelectorAll(".num");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");
const currentNum = document.querySelector(".current");
const previousNum = document.querySelector(".previous");
const pointBtn = document.querySelector("#point");
const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");
const multiplyBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");
const percentBtn = document.querySelector("#percent");
const powerBtn = document.querySelector("#power");
const factorialBtn = document.querySelector("#factorial");
const equalBtn = document.querySelector("#equal");

function calculateFactorial(){
    let factorial = 1;
    for(let i = 1; i <= Number(currentNum.textContent); i++){
        factorial *= i;
    }
    return factorial;
}

function clearScreen(screen){
    if(screen == previousNum){
        previousNum.textContent = "";
    }else if(screen == currentNum){
        currentNum.textContent = "";
    }else{
        console.error("Invalid screen");
    }
}

function resetStyle(){
    currentNum.style.fontSize = "4rem";
    numBtn.forEach(element => element.classList.remove("disabled"));
}

function screenEmptyOrNot(previousScreen, currentScreen){
    if(previousScreen == "empty" && currentScreen == "empty"){
        return previousNum.textContent == "" && currentNum.textContent == "";
    }else if(previousScreen == "empty" && currentScreen == "not empty"){
        return previousNum.textContent == "" && currentNum.textContent != "";
    }else if(previousScreen == "not empty" && currentScreen == "empty"){
        return previousNum.textContent != "" && currentNum.textContent == "";
    }else if(previousScreen == "not empty" && currentScreen == "not empty"){
        return previousNum.textContent != "" && currentNum.textContent != "";
    }else{
        console.error("Invalid parameter");
    }
}

numBtn.forEach(element => {
    element.addEventListener("click", function (){
        if(currentNum.textContent.length < 15){
            if(currentNum.textContent != "Error"){
                currentNum.textContent += this.textContent;
    
                if(currentNum.textContent.length >= 12 && currentNum.textContent.length < 14){
                    currentNum.style.fontSize = "3rem";
                }else if(currentNum.textContent.length >= 14){
                    currentNum.style.fontSize = "2.5rem";
                }
            }
        }else {
            numBtn.forEach(element => element.classList.add("disabled"));
        }
    })
})

pointBtn.addEventListener("click", function(){
    if(!currentNum.textContent.includes(".") && currentNum.textContent != "Error"){
        if(currentNum.textContent == ""){
            currentNum.textContent = "0.";
        }else{
            currentNum.textContent += ".";
        }
    }
})

clearBtn.addEventListener("click", function(){
    clearScreen(currentNum);
    clearScreen(previousNum);
    resetStyle();
})

deleteBtn.addEventListener("click", function() {
    if(currentNum.textContent != ""){
        if(currentNum.textContent != "Error"){
            currentNum.textContent = currentNum.textContent.slice(0, -1)
        }else{
            clearScreen(currentNum);
        }
    }else{
        currentNum.textContent = previousNum.textContent.slice(0, -2);
        clearScreen(previousNum);
    }
})

addBtn.addEventListener("click", function(){
    resetStyle();

    if(screenEmptyOrNot("empty", "empty")){

    }else if(screenEmptyOrNot("empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(currentNum.textContent != "Error"){
                previousNum.textContent = currentNum.textContent + " +";
                clearScreen(currentNum);
            }
        }else{
            clearScreen(currentNum);
        }
    }else if(screenEmptyOrNot("not empty", "empty")){
        previousNum.textContent = previousNum.textContent.slice(0, -2) + " +";
    }else if(screenEmptyOrNot("not empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(previousNum.textContent.slice(-2) == " -"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) - Number(currentNum.textContent);
                previousNum.textContent += " +";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " *"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) * Number(currentNum.textContent);
                previousNum.textContent += " +";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " /"){
                if(Number(currentNum.textContent) == 0){
                    currentNum.textContent = "Error";
                    clearScreen(previousNum);
                }else {
                    previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) / Number(currentNum.textContent);
                    previousNum.textContent += " +";
                    clearScreen(currentNum);
                }
            }else if(previousNum.textContent.slice(-2) == " ^"){
                if(Number(previousNum.textContent.slice(0, -2)) ** Number(currentNum.textContent) != Infinity){
                    previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) ** Number(currentNum.textContent);
                    previousNum.textContent += " +";
                    clearScreen(currentNum);
                }else{
                    clearScreen(previousNum);
                    currentNum.textContent = "Error";
                }
            }else if(previousNum.textContent.slice(-2) == " %"){
                previousNum.textContent = (Number(previousNum.textContent.slice(0, -2)) / 100) * Number(currentNum.textContent);
                previousNum.textContent += " +";
                clearScreen(currentNum);
            }else{
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) + Number(currentNum.textContent);
                previousNum.textContent += " +";
                clearScreen(currentNum);
            }
        }else{
            clearScreen(currentNum);
        }
    }
})

subtractBtn.addEventListener("click", function(){
    resetStyle();

    if(screenEmptyOrNot("empty", "empty")){
        currentNum.textContent = "-";
    }else if(screenEmptyOrNot("empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(currentNum.textContent != "Error"){
                previousNum.textContent = currentNum.textContent + " -";
                clearScreen(currentNum);
            }
        }else {
            clearScreen(currentNum);
        }
    }else if(screenEmptyOrNot("not empty", "empty")){
        currentNum.textContent = "-";
    }else if(screenEmptyOrNot("not empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(previousNum.textContent.slice(-2) == " +"){
                previousNum.textContent = Number(previousNum.textContent.slice(0, -2)) + Number(currentNum.textContent);
                previousNum.textContent += " -";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " *"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) * Number(currentNum.textContent);
                previousNum.textContent += " -";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " /"){
                if(Number(currentNum.textContent) == 0){
                    currentNum.textContent = "Error";
                    clearScreen(previousNum);
                }else {
                    previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) / Number(currentNum.textContent);
                    previousNum.textContent += " -";
                    clearScreen(currentNum);
                }
            }else if(previousNum.textContent.slice(-2) == " ^"){
                if(Number(previousNum.textContent.slice(0, -2)) ** Number(currentNum.textContent) != Infinity){
                    previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) ** Number(currentNum.textContent);
                    previousNum.textContent += " -";
                    clearScreen(currentNum);
                }else{
                    clearScreen(previousNum);
                    currentNum.textContent = "Error";
                }
            }else if(previousNum.textContent.slice(-2) == " %"){
                previousNum.textContent = (Number(previousNum.textContent.slice(0, -2)) / 100) * Number(currentNum.textContent);
                previousNum.textContent += " -";
                clearScreen(currentNum);
            }else{
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) - Number(currentNum.textContent);
                previousNum.textContent += " -";
                clearScreen(currentNum);
            }
        }else{
            previousNum.textContent = previousNum.textContent.slice(0, -2) + " -";
            clearScreen(currentNum);
        }
    }
})

multiplyBtn.addEventListener("click", function(){
    resetStyle();

    if(screenEmptyOrNot("empty", "empty")){

    }else if(screenEmptyOrNot("empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(currentNum.textContent != "Error"){
                previousNum.textContent = currentNum.textContent + " *";
                clearScreen(currentNum);
            }
        }else{
            clearScreen(currentNum);
        }
    }else if(screenEmptyOrNot("not empty", "empty")){
        previousNum.textContent = previousNum.textContent.slice(0, -2) + " *";
    }else if(screenEmptyOrNot("not empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(previousNum.textContent.slice(-2) == " -"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) - Number(currentNum.textContent);
                previousNum.textContent += " *";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " +"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) + Number(currentNum.textContent);
                previousNum.textContent += " *";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " /"){
                if(Number(currentNum.textContent) == 0){
                    currentNum.textContent = "Error";
                    clearScreen(previousNum);
                }else {
                    previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) / Number(currentNum.textContent);
                    previousNum.textContent += " *";
                    clearScreen(currentNum);
                }
            }else if(previousNum.textContent.slice(-2) == " ^"){
                if(Number(previousNum.textContent.slice(0, -2)) ** Number(currentNum.textContent) != Infinity){
                    previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) ** Number(currentNum.textContent);
                    previousNum.textContent += " *";
                    clearScreen(currentNum);
                }else{
                    clearScreen(previousNum);
                    currentNum.textContent = "Error";
                }
            }else if(previousNum.textContent.slice(-2) == " %"){
                previousNum.textContent = (Number(previousNum.textContent.slice(0, -2)) / 100) * Number(currentNum.textContent);
                previousNum.textContent += " *";
                clearScreen(currentNum);
            }else{
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) * Number(currentNum.textContent);
                previousNum.textContent += " *";
                clearScreen(currentNum);
            }
        }else{
            clearScreen(currentNum);
        }
    }
})

divideBtn.addEventListener("click", function(){
    resetStyle();

    if(screenEmptyOrNot("empty", "empty")){

    }else if(screenEmptyOrNot("empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(currentNum.textContent != "Error"){
                previousNum.textContent = currentNum.textContent + " /";
                clearScreen(currentNum);
            }
        }else{
            clearScreen(currentNum);
        }
    }else if(screenEmptyOrNot("not empty", "empty")){
        previousNum.textContent = previousNum.textContent.slice(0, -2) + " /";
    }else if(screenEmptyOrNot("not empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(previousNum.textContent.slice(-2) == " -"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) - Number(currentNum.textContent);
                previousNum.textContent += " /";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " +"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) + Number(currentNum.textContent);
                previousNum.textContent += " /";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " *"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) * Number(currentNum.textContent);
                previousNum.textContent += " /";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " ^"){
                if(Number(previousNum.textContent.slice(0, -2)) ** Number(currentNum.textContent) != Infinity){
                    previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) ** Number(currentNum.textContent);
                    previousNum.textContent += " /";
                    clearScreen(currentNum);
                }else{
                    clearScreen(previousNum);
                    currentNum.textContent = "Error";
                }
            }else{
                if(Number(currentNum.textContent) == 0){
                    currentNum.textContent = "Error";
                    clearScreen(previousNum);
                }else {
                    previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) / Number(currentNum.textContent);
                    previousNum.textContent += " /";
                    clearScreen(currentNum);
                }
            }
        }else{
            clearScreen(currentNum);
        }
    }
})

powerBtn.addEventListener("click", function(){
    resetStyle();

    if(screenEmptyOrNot("empty", "empty")){

    }else if(screenEmptyOrNot("empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(currentNum.textContent != "Error"){
                previousNum.textContent = currentNum.textContent + " ^";
                clearScreen(currentNum);
            }
        }else{
            clearScreen(currentNum);
        }
    }else if(screenEmptyOrNot("not empty", "empty")){
        previousNum.textContent = previousNum.textContent.slice(0, -2) + " ^";
    }else if(screenEmptyOrNot("not empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(previousNum.textContent.slice(-2) == " +"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) + Number(currentNum.textContent);
                previousNum.textContent += " ^";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " -"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) - Number(currentNum.textContent);
                previousNum.textContent += " ^";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " *"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) * Number(currentNum.textContent);
                previousNum.textContent += " ^";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " /"){
                if(Number(currentNum.textContent) == 0){
                    currentNum.textContent = "Error";
                    clearScreen(previousNum);
                }else {
                    previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) / Number(currentNum.textContent);
                    previousNum.textContent += " ^";
                    clearScreen(currentNum);
                }
            }else if(previousNum.textContent.slice(-2) == " %"){
                previousNum.textContent = (Number(previousNum.textContent.slice(0, -2)) / 100) * Number(currentNum.textContent);
                previousNum.textContent += " ^";
                clearScreen(currentNum);
            }else{
                if(Number(previousNum.textContent.slice(0, -2)) ** Number(currentNum.textContent) != Infinity){
                    previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) ** Number(currentNum.textContent);
                    previousNum.textContent += " ^";
                    clearScreen(currentNum);
                }else{
                    clearScreen(previousNum);
                    currentNum.textContent = "Error";
                }
            }
        }else{
            clearScreen(currentNum);
        }
    }
})

factorialBtn.addEventListener("click", function(){
    resetStyle();

    if(screenEmptyOrNot("empty", "empty")){

    }else if(screenEmptyOrNot("empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(currentNum.textContent != "Error"){
                if(Number(currentNum.textContent) < 0){
                    currentNum.textContent = "Error";
                }else if(Number(currentNum.textContent) == 0){
                    currentNum.textContent = "1";
                }else{
                    if(calculateFactorial() != Infinity){
                        currentNum.textContent = calculateFactorial();
                    }else {
                        currentNum.textContent = "Error";
                    }
                }
            }
        }
    }else if(screenEmptyOrNot("not empty", "empty")){

    }else if(screenEmptyOrNot("not empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(previousNum.textContent.slice(-2) == " +"){
                if(calculateFactorial() != Infinity && calculateFactorial() != -Infinity && Number(currentNum.textContent) >= 0){
                    currentNum.textContent = Number(previousNum.textContent.slice(0, -2)) + calculateFactorial();
                    clearScreen(previousNum);
                }else {
                    clearScreen(previousNum);
                    currentNum.textContent = "Error";
                }
            }else if(previousNum.textContent.slice(-2) == " -"){
                if(calculateFactorial() != Infinity && calculateFactorial() != -Infinity && Number(currentNum.textContent) >= 0){
                    currentNum.textContent = Number(previousNum.textContent.slice(0, -2)) - calculateFactorial();
                    clearScreen(previousNum);
                }else {
                    clearScreen(previousNum);
                    currentNum.textContent = "Error";
                }
            }else if(previousNum.textContent.slice(-2) == " *"){
                if(calculateFactorial() != Infinity && calculateFactorial() != -Infinity && Number(currentNum.textContent) >= 0){
                    currentNum.textContent = Number(previousNum.textContent.slice(0, -2)) * calculateFactorial();
                    clearScreen(previousNum);
                }else {
                    clearScreen(previousNum);
                    currentNum.textContent = "Error";
                }
            }else if(previousNum.textContent.slice(-2) == " /"){
                if(calculateFactorial() != Infinity && calculateFactorial() != -Infinity && Number(currentNum.textContent) >= 0){
                    currentNum.textContent = Number(previousNum.textContent.slice(0, -2)) / calculateFactorial();
                    clearScreen(previousNum);
                }else {
                    clearScreen(previousNum);
                    currentNum.textContent = "Error";
                }
            }else if(previousNum.textContent.slice(-2) == " ^"){
                if(calculateFactorial() != Infinity && calculateFactorial() != -Infinity && Number(currentNum.textContent) >= 0){
                    currentNum.textContent = Number(previousNum.textContent.slice(0, -2)) ** calculateFactorial();
                    clearScreen(previousNum);
                }else {
                    clearScreen(previousNum);
                    currentNum.textContent = "Error";
                }
            }else if(previousNum.textContent.slice(-2) == " %"){
                if(calculateFactorial() != Infinity && calculateFactorial() != -Infinity && Number(currentNum.textContent) >= 0){
                    currentNum.textContent = (Number(previousNum.textContent.slice(0, -2)) / 100) * calculateFactorial();
                    clearScreen(previousNum);
                }
            }
        }else{
            clearScreen(currentNum);
        }
    }

    if(currentNum.textContent.length < 20){
        if(currentNum.textContent.length >= 12 && currentNum.textContent.length < 14){
            currentNum.style.fontSize = "3rem";
        }else if(currentNum.textContent.length >= 14){
            currentNum.style.fontSize = "2.5rem";
        }
    }else{
        currentNum.textContent = Number(currentNum.textContent).toPrecision(5);
    }
})

percentBtn.addEventListener("click", function(){
    resetStyle();

    if(screenEmptyOrNot("empty", "empty")){

    }else if(screenEmptyOrNot("empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(currentNum.textContent != "Error"){
                previousNum.textContent = currentNum.textContent + " %";
                clearScreen(currentNum);
            }
        }else{
            clearScreen(currentNum);
        }
    }else if(screenEmptyOrNot("not empty", "empty")){
        previousNum.textContent = previousNum.textContent.slice(0, -2) + " %";
    }else if(screenEmptyOrNot("not empty", "not empty")){
        if(currentNum.textContent != "-"){
            if(previousNum.textContent.slice(-2) == " -"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) - Number(currentNum.textContent);
                previousNum.textContent += " %";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " +"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) + Number(currentNum.textContent);
                previousNum.textContent += " %";
                clearScreen(currentNum);
            }else if(previousNum.textContent.slice(-2) == " /"){
                if(Number(currentNum.textContent) == 0){
                    currentNum.textContent = "Error";
                    clearScreen(previousNum);
                }else {
                    previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) / Number(currentNum.textContent);
                    previousNum.textContent += " %";
                    clearScreen(currentNum);
                }
            }else if(previousNum.textContent.slice(-2) == " ^"){
                if(Number(previousNum.textContent.slice(0, -2)) ** Number(currentNum.textContent) != Infinity){
                    previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) ** Number(currentNum.textContent);
                    previousNum.textContent += " %";
                    clearScreen(currentNum);
                }else{
                    clearScreen(previousNum);
                    currentNum.textContent = "Error";
                }
            }else if(previousNum.textContent.slice(-2) == " *"){
                previousNum.textContent = Number(previousNum.textContent.slice(0,-2)) * Number(currentNum.textContent);
                previousNum.textContent += " %";
                clearScreen(currentNum);
            }else {
                previousNum.textContent = (Number(previousNum.textContent.slice(0, -2)) / 100) * Number(currentNum.textContent);
                previousNum.textContent += " %";
                clearScreen(currentNum);
            }
        }else{
            clearScreen(currentNum);
        }
    }
})

equalBtn.addEventListener("click", function(){
    if(previousNum.textContent != "" && currentNum.textContent == ""){
        currentNum.textContent = previousNum.textContent.slice (0,-2);
        clearScreen(previousNum);
    }else if(previousNum.textContent != "" && currentNum.textContent != ""){
        if(currentNum.textContent != "-"){
            if(previousNum.textContent.slice(-2) == " +"){
                currentNum.textContent = Number(previousNum.textContent.slice(0, -2)) + Number(currentNum.textContent);
                clearScreen(previousNum);
            }else if(previousNum.textContent.slice(-2) == " -"){
                currentNum.textContent = Number(previousNum.textContent.slice(0, -2)) - Number(currentNum.textContent);
                clearScreen(previousNum);
            }else if(previousNum.textContent.slice(-2) == " *"){
                currentNum.textContent = Number(previousNum.textContent.slice(0, -2)) * Number(currentNum.textContent);
                clearScreen(previousNum);
            }else if(previousNum.textContent.slice(-2) == " /"){
                if(Number(currentNum.textContent) == 0){
                    currentNum.textContent = "Error";
                    clearScreen(previousNum);
                }else {
                    currentNum.textContent = Number(previousNum.textContent.slice(0, -2)) / Number(currentNum.textContent);
                    clearScreen(previousNum)
                }
            }else if(previousNum.textContent.slice(-2) == " ^"){
                if(Number(previousNum.textContent.slice(0, -2)) ** Number(currentNum.textContent) != Infinity){
                    currentNum.textContent = Number(previousNum.textContent.slice(0,-2)) ** Number(currentNum.textContent);
                    clearScreen(previousNum);
                }else{
                    clearScreen(previousNum);
                    currentNum.textContent = "Error";
                }
            }else if(previousNum.textContent.slice(-2) == " %"){
                currentNum.textContent = (Number(previousNum.textContent.slice(0, -2)) / 100) * Number(currentNum.textContent);
                clearScreen(previousNum);
            }
        }
    }

    if(currentNum.textContent.length < 20){
        if(currentNum.textContent.length >= 12 && currentNum.textContent.length < 14){
            currentNum.style.fontSize = "3rem";
        }else if(currentNum.textContent.length >= 14){
            currentNum.style.fontSize = "2.5rem";
        }
    }
})