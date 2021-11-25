var formElement = document.forms["calculator"];
var resultBox = document.getElementById("resultBox");
let valueaInput = document.getElementById("valuea");
let valuebInput = document.getElementById("valueb");
formElement.onsubmit = validateForm;
window.onload = loadResults;

function operatiorResult (operator, valuea, valueb) {
    switch (operator) {
        case "%2B": //+
            return valuea + valueb;
        case "-":
            return valuea - valueb;
        case "*":
            return valuea * valueb;
        case "%2F": // /
            if(valueb == 0) return 0;
            return valuea / valueb;
        case "%5E": // ^
            let result = valuea;
            if(valueb == 0) return 1;
            for (i = 1; i < valueb; i++) {
                result *= valuea;
            }
            return result;
        case "%25": // %
            if(valueb == 0) return 0;
            return valuea - (Math.floor(valuea / valueb)*valueb);
        default:
            return 0;
    }
}

function loadResults (e) {
    let resultLine = window.location.search;
    if(resultLine == "") return;

    resultLine = resultLine.replace("?", "");
    let results = resultLine.split("&");
    let resulta = results[0].replace("valuea=", "");
    let resultb = results[1].replace("valueb=", "");
    let operator = results[2].replace("operator=", "");
    let valuea = parseInt(resulta);
    let valueb = parseInt(resultb);
    valueaInput.value = valuea;
    valuebInput.value = valueb;
    let result = operatiorResult(operator, valuea, valueb);
    resultLine = resulta + " " + operator + " " + resultb;
    console.log(resultLine + " = " + result);
    result = result.toFixed(1);
    resultBox.innerText = result;
}

function validateForm () 
{
    let valida = formElement["valuea"] != "" && formElement["valuea"] != undefined;
    let validb = formElement["valueb"] != "" && formElement["valueb"] != undefined;
    if(valida && validb) {
        return true;
    } else if(validb) {
        resultBox.innerText = "Você precisa adicionar um valor ao primeiro campo";
    } else {
        resultBox.innerText = "Você precisa adicionar um valor ao segundo campo";
    }

    return false;
}