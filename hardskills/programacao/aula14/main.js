function InvertOrder (array)
{
    const t = Math.floor(array.length/2)-1;
    for(let i = 0; i <= t; i++){
        const item = array[i];
        const n = (array.length-1) - i;
        array[i] = array[n];
        array[n] = item;
    }
}

function ReOrder (array)
{
    for(let i = 1; i < array.length; i++){
        const item = array[i];
        let j = i -1;
        while (item < array[j]) 
        {
            array[j+1] = array[j];
            j--;
        }
        array[j+1] = item;
    }
}

function AssingInputs () {
    const parent = document.getElementById("inputs");
    for(let i = 0; i < array.length; i++)
    {
        let n = i;
        const inputEl = parent.children[i];
        inputEl.value = array[n];
        inputEl.onchange = x => 
        {
            array[n] = parseFloat(x.target.value);
            console.log(n + " => " + array[n]);
        };
    }
}

function ShowValues () {
    const parent = document.getElementById("values");
    for(let i = 0; i < array.length; i++)
    {
        let n = i;
        const el = parent.children[i];
        el.innerText = array[n];
    }
}

function OnClickInvert () {
    InvertOrder(array);
    ShowValues ();
}

function OnClickOrder () {
    ReOrder(array);
    ShowValues ();
}

let array = [1,2,3,4];

AssingInputs();
ShowValues ();