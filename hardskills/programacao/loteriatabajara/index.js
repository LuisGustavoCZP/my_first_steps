const resultBox = document.getElementById("winners");

const maxRounds = 6;
var defaultRow = 
[
    01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60
]
var row = [];
var managerID = 0;
var results = [];
var round = 0;

function startPlay () {
    resultBox.innerHTML = "";
    round = 0;
    managerID = setInterval(playing, 1000);
    row = Array.from(defaultRow);//Array.from({length: 60}, (_, i) => i + 1);
}

function intText(number) {
    return (number < 10 ? '0' : '') + number
}

function drawBall (num) {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.innerText = intText(num);
    return ball;
}

function playing () {
    console.log(row);

    const r = parseInt(Math.random()*row.length);
    const num = row[r];

    resultBox.append(drawBall(num));

    results.push(num);
    row.splice(r, 1);

    console.log(results);
    if(++round >= maxRounds) clearInterval(managerID);
}