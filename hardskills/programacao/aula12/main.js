const frase = "A verdade não está la fora";
var repeticoes = 100;
var atual = 0;

const quadronegro = document.getElementById("quadro-negro");
const quadroescrita = document.getElementById("quadro-escrita");

function escritaHeight () {
    return quadroescrita.scrollHeight - 20;
}

function quadroDif (){
    return quadronegro.clientHeight - escritaHeight();
}

function EscreverQuadro () {
    let dif = quadroDif ();

    while (atual < repeticoes && dif >= 0)
    {
        quadroescrita.innerText += " " + frase;
        dif = quadroDif ();
        atual++;
    }

    while (dif < 0) {
        quadroescrita.innerText = quadroescrita.innerText.replace(frase, "");
        dif = quadroDif ();
        atual --;
    }

    return atual < repeticoes;
}

function LerQuadro () 
{
    return Math.floor(escritaHeight()/35);
}


EscreverQuadro ();
console.log(LerQuadro ());