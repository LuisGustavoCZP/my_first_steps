const frase = "A verdade não está la fora";
var repeticoes = 100;
var linhas = 0;

const quadronegro = document.getElementById("quadro-negro");
const quadroescrita = document.getElementById("quadro-escrita");
var inputrepeat;

function CriarInputRepeticoes () {
    inputrepeat = document.createElement("input");
    inputrepeat.
}

//#region Sistema A 
function escritaHeight () {
    return quadroescrita.scrollHeight - 20;
}

function quadroDif (){
    return quadronegro.clientHeight - escritaHeight();
}

function LerQuadro () 
{
    return Math.floor(escritaHeight()/35);
}

function EscreverQuadroA () {
    let dif = quadroDif ();

    while (repeticoes > 0 && dif >= 0)
    {
        quadroescrita.innerText += " " + frase;
        dif = quadroDif ();
        repeticoes--;
    }

    while (dif < 0) {
        quadroescrita.innerText = quadroescrita.innerText.replace(frase, "");
        dif = quadroDif ();
        repeticoes++;
    }
    
    linhas += LerQuadro();

    return repeticoes > 0;
}

function CreateText (text, type)
{
    
}
//#endregion

//#region Sistema A
function EscreverQuadroB () {
    let dif = 0;
    while (repeticoes > 0 && dif < 11)
    {
        quadroescrita.innerText += " " + frase;
        dif = quadroDif ();
        repeticoes--;
        dif++;
    }
    return dif;
}
//#endregion

EscreverQuadro ();
console.log(LerQuadro ());
