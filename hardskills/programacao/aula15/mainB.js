class Tile {
    constructor(x, y, value, element) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.element = element;
    }
}

const main = document.body.children[0];
const windowWinner = main.children[0];
const windowStart = main.children[1];
const players = [[0, 0, "o"], [1, 0, "x"]];
var tilemap = [];
var player = 0;
var turns = 0;

function CheckWinner1 ()
{
    const s = tilemap.length;

    let d1player = -1;
    let d2player = -1;
    let hplayer = -1;
    let vplayer = -1;

    for (let i = 0; i < s; i++)
    {
        for (let j = 0; j < s; j++)
        {
            const tileh = tilemap[i][j];
            if (i == j)
            {
                //console.log("Check D1 (" + i + ":" + j + ") = " + d1player + " != " + tileh.value);
                if(i == 0) d1player = tileh.value;
                else if(tileh.value != d1player) d1player = -1;
            }

            if (i + j == s-1)
            {
                //console.log("Check D2 (" + i + ":" + j + ") = " + d2player + " != " + tileh.value);
                if(i == 0) d2player = tileh.value;
                else if(tileh.value != d2player) d2player = -1;
            }
            
            if (j == 0) hplayer = tileh.value;
            else if(tileh.value != hplayer) hplayer = -1;
            
            const tilev = tilemap[j][i];
            if (j == 0) vplayer = tilev.value;
            else if(tilev.value != vplayer) vplayer = -1;
        }

        if(hplayer != -1) 
        {
            console.log("H " + i + " = " + hplayer);
            return hplayer;
        } else
        if(vplayer != -1) 
        {
            console.log("V " + i + " = " + vplayer);
            return vplayer;
        }
    }
    if(d1player != -1) 
    {
        //console.log("D1 " + " = " + d1player);
        return d1player;
    } else
    if(d2player != -1) 
    {
        //console.log("D2 " + " = " + d2player);
        return d2player;
    }
    return -1;
}

function ActPlayer ()
{
    const p = players[player++];
    if(player >= players.length) player = 0;
    return p;
}

function CheckWinner (tile){
    let winMode = 15;
    const s = tilemap.length;
    for(let i = 0; i < s; i++)
    {
        const othertile = tilemap[i][tile.y];
        if(othertile.value != tile.value)
        {
            winMode -= 1;
            break;
        }
    }
    for(let i = 0; i < s; i++)
    {
        const othertile = tilemap[tile.x][i];
        if(othertile.value != tile.value)
        {
            winMode -= 2;
            break;
        }
    }
    for(let i = 0; i < s; i++)
    {
        const othertile = tilemap[i][i];
        if(othertile.value != tile.value)
        {
            winMode -= 4;
            break;
        }
    }
    for(let i = 0; i < s; i++)
    {
        const othertile = tilemap[s-i][i];
        if(othertile.value != tile.value)
        {
            winMode -= 8;
            break;
        }
    }
    return winMode;
}

function TileAction (tile) {
    const p = ActPlayer();
    tile.value = p[0];
    tile.element.classList.add(p[2]);
    /*const c = document.createElement("h3");
    c.innerText = p[3];
    tile.element.append(c);*/
    /*
    const w = CheckWinner (tile);
    if(w != 0) OpenWinner(w, p);*/
    const w = CheckWinner1 ();
    if(w != -1) OpenWinner(1, players[w]);
    else if(turns >= Math.pow(tilemap.length, 2)-1) OpenWinner(0, null);
    turns++;
}

function OpenWinner(winmode, winner) {
    windowWinner.style.display = "flex";
    const h2 = windowWinner.children[0];
    
    const span1 = h2.children[0];
    const span2 = document.createElement("span");
    h2.append(span2);
    span2.classList.remove(["x", "o"]);
    span1.innerText = "Winner ";
    if(winmode != 0) {
        span2.innerText = "Player " + winner[0];
        span2.classList.add(winner[2]);
    } else {
        span2.innerText = "Ninguem";
    }
}

function OnClickTile (tile) 
{
    tile.element.classList.add("marcado");
    tile.element.onclick = null;
    TileAction(tile);
}

function CreateTiles (n)
{
    const ulel = document.createElement("ul");
    ulel.style = "grid-template-columns:repeat("+n+", 1fr)";
    for(let i = 0; i < n; i++)
    {
        const tilerow = [];
        tilemap.push(tilerow);

        for(let j = 0; j < n; j++){;
            const liel = document.createElement("li");
            const sub = document.createElement("div");
            const tile = new Tile(i, j, -1, sub);
            tilerow.push(tile);
            liel.onclick = x=>{OnClickTile(tile)};
            liel.append(sub);
            ulel.append(liel);
        }
    }
    main.append(ulel);
    console.log(tilemap);
} 

function Restart ()
{
    turns = 0;
    tilemap = [];
    main.children[2].remove();
    const h2 = windowWinner.children[0];
    h2.children[1].remove();
    windowStart.style.display = "flex";
    windowWinner.style.display = "none";
}

function Start (n) 
{
    windowStart.style.display = "none";
    CreateTiles(n);
}
