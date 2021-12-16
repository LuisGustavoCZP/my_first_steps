const registroBox = document.getElementById("registro");
const cheatBox = document.getElementById("cheat");
const comprasBox = document.getElementById("compras");
const dividaBox = document.getElementById("dividas");

const inputs = [
    document.getElementById("compra-cliente"),
    document.getElementById("compra-vencimento"),
    document.getElementById("compra-valor"),
]
const logOutput = document.getElementById("log");
function ClientLog (text, bool) {
    logOutput.textContent = text;
    logOutput.classList.toggle("error", !bool);
    logOutput.classList.toggle("sucess", bool);
}

const cheatSaida = document.getElementById("cheat-saida");
const cheatEntrada = document.getElementById("cheat-entrada");
let cheatmode = false;
function SwitchMode () {
    cheatmode = !cheatmode;
    registroBox.classList.toggle("hidden");
    cheatBox.classList.toggle("hidden");
}

async function CarregarCompras () {
    const loaded = JSON.parse(cheatEntrada.value);
    loaded.forEach(x => {compras.push(x); DesenharCompra (x);});
}

async function SalvarCompras () {
    /*let jsontext = compras.reduce((txt, el) => 
    {
        jsontext += ;
    });*/
    cheatSaida.textContent = JSON.stringify(compras);
}

const compras = [];
let dividas = [];
const diasMes = 
[
    31, 28, 31,
    30, 31, 30,
    31, 31, 30,
    31, 30, 31
];

function Money(num) {
    return num.toLocaleString("pt-br", { style: 'currency', currency: 'BRL' });
}

function BoxCompra (compra) 
{
    return "<span>" +
                    "<h5>" + compra.vencimento.dia + "/" + compra.vencimento.mes + "/" + compra.vencimento.ano + "</h5>" +
                    "<h4>" + Money(parseInt(compra.valor)) + "</h4>" +
           "</span>";
}

function QuadCompra (compra) 
{
    return "<li>" +
                "<h3>" + compra.cliente + "</h3>" +
                "<div>" + BoxCompra(compra)  + "</div>" +
           "</li>"
    ;
}

function BoxDivida (divida) 
{
    return "<div>" +
                BoxCompra(divida.compra) +
                "<span>" +
                            "<h5>" + (divida.divida.total*100).toFixed(2) + "%</h5>" +
                            "<h4>" + Money(divida.divida.valor) + "</h4>" +
                "</span>" +
                "<h3>" + Money(parseFloat(divida.valor)) + "</h3>" + 
            "</div>"
    ;
}

function QuadDivida (divida) 
{
    return "<li>" +
                "<h3>" + divida.compra.cliente + "</h3>" +
                BoxDivida(divida) +
           "</li>"
    ;
}

function GroupDivida (title, array) 
{
    const dividaGroup = array.reduce((p, divida) => 
    { 
        p.html += QuadDivida(divida);
        p.total += parseFloat(divida.valor);
        return p;//"<li>" + Boxdivida(x) + "</li>";
    }, {html:"", total:0});
    return "<li class='grupo'>" +
                "<h3>" + title + "</h3>" +
                "<ul>" + dividaGroup.html + "</ul>" +
                "<h3>" + Money(parseFloat(dividaGroup.total)) + "</h3>" +
           "</li>"
    ;
}

const dataHoje = new Date();

function DataHoje () {
    return dataHoje.getFullYear() + "-" + (dataHoje.getMonth()+1) + "-" + dataHoje.getDate();
}

inputs[1].value = DataHoje ();
const mora = 2 / 100, juroDia = 0.1 / 100;

function ParseData (text)
{
    const datasplit = text.split("-");
    const d = parseInt(datasplit[2]), m = parseInt(datasplit[1]), a = parseInt(datasplit[0]);
    return { dia:d, mes:m, ano:a };
}

function RegistrarCompra () 
{
    var compra = { 
        cliente:inputs[0].value, 
        vencimento: ParseData(inputs[1].value), 
        valor:inputs[2].value 
    };

    if(compra.cliente == "") 
    {
        ClientLog("Informe o nome do cliente!", false);
        return;
    } else if(compra.valor == "")
    {
        ClientLog("Informe o valor da compra!", false);
        return;
    } else if (
        compra.vencimento.ano > dataHoje.getFullYear() || 
        (compra.vencimento.ano == dataHoje.getFullYear() && compra.vencimento.mes > dataHoje.getMonth()+1) ||
        (compra.vencimento.ano == dataHoje.getFullYear() && compra.vencimento.mes == dataHoje.getMonth()+1 && compra.vencimento.dia > dataHoje.getDate())
    )
    {
        ClientLog("A data informada não deve ser superior a atual!", false);
        return;
    }

    inputs[0].value = "";
    inputs[1].value = DataHoje ();
    inputs[2].value = "";

    ClientLog("Compra registrada de " + compra.cliente, true);

    compras.push(compra);
    DesenharCompra (compra);
}

let dataVenc = new Date();
function CalcularDivida () 
{
    dividas = compras.map(divida => 
    {
        let atraso = 0;
        const venc = divida.vencimento;
        dataVenc.setFullYear(venc.ano);
        dataVenc.setMonth(venc.mes-1);
        dataVenc.setDate(venc.dia);
        let ts = parseInt((dataHoje - dataVenc));
        atraso += ts / (1000 * 60 * 60 * 24);
        const tdivida = atraso > 0 ? mora + (atraso * juroDia) : 0;
        const apagar = divida.valor * tdivida;
        return {
            compra: divida,
            divida: {
                total: tdivida,
                valor: apagar,
            },
            valor: parseFloat(divida.valor) + apagar
        };
    });

    ClientLog("Calculando divida...", false);
    DesenharDivida(dividas);
}

function CreateHashset (array, keyfunc)
{
    return array.reduce((acc, el) => 
    {
        let narray;
        if(!acc.hasOwnProperty(keyfunc(el))){
            narray = [];
            acc[keyfunc(el)] = narray; 
            acc.length++;
        } else {
            narray = acc[keyfunc(el)];
        }
        narray.push(el);

        return acc;
    }, []);
}

async function AgruparClientes()
{
    const container = dividaBox.children[0];
    
    const carray = CreateHashset(dividas, x => {return x.compra.cliente;});
    container.innerHTML = "";

    for(element in carray) 
    {
        if(element == undefined) continue;
        //console.log(carray[element]);
        container.innerHTML += GroupDivida(element, carray[element]);
    }
    //console.log(carray);
    ClientLog("Agrupado por Cliente", true);
}

async function AgruparVencimento()
{
    const container = dividaBox.children[0];

    const carray = CreateHashset(dividas, x => {return x.compra.vencimento.dia + "/" + x.compra.vencimento.mes + "/" + x.compra.vencimento.ano;});
    container.innerHTML = "";

    for(element in carray) 
    {
        if(element == undefined) continue;
        //console.log(carray[element]);
        container.innerHTML += GroupDivida(element, carray[element]);
    }
    ClientLog("Agrupado por Vencimento", true);
    //console.log(carray);
}

async function DesenharDivida (tab)
{
    dividaBox.children[0].remove();
    const container = document.createElement("ul");
    dividaBox.append(container);

    comprasBox.classList.add("hidden");
    dividaBox.classList.remove("hidden");
    tab.forEach(element => 
    {
        container.innerHTML += QuadDivida(element);
    });
    ClientLog("divida calculado", true);
}

async function DesenharCompra (compra)
{
    comprasBox.classList.remove("hidden");
    dividaBox.classList.add("hidden");
    comprasBox.children[0].innerHTML += QuadCompra(compra);
}