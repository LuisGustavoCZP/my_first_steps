var inputSaves = [];

var inputs = [
    () => {
        CreateTitle(avaliacao, "Diga-nos seu nome");
        
        //CreateLabel(avaliacao, "Diga-nos seu nome", "input0");
        CreateInput(avaliacao, "text", "text-nome", "input0", "");
    },
    () => {
        CreateTitle(avaliacao, "Olá "+inputSaves[0]+", o que você comprou?");
        
        let container = document.createElement("div");
        CreateLabelInput(container, "Varinha", "radio", "text-buy", "input1");
        CreateLabelInput(container, "Nimbus 2000", "radio", "text-buy", "input2");
        CreateLabelInput(container, "Chapeu", "radio", "text-buy", "input3");
        avaliacao.append(container);
    },
    () => {
        CreateTitle(avaliacao, "Muito obrigado pela avaliação "+inputSaves[0]+"!");
        CreateTitle(avaliacao, "Então você comprou a "+inputSaves[1]+"!"); 
    }
];

var textIndex = 0;

var avaliacao = document.getElementById("avaliacao");

function onChangeInput(e) {
    e.target.disabled = true;
    inputSaves.push(e.target.value);
    
    avaliacao.classList.add("fadeout");
    setTimeout(()=>{DeleteLast()}, 1000);
}

function DeleteLast() {
    avaliacao.classList.remove("fadeout");
    for (i = avaliacao.childElementCount-1; i >= 0; i--){
        let el = avaliacao.children[i];
        el.remove();
    }
    
    inputs[++textIndex]();
    for (i = 0; i < avaliacao.childElementCount; i++){
        avaliacao.children[i].disabled = true;
    }

    avaliacao.classList.add("fadein");
    setTimeout(()=>{CreateNew()}, 1000);
}

function CreateNew() {
    avaliacao.classList.remove("fadein");
    for (i = 0; i < avaliacao.childElementCount; i++){
        avaliacao.children[i].disabled = false;
    }
}

function CreateTitle (container, txt) {
    let ti = document.createElement("h3");
    ti.innerText = txt;
    container.append(ti);
}

function CreateLabel (container, labeltxt, id) {
    let label = document.createElement("label");
    label.innerText = labeltxt;
    label.htmlFor = id;
    container.append(label);
}

function CreateInput (container, type, name, id, value) {
    let input = document.createElement("input");
    input.type = type;
    input.name = name;
    if(value != "") input.value = value;
    input.id = id;
    input.onchange = onChangeInput;
    container.append(input);
}

function CreateLabelInput (container, labeltxt, type, name, id) {
    let span = document.createElement("span");
    CreateLabel(span, labeltxt, id);
    CreateInput(span, type, name, id, labeltxt);
    container.append(span);
}

inputs[textIndex]();