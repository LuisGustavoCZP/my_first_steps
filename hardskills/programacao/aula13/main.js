class Car {
    constructor(name, speedMin, speedMax, skid) {
        this.name = name;
        this.speedMin = speedMin;
        this.speedMax = speedMax;
        this.skid = skid;
    }

    speed () {
        return (this.speedMin + (Math.random()*(this.speedMax - this.speedMin))) * (1 - this.skid);
    }
}

function CreateRandomCar (name){
    return new Car (name, 100+Math.random()*50, 200+Math.random()*80, .1+Math.random()*.7);
}

function SortearVolta (lista) {
    let vencedor = -1;
    let maxSpeed = 0;
    for(let i = 0; i < lista.length; i++) 
    {
        const car = lista[i];
        const speed = car.speed();
        if(maxSpeed < speed) {
            maxSpeed = speed;
            vencedor = i;
        }
    }

    //console.log("O vencedor da volta é " + lista[vencedor].name);
    return vencedor;
}

function CriarMenu (parent, lmodes) {
    const menuEl = document.createElement("div");
    menuEl.id="menu";
    for(let i = 0; i < lmodes.length; i++){
        const item = lmodes[i];
        const itemEl = document.createElement("button");
        
        itemEl.innerText = item.name;
        itemEl.onclick = x=> {
            menuEl.remove();
            item.start();
        };
        menuEl.append(itemEl);
    }
    parent.append(menuEl);
}

function CriarInput (title, type, value, onchange) {
    const menuEl = document.createElement("span");

    const id = "input-"+type;
    const label = document.createElement("label");
    label.htmlFor = id;
    label.innerText = title; //
    menuEl.append(label);

    const input = document.createElement("input");
    input.id = id;
    input.type = type;
    input.value = value;
    input.min = 1;
    input.max = 10000;
    input.onchange = onchange
    menuEl.append(input);

    return menuEl;
}

function CriarMenuCustom (parent) {
    const menuEl = document.createElement("div");
    menuEl.id="menu";
    
    menuEl.append(CriarInput("Nº de voltas: ", "number", customVoltas, x => {customVoltas = parseInt(x.target.value);}));
    menuEl.append(CriarInput("Random Cars: ", "checkbox", customRandom, x => {customRandom = x.target.checked;}));
    
    const itemEl = document.createElement("button");
    itemEl.innerText = "Iniciar";
    itemEl.onclick = x=> {
        menuEl.remove();
        IniciarCorrida(customVoltas);
    };
    menuEl.append(itemEl);

    parent.append(menuEl);
}

var cars = [
    new Car ("Pedro", 150, 230, .03),
    new Car ("Juca", 120, 260, .05),
    new Car ("Edna", 180, 220, .01),
];

var randomcars = [
    CreateRandomCar("Pedro"),
    CreateRandomCar("Juca"),
    CreateRandomCar("Edna"),
];

var corridas = [
    {name:"Corrida rápida", start:() => IniciarCorrida (10)},
    {name:"Grande Prêmio", start:() => IniciarCorrida (70)},
    {name:"Enduro", start:() => IniciarCorrida (160)},
    {name:"Corrida custom", start:() => IniciarCustom ()}
];

var customRandom = false;
var customVoltas = 1;

function IniciarCustom () {
    CriarMenuCustom (containerEl);
}

function CheckWinner (wins) {
    let winner = -1;
    for(let i = 0; i < wins.length; i++) {
        if(winner < 0 || wins[i] > wins[winner]){
            winner = i;
        }
    }
    return winner;
}

function IniciarCorrida (voltas) 
{
    const racecars = customRandom ? randomcars : cars;
    let wins = [];
    for (let i = 0; i < racecars.length; i++){
        wins.push({id:i, win:0});
    }

    for(let i = 0; i < voltas; i++)
    {
        wins[SortearVolta(racecars)].win ++;
    }
 
    wins.sort((a, b) => b.win - a.win);

    ShowColocacao(wins, racecars);
}

function ShowColocacao (wins, racecars) 
{
    const pel = document.createElement("div");
    pel.id = "result";

    const wel = document.createElement("h3");
    wel.innerText = "O Vencedor é: " + racecars[wins[0].id].name + "!";
    pel.append(wel);

    for(let i = 0; i < wins.length; i++)
    {
        const winner = wins[i];
        const el = document.createElement("h4");
        el.innerText = (i+1) + "º: " + racecars[winner.id].name + " ("+ winner.win +" Laps)";
        pel.append(el);
    }

    containerEl.append(pel);
}

const containerEl = document.getElementById("container");
CriarMenu(containerEl, corridas);
//SortearVolta(cars);