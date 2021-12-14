const comprasBox = document.getElementById("compras");
const jurosBox = document.getElementById("juros");
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

const compras = [];
let tabela = [];
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

function BoxJuros (juros) 
{
    return "<div>" +
                BoxCompra(juros.compra) +
                "<span>" +
                            "<h5>" + (juros.juros.total*100).toFixed(2) + "%</h5>" +
                            "<h4>" + Money(juros.juros.valor) + "</h4>" +
                "</span>" +
                "<h3>" + Money(parseFloat(juros.compra.valor) + parseFloat(juros.juros.valor)) + "</h3>" + 
            "</div>"
    ;
}

function QuadJuros (juros) 
{
    return "<li>" +
                "<h3>" + juros.compra.cliente + "</h3>" +
                BoxJuros(juros) +
           "</li>"
    ;
}

function GrupeJuros (title, array) 
{
    return "<li class='grupo'>" +
                "<h3>" + title + "</h3>" +
                "<ul>" + array.reduce((p, x) => 
                { 
                    //console.log(p); 
                    return p += QuadJuros(x);//"<li>" + BoxJuros(x) + "</li>";
                }, "") +
                "</ul>" +
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
function CalcularJuros () 
{
    tabela = compras.map(el => 
    {
        let atraso = 0;
        const venc = el.vencimento;
        dataVenc.setFullYear(venc.ano);
        dataVenc.setMonth(venc.mes-1);
        dataVenc.setDate(venc.dia);
        let ts = parseInt((dataHoje - dataVenc));
        atraso += ts / (1000 * 60 * 60 * 24);
        const tjuros = atraso > 0 ? mora + (atraso * juroDia) : 0;
        return {
            compra: el,
            juros: {
                total: tjuros,
                valor: el.valor * tjuros,
            }
        };
    });

    ClientLog("Calculando juros...", false);
    DesenharJuros(tabela);
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
    const container = jurosBox.children[0];
    
    const carray = CreateHashset(tabela, x => {return x.compra.cliente;});
    container.innerHTML = "";

    for(element in carray) 
    {
        if(element == undefined) continue;
        //console.log(carray[element]);
        container.innerHTML += GrupeJuros(element, carray[element]);
    }
    //console.log(carray);
    ClientLog("Agrupado por Cliente", true);
}

async function AgruparVencimento()
{
    const container = jurosBox.children[0];

    const carray = CreateHashset(tabela, x => {return x.compra.vencimento.dia + "/" + x.compra.vencimento.mes + "/" + x.compra.vencimento.ano;});
    container.innerHTML = "";

    for(element in carray) 
    {
        if(element == undefined) continue;
        //console.log(carray[element]);
        container.innerHTML += GrupeJuros(element, carray[element]);
    }
    ClientLog("Agrupado por Vencimento", true);
    //console.log(carray);
}

async function DesenharJuros (tab)
{
    jurosBox.children[0].remove();
    const container = document.createElement("ul");
    jurosBox.append(container);

    comprasBox.classList.add("hidden");
    jurosBox.classList.remove("hidden");
    tab.forEach(element => 
    {
        container.innerHTML += QuadJuros(element);
    });
    ClientLog("Juros calculado", true);
}

async function DesenharCompra (compra)
{
    comprasBox.classList.remove("hidden");
    jurosBox.classList.add("hidden");
    comprasBox.children[0].innerHTML += QuadCompra(compra);
}