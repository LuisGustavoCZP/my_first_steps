const cheatBox = document.getElementById("cheat");
headers.push(cheatBox);
const cheatSaida = document.getElementById("cheat-saida");
const cheatEntrada = document.getElementById("cheat-entrada");
let cheatmode = false;

async function CarregarCompras () {
    const loaded = JSON.parse(cheatEntrada.value);
    loaded.forEach(x => {compras.push(x); DesenharCompra (x);});
}

async function CarregarCompras (text) {
    const loaded = JSON.parse(text);
    loaded.forEach(x => {
        const nx = x;
        nx.vencimento = ParseData(x.vencimento);
        compras.push(nx); DesenharCompra (nx);
    });
}

async function SalvarCompras () {
    cheatSaida.textContent = JSON.stringify(compras);
}

function TestLoad () {
    LoadJSON("testdata.json", CarregarCompras);
}

console.log(headers);