const cartypes = [
    {
        name:"Popular", 
        imgs:
        [
            "images/cars/car_blue_1.png",
            "images/cars/car_green_1.png",
            "images/cars/car_yellow_1.png"
        ],
    },
    {
        name:"Sport", 
        imgs:
        [
            "images/cars/car_blue_5.png",
            "images/cars/car_green_5.png",
            "images/cars/car_yellow_5.png"
        ],
    },
    {
        name:"Super Sport", 
        imgs:
        [
            "images/cars/car_blue_2.png",
            "images/cars/car_green_2.png",
            "images/cars/car_yellow_2.png"
        ],
    },
];

const carprefabs = [
    {
        type:0,
        chance:.6,
        speedMin: {min:110, max:130},
        speedMax: {min:180, max:200},
        skid: {min:.03, max:.04}
    },
    {
        type:1,
        chance:.35,
        speedMin: {min:125, max:145},
        speedMax: {min:195, max:215},
        skid: {min:.02, max:.03}
    },
    {
        type:2,
        chance:.05,
        speedMin: {min:140, max:160},
        speedMax: {min:210, max:230},
        skid: {min:.01, max:.0175}
    },
];

var players = [
    {
        name: "Pedro", 
        element: null,
        cars:[], 
        level:0, points:0
    },
    {
        name: "Juca",
        element: null,
        cars:[], 
        level:0, points:0
    },
    {
        name: "Edna",
        element: null,
        cars:[], 
        level:0, points:0
    },
];

var ongamecars = [
    new Image(),
    new Image(),
    new Image(),
];

function CreateCar (p) {
    const r = Math.random();
    let n = 0;
    for(let i = 0; i < carprefabs.length; i++)
    {
        if(r > carprefabs[i].chance){
            n = i;
            break;
        }
    }
    const carprefab = carprefabs[n];
    var pCar = {
        type: carprefab.type,
        speedMin: carprefab.speedMin.min + (Math.random() * (carprefab.speedMin.max - carprefab.speedMin.min)),
        speedMax: carprefab.speedMax.min + (Math.random() * (carprefab.speedMax.max - carprefab.speedMax.min)),
        skid: carprefab.skid.min + (Math.random() * (carprefab.skid.max - carprefab.skid.min)),
        img: cartypes[carprefab.type].imgs[p]
    };
    players[p].cars.push(pCar);
}

//#region Coiso
var racemode = 
[
    {name:"Rapido", laps:10, reward:[200, 120, 50]},
    {name:"Grand Prix", laps:70, reward:[220, 130, 75]},
    {name:"Enduro", laps:160, reward:[250, 150, 90]},
];

var customTurns = 5;
const header = document.body.children[0].children[0];
const windowStart = header.children[0];
const main = document.body.children[0].children[1];
const racemodeText = document.getElementById("racemode");
const resultsBox = document.getElementById("results");
const menuBox = document.getElementById("menu");
const carreiraBox = document.getElementById("carreira");
const customBox = document.getElementById("custom");
const configurarBox = document.getElementById("configurar");
/*const canvas = document.querySelector("canvas");
const context2D = canvas.getContext("2d");*/
const gameObjetos = [];
var racing = true;

function gameloop ()
{
    if(racing) window.requestAnimationFrame(gameloop, canvas);
    //context2D.drawImage()
}

function OnChangeCustomTurn (evt){
    customTurns = parseInt(evt.target.value);
    //console.log(customTurns);
}

function Continue () 
{
    main.style.display = "none";
    windowStart.style.display = "flex";
}

for (let i = 0; i < players.length; i++){
    players[i].element = document.getElementById("player"+i);
}

//#endregion

function LevelUp(player)
{
    if(player.points < 450) {
        player.element.children[1].children[1].children[1].innerText = player.points;
        return;
    }

    player.level++;
    player.points -= 450;

    const divEl = player.element.children[1];
    divEl.children[0].children[1].innerText = player.level;
    divEl.children[1].children[1].innerText = player.points;

    LevelUp(player);
}

function CreateGame (n) 
{
    main.style.display = "flex";

    const table = [{id: 0, wins:0}, {id: 1, wins:0}, {id: 2, wins:0}];
    for(let i =0 ; i < n; i++)
    {
        let winner = -1;
        let winnerSpeed = 0;
        for(let j = 0; j < players.length; j++) 
        {
            const player = players[j];
            const car = player.cars[0];
            const speed = (1 + (player.level/100)) * ((car.speedMin + ((car.speedMax - car.speedMin)*Math.random())) * (1 - car.skid));
            if(winner == -1 || winnerSpeed < speed)
            {
                winner = j;
                winnerSpeed = speed;
            }
        }
        table[winner].wins++;
        //console.log(winner);
    }

    table.sort((a,b) => b.wins - a.wins);
    return table;
}

function Start (n) 
{
    windowStart.style.display = "none";

    for (let i = 0; i < players.length; i++)
    {
        players[i].cars = [];
        CreateCar(i);
    }

    console.log(players);
    const table = CreateGame (n);
    racemodeText.innerText = "Custom ("+n+")";
    return table;
}

function CreateSpan (text) {
    const spanEl = document.createElement("span");
    spanEl.innerText = text;
    return spanEl;
}

function ShowCarResult (lugar, result) 
{
    const player = players[result.id];
    const carname = cartypes[player.cars[0].type].name;

    const box = document.createElement("li");
    const title = document.createElement("h4");
    title.append(CreateSpan(lugar+"º"));
    title.append(CreateSpan(player.name));
    const ctEl = document.createElement("h4");
    ctEl.innerText = carname;
    const img = document.createElement("img");
    img.src = player.cars[0].img;
    box.append(ctEl);
    box.append(img);
    box.title = result.wins;
    box.append(title);
    return box;
}

function Race (i) {
    const rm = racemode[i];
    const table = Start(rm.laps);
    resultsBox.children[0]?.remove();
    const ulEl = document.createElement("ul");

    let lugar = 0;

    table.forEach(element => {
        if(lugar < 3) {
            const player = players[element.id];
            player.points += rm.reward[lugar];
            LevelUp(player);
            lugar++;    
        }
        ulEl.append(ShowCarResult(lugar, element));
    });

    resultsBox.append(ulEl);
    racemodeText.innerText = rm.name;
}

function Voltar ()
{
    carreiraBox.style = "display:none";
    customBox.style = "display:none";
    configurarBox.style = "display:none";
    menuBox.style = "display:flex";
}

function Carreira ()
{
    menuBox.style = "display:none";
    carreiraBox.style = "display:flex";
}

function Custom ()
{
    menuBox.style = "display:none";
    customBox.style = "display:flex";
}

function Configurar ()
{
    menuBox.style = "display:none";
    configurarBox.style = "display:flex";
}
