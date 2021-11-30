const quadronegro = document.getElementById("quadro-negro");
const showquadros = document.getElementById("quadros");
const showlinhas = document.getElementById("linhas");
const frase = "A verdade não está la fora";

var repeticoes = 0;
var quadros = 0;
var linhas = 0;
var letras = 0;
var writewait = 50;
var quadroescrita;

function CriarQuadro (id) {
    let quadro = document.createElement("div");
    quadro.id = id;
    return quadro;
}

function CriarInputRepeticoes () {
    let id = "input-repeticoes";
    let span = document.createElement("span");
    let label = document.createElement("label");
    label.innerText = "Repeticoes"
    label.htmlFor = id;
    span.append(label);
    repeticoes = 12;
    let inputrepeat = document.createElement("input");
    inputrepeat.id = id;
    inputrepeat.type="number";
    inputrepeat.value = repeticoes;
    inputrepeat.onchange = MudarRepeticoes;
    span.append(inputrepeat);
    return span;
}

function CriarInputRange (min, max) {
    let id = "input-range-"+min+"-"+max;
    let span = document.createElement("span");
    let label = document.createElement("label");
    label.innerText = "Velocidade"
    label.htmlFor = id;
    span.append(label);
    let inputrepeat = document.createElement("input");
    inputrepeat.id = id;
    inputrepeat.type="range";
    inputrepeat.value = (min + max)/2;
    inputrepeat.min = min;
    inputrepeat.max = max;
    inputrepeat.onchange = MudarSpeed;
    span.append(inputrepeat);
    return span;
}

function CriarButtonStart (text) {
    let buttonEl = document.createElement("button");
    buttonEl.innerText = text;
    buttonEl.onclick = x=>
    {
        quadroescrita.remove();
        quadroescrita = CriarQuadro ("quadro-escrita");
        quadronegro.append(quadroescrita);
        ExecutarRepeticoes ();
    };
    return buttonEl;
}

function CreateText (text, type)
{
    let textEl = document.createElement(type);
    textEl.innerText = text;
    return textEl;
}

function MudarRepeticoes (x) {
    let i = parseInt(x.target.value);
    if(i <= 0) {
        x.target.value = repeticoes;
        return; 
    }
    if(i > 500) {
        x.target.value = repeticoes;
        return;
    }
    repeticoes = i;
}

function TransformaSpeed (valor)
{
    writewait = 50/(valor/5);
}

function MudarSpeed (x) {
    TransformaSpeed(parseFloat(x.target.value));
}

async function ExecutarRepeticoes ()
{
    quadros = 0;
    showquadros.innerText = "Quadros: " + quadros;
    while(repeticoes > 0) 
    {
        linhas = 0;
        await EscreverQuadroB ();
        await timeoutasync (writewait*10);
        quadroescrita.remove();
        
        showquadros.innerText = "Quadros: " + quadros;
        quadros++;
        
        quadroescrita = CriarQuadro ("quadro-escrita");
        quadronegro.append(quadroescrita);
    }

    await timeoutasync (writewait*50);
    quadroescrita.remove();
    CreateStartOptions ();
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
//#endregion

//#region Sistema B
function timeoutasync (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function EscreverQuadroB () {
    linhas = 0;
    showlinhas.innerText = "Linhas: " + linhas;

    while (repeticoes > 0 && linhas < 11)
    {
        let t = CreateText("", "h3");
        quadroescrita.append(t);
        letras = 0;
        
        while(letras < frase.length)
        {
            await EscreverLetraB(t);
        }
        repeticoes--;
    
        linhas++;
        showlinhas.innerText = "Linhas: " + linhas;
    }
}

async function EscreverLetraB (el) 
{
    el.innerText = frase.slice(0, letras+1);
    await timeoutasync(writewait);
    letras++;
}
//#endregion

//EscreverQuadroB ();

function CreateStartOptions () {
    quadroescrita = CriarQuadro("quadro-input");
    let speedEl = CriarInputRange (1, 50);
    quadroescrita.append(speedEl);
    TransformaSpeed(parseFloat(speedEl.children[1].value));
    quadroescrita.append(CriarInputRepeticoes ());
    quadroescrita.append(CriarButtonStart ("Iniciar"));
    quadronegro.append(quadroescrita);
}

CreateStartOptions ();