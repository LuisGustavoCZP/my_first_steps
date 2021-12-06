const cartypes = [
    {
        name:"Popular", 
        imgs:["images/cars/car_blue_1.png"],
    },
    {
        name:"Sport", 
        imgs:["images/cars/car_green_5.png"],
    },
    {
        name:"Super Sport", 
        imgs:["images/cars/car_yellow_2.png"],
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
    {name: "Pedro", cars:[]},
    {name: "Juca", cars:[]},
    {name: "Edna", cars:[]},
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
    };
    players[p].cars.push(pCar);
}

var customTurns = 5;
const header = document.body.children[0].children[0];
const windowStart = header.children[1];
const main = document.body.children[0].children[1];
const winnerText = document.getElementById("winner");

function OnChangeCustomTurn (evt){
    customTurns = parseInt(evt.target.value);
    //console.log(customTurns);
}

function Back() 
{
    main.style.display = "none";
    windowStart.style.display = "flex";
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
            const car = players[j].cars[0];
            const speed = (car.speedMin + ((car.speedMax - car.speedMin)*Math.random())) * car.skid;
            if(winner == -1 || winnerSpeed < speed)
            {
                winner = j;
                winnerSpeed = speed;
            }
        }
        table[winner].wins++;
        //console.log(winner);
    }
    table.sort((a,b) => b.wins - a.wins)
    winnerText.innerText = players[table[0].id].name;
}

function Start (n) 
{
    windowStart.style.display = "none";

    for (let i = 0; i < players.length; i++)
    {
        CreateCar(i);
    }

    CreateGame (n);
    
    console.log(players);
}

