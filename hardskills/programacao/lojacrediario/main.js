const headers = [
    document.getElementById("main"),
    document.getElementById("registro"),
    document.getElementById("filtro"),
];

function MudarHeader (n) {
    let i = 0;
    headers.forEach(header => {
        if(i++ != n) header.classList.add("hidden");
        else header.classList.remove("hidden");
    });
}

const comprasBox = document.getElementById("compras");
const dividaBox = document.getElementById("dividas");

const inputs = [
    document.getElementById("compra-cliente"),
    document.getElementById("compra-vencimento"),
    document.getElementById("compra-valor"),
]

const filters = [
    document.getElementById("filtro-data-inicial"),
    document.getElementById("filtro-data-final"),
    document.getElementById("filtro-valor-min"),
    document.getElementById("filtro-valor-max"),
]

const logOutput = document.getElementById("log");
function ClientLog (text, bool) {
    logOutput.textContent = text;
    logOutput.classList.toggle("error", !bool);
    logOutput.classList.toggle("sucess", bool);
}

const compras = [];
let dividas = [];

function Money(num) {
    return num.toLocaleString("pt-br", { style: 'currency', currency: 'BRL' });
}

function BoxCompra (compra) 
{
    return "<span>" +
                    "<h5>" + compra.vencimento.getDate() + "/" + (compra.vencimento.getMonth()+1) + "/" + compra.vencimento.getFullYear() + "</h5>" +
                    "<h4>" + Money(parseInt(compra.valor)) + "</h4>" +
           "</span>";
}

function QuadCompra (compra) 
{
    return "<li>" +
                "<h3>" + compra.cliente + "</h3>" +
                BoxCompra(compra) +
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
    const dt = new Date(a, m-1, d);
    return dt;
}

function AtrasoData (data, vencimento) {
    return parseInt(data - vencimento);
}

function RegistrarCompra () 
{
    const dt = ParseData(inputs[1].value);
    console.log(dt);
    var compra = { 
        cliente:inputs[0].value, 
        vencimento: dt, 
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
    } else if (AtrasoData(dataHoje, compra.vencimento) < 0)
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

function CalcularDivida () 
{
    dividas = compras.map(divida => 
    {
        let atraso = 0;
        const ts = AtrasoData(dataHoje, divida.vencimento);
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

    DesenharDivida(dividas);
    ClientLog("Dividas calculadas!", true);
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
    ClientLog("Agrupando por Cliente", true);
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
    ClientLog("Agrupando por Vencimento", true);
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
    ClientLog("Mostrando dividas ", true);
}

function DesenharCompra (compra)
{
    comprasBox.children[0].innerHTML += QuadCompra(compra);
}

function FiltrarDividas () 
{
    const mind = filters[0].value, maxd = filters[1].value, minv = filters[2].value, maxv = filters[3].value;
    const minData = mind != undefined ? ParseData(mind) : undefined;
    const maxData = maxd != undefined ? ParseData(maxd) : undefined;
    const minValor = minv != undefined ? parseFloat(minv) : undefined;
    const maxValor = maxv != undefined ? parseFloat(maxv) : undefined;

    const filt = dividas.filter(divida =>
    {
        if(AtrasoData(minData, divida.compra.vencimento) > 0) return false;
        if(AtrasoData(maxData, divida.compra.vencimento) < 0) return false;
        if(minValor > divida.compra.valor) return false;
        if(maxValor < divida.compra.valor) return false;
        return true;
    });

    DesenharDivida(filt);
}

function OpenCompras () 
{
    comprasBox.classList.remove("hidden");
    dividaBox.classList.add("hidden");
}

async function DesenharCompras (com)
{
    OpenCompras ();
    comprasBox.children[0].innerHTML = "";
    com.forEach(x=>{DesenharCompra (x);});
}