function CarType(name, imgs) {
    this.name = name;
    this.imgs = imgs;
}

const cartypes = [
    new CarType("Popular", ["images/cars/car_blue_1.png"]),
    new CarType("Sport", ["images/cars/car_green_5.png"]),
    new CarType("Popular", ["images/cars/car_yellow_2.png"]),
];

function Car(type, speed, skidMin, skidMax) {
    this.type = type;
    this.speed = speed + (Math.random()*20-10);
    this.skidMin = skidMin;
    this.skidVar = skidMax - skidMin;

    this.randomSpeed = () => {return (this.speed + (Math.random()*70-35))*(this.skidMin+(Math.random()*this.skidVar))};
}

function Player(name, cars) {
    this.name = name;
    this.cars = cars;
}

function CarPath () {

} 

var cars = 
[
    new Car([0, 0], 155, .03, .04),
    new Car([1, 0], 170, .02, .03),
    new Car([2, 0] , 185, .01, .0175),
];

var players = [    
    new Player("Pedro", []),
    new Player("Juca", []),
    new Player("Edna", []),
];

function RandomCar () {
    const r = Math.random();
    if(r < .6) return 0;
    else if(r < .95) return 1;
    else return 2;
}

var customTurns = 5;
const header = document.body.children[0].children[0];
const windowStart = header.children[1];
const main = document.body.children[0].children[1];
const winnerText = document.getElementById("winner");

function OnChangeCustomTurn (evt){
    customTurns = parseInt(evt.target.value);
    console.log(customTurns);
}

function Back() {
    main.style.display = "none";
    windowStart.style.display = "flex";
}

function CreateGame (n) {
    main.style.display = "flex";
    const table = [{id: 0, wins:0}, {id: 1, wins:0}, {id: 2, wins:0}];
    for(let i =0 ; i < n; i++)
    {
        let winner = -1;
        let winnerSpeed = 0;
        for(let j = 0; j < players.length; j++) 
        {
            const speed = players[j].cars[0].randomSpeed();
            if(winner == -1 || winnerSpeed < speed)
            {
                winner = j;
                winnerSpeed = speed;
            }
        }
        table[winner].wins++;
        console.log(winner);
    }
    table.sort((a,b) => b.wins - a.wins)
    winnerText.innerText = players[table[0].id].name;
}

function Start (n) 
{
    windowStart.style.display = "none";

    for (let i = 0; i < players.length; i++)
    {
        players[i].cars = [];
        players[i].cars.push(cars[RandomCar()]);
        
    }

    CreateGame (n);
    
    console.log(players);
}

