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
        CreateTitle(avaliacao, "Então "+inputSaves[0]+"... to vendo aqui que você é trouxa. Mas você possui algum dom mágico?");
        
        let container = document.createElement("div");
        CreateLabelInput(container, "Clarevidência", "radio", "text-buy", "input1");
        CreateLabelInput(container, "Ofidioglossia", "radio", "text-buy", "input2");
        CreateLabelInput(container, "Nenhum", "radio", "text-buy", "input3");
        avaliacao.append(container);
    },
    () => {
        let container;
        switch (inputSaves[2]) {
            case "Nenhum":
                NextQuestion(null); 
                break;
            case "Clarevidência":
                CreateTitle(avaliacao, "Que legal "+inputSaves[0]+"! Então diz ai, qual o máximo de tempo no futuro você pode ver?");
                container = document.createElement("div");
                CreateLabelInput(container, "+1 segundo", "radio", "text-buy", "input1");
                CreateLabelInput(container, "+1 hora", "radio", "text-buy", "input2");
                CreateLabelInput(container, "+1 ano", "radio", "text-buy", "input3");
                avaliacao.append(container);
                break;
            case "Ofidioglossia":
                CreateTitle(avaliacao, "Que legal "+inputSaves[0]+"! E você pode falar com cobras e lagartos?");
                container = document.createElement("div");
                CreateLabelInput(container, "Apenas cobras", "radio", "text-buy", "input1");
                CreateLabelInput(container, "Apenas lagartos", "radio", "text-buy", "input2");
                CreateLabelInput(container, "Ambos", "radio", "text-buy", "input3");
                avaliacao.append(container);
                break;
            default:
                break;
        }
    },
    () => {
        CreateTitle(avaliacao, "Muito obrigado pela avaliação "+inputSaves[0]+"!");
        CreateTitle(avaliacao, "Então você comprou: "+inputSaves[1]+"!");
        
        let i2 = inputSaves[2];
        let i3 = inputSaves[3];
        let t2 = "Você é um trouxa ";
        let t3 = "";

        switch (i2) {
            case "Nenhum":
                t2 += "e não possui nenhum dom!"
                t3 = "Como você é só um trouxa, sem dom algum, jogaremos sua avaliação no lixo!"
                break;
            case "Clarevidência":
                t2 += "que possui o dom de: " + i2;
                switch (i3) {
                    case "+1 segundo":
                        t2 += " Fraca."
                        t3 = "Como você é só um trouxa, com pouco dom, jogaremos sua avaliação no lixo!"
                        break;
                    case "+1 hora":
                        t2 += " Moderada.";
                        t3 = "Como você é só um trouxa fraco, guardaremos mas não vamos ler sua avaliação!"
                        break;
                    case "+1 ano":
                        t2 += " Porreta!";
                        t3 = "Como você é um trouxa com algum dom, apreciamos sua avaliação!"
                        break;
                }
                break;
            case "Ofidioglossia":
                t2 += "que possui o dom de: " + i2 + " para " + i3;
                switch (i3) {
                    case "Apenas cobras":
                        t3 = "Como você é só um trouxa fraco, guardaremos mas não vamos ler sua avaliação!"
                        break;
                    case "Apenas lagartos":
                        t3 = "Como você é só um trouxa fraco, guardaremos mas não vamos ler sua avaliação!"
                        break;
                    case "Ambos":
                        t3 = "Como você é um trouxa com algum dom, apreciamos sua avaliação!"
                        break;
                }
                break;
            default:
                break;
        }
        
        CreateTitle(avaliacao, t2);
        CreateTitle(avaliacao, t3);
    }
];

var textIndex = 0;

var avaliacao = document.getElementById("avaliacao");

function onChangeInput(e) {
    NextQuestion(e.target);
}

function NextQuestion (input) {
    if(input != null){
        input.disabled = true;
        inputSaves.push(input.value);
    } 
    else 
    {
        inputSaves.push("");
    }
    
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