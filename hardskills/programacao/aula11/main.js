function loadResults (e) {
    let resultLine = window.location.search;
    if(resultLine == "") return;

    resultLine = resultLine.replace("?", "");
    let results = resultLine.split("&");
    results.forEach(result => 
    {
        let keypair = result.split("=");
        let key = keypair[0].split("-")[0];
        if(key == "submitit") {
            values[key] = keypair[1];
            values.length++;
        } else 
        {
            if(!values.hasOwnProperty(key)){
                values[key] = [parseFloat(keypair[1])];
                values.length++;
            } else {
                values[key].push(parseFloat(keypair[1]));
            }
        }
    });
    createResults ();
}

function createResults () {
    console.log(values);
    let totalcost = 0;

    for(let key in values)
    {
        const value = values[key];
        for (let i = 0; i < value.length; i++) {
            totalcost += FindCost(key, value[i]);
        }
    };

    document.getElementById("resultCost").innerText = totalcost;
    console.log(totalcost);
}

function FindCost (name, value) {
    for(let i = 0; i < cardapio.length; i++) {
        const categoria = cardapio[i];
        if(categoria.name == name) 
        {
            return categoria.items[value-1].custo;
        } 
    }
    return 0;
}

function CreateElement (tag, text) 
{
    let el = document.createElement(tag);
    el.innerText = text;
    return el;
}

function CreateLabel (id, text, icon) 
{
    let el = document.createElement("label");
    let iconel = document.createElement("img");
    iconel.src = icon;
    el.append(CreateElement("h4", text))
    el.append(iconel);
    el.htmlFor = id;
    return el;
}

function CreateRadio (text, name, value, icon) 
{
    let id = name+value;
    let div = document.createElement("div");
    let label = CreateLabel(id, text, icon);
    let radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.id = id;
    radioInput.name = name;
    radioInput.value = value;
    div.append(label, radioInput);
    return div;
}

function CreateCheckbox (text, name, value, icon) 
{
    let id = name+value;
    let div = document.createElement("div");
    let label = CreateLabel(id, text, icon);
    let radioInput = document.createElement("input");
    radioInput.type = "checkbox";
    radioInput.id = id;
    radioInput.name = name;
    radioInput.value = value;
    div.append(label, radioInput);
    return div;
}

function FillItems () {
    for(let i = 0; i < cardapio.length; i++) 
    {
        let categoria = cardapio[i];
        let categoriaElemento = document.getElementById(categoria.name);
        categoriaElemento.append(CreateElement("h2", categoria.text));
        let div = document.createElement("div");
        categoriaElemento.append(div);
        for(let j = 0; j < categoria.items.length; j++) 
        {
            const item = categoria.items[j];
            let el;
            if(item.unico) {
                el = CreateRadio(item.text, item.name, j+1, item.icon);
                const iput = el.children[1];
                iput.required = true;
                iput.onchange = x => {
                    let others = categoriaElemento.querySelectorAll('input');
                    for(let k = 0; k < others.length; k++){
                        let other = others[k];
                        if(x.target == other) continue;
                        other.checked = false;
                    }
                }
            } else {
                el = CreateCheckbox(item.text, item.name+"-"+j, j+1, item.icon);
                const iput = el.children[1];
                iput.onchange = x => {
                    console.log(x.target.id + " = " + iput.id);
                    if(x.target.id != iput.id) return;
                    const otherBoxes = categoriaElemento.querySelectorAll('input[type="checkbox"]');
                    const otherRadios = categoriaElemento.querySelectorAll('input[type="radio"]');
                    let theLast = true;
                    for (let i = 0; i < otherBoxes.length; i++) {
                        const other = otherBoxes[i];
                        if(x.target == other) continue;
                        if(other.checked) {
                            theLast = false;
                            break;
                        }
                    }
    
                    for(let k = 0; k < otherRadios.length; k++){
                        const other = otherRadios[k];
                        if(x.target == other) continue;
                        other.checked = false;
                        if(x.target.checked)  {
                            other.required = false;
                        } else if(theLast) {
                            other.checked = true;
                        }
                    }
                }
            }
            div.append(el);
        }
    }
}

function OnCancel () {
    window.location.search = "";
}

var cardapio = 
[
    {
        name:"pao",
        text:"Escolha seu Pão:",
        items: [
            {
                text:"Pão francês (R$3,00)",
                name:"pao",
                icon:"images/pao/pao-frances.jpg",
                custo:3,
                unico:true
            }, 
            {
                text:"Pão Australiano (R$8,00)",
                name:"pao",
                icon:"images/pao/pao-australiano.jpg",
                custo:8,
                unico:true
            }, 
            {
                text:"Pão de Brioche (R$6,00)",
                name:"pao",
                icon:"images/pao/pao-brioche.jpg",
                custo:6,
                unico:true
            },
        ]
    },
    {
        name:"salada",
        text:"Escolha sua Salada:",
        items: [
            {
                text:"Alface (R$1,50)",
                name:"salada",
                icon:"images/salada/alface.png",
                custo:1.5,
                unico:false
            }, 
            {
                text:"Tomate (R$1,50)",
                name:"salada",
                icon:"images/salada/tomate.jpg",
                custo:1.5,
                unico:false
            }, 
            {
                text:"sem salada (R$0,00)",
                name:"salada",
                icon:"images/salada/semsalada.jpg",
                custo:0,
                unico:true
            },
        ]
    },
    {
        name:"queijo",
        text:"Escolha seu Queijo:",
        items: [
            {
                text:"Mussarela (R$3,00)",
                name:"queijo",
                icon:"images/queijo/queijo-mussarela.jpg",
                custo:3,
                unico:true
            }, 
            {
                text:"Prato (R$3,00)",
                name:"queijo",
                icon:"images/queijo/queijo-prato.png",
                custo:3,
                unico:true
            }, 
            {
                text:"Cheddar (R$5,00)",
                name:"queijo",
                icon:"images/queijo/queijo-cheddar.jpg",
                custo:5,
                unico:true
            },
        ]
    },
    {
        name:"hamburguer",
        text:"Escolha seu Hamburguer:",
        items: [
            {
                text:"Picanha (R$13,00)",
                name:"hamburguer",
                icon:"images/burguer/picanha.png",
                custo:13,
                unico:true
            }, 
            {
                text:"Costela (R$10,00)",
                name:"hamburguer",
                icon:"images/burguer/costela.png",
                custo:10,
                unico:true
            }, 
            {
                text:"Vegano (R$12,00)",
                name:"hamburguer",
                icon:"images/burguer/soja.png",
                custo:12,
                unico:true
            },
        ]
    }
];

var values = [];

window.onload = loadResults;

FillItems ();