var players = [["one", 0, 0], ["two", 1, 0]];
var conditions = [];
var player = 0;

function CreateWinnerConditions (n) {
    let t = 0;
    for(let k = 0; k < n; k++)
    {
        let v = 0;
        let h = 0;
        let s = 0;
        for(let i = 0; i < n; i++)
        {
            for(let j = 0; j < n; j++, t++)
            {
                if(i==j) s+=pow(2^t);
                
            }
        }
        conditions.push();
    }
}

function CheckWinner ()
{
    for (let i = 0; i < players.length; i++)
    {
        const p = players[i];
        
    }
}

function ActPlayer ()
{
    const p = players[player++];
    if(player >= players.length) player = 0;
    return p;
}

function OnClickTile (evt, i) 
{
    const p = ActPlayer();
    p[2] += Math.pow(2, i);
    evt.target.classList.add("marcado");
    evt.target.classList.add(p[0]);
    evt.target.onclick = null;
    CheckWinner ();
}

function CreateTiles (n)
{
    let ulel = document.body.children[1].children[0];
    const d = 100/n;
    ulel.style = "grid-template-columns:repeat("+n+", "+d+"%); grid-template-rows:repeat("+n+", "+d+"%);";
    for(let i = 0; i < n*n; i++)
    {
        const j = i;
        const liel = document.createElement("li");
        liel.onclick = x=>{OnClickTile(x, j)};
        ulel.append(liel);
    }
} 

const size = 10;
CreateTiles(size);
