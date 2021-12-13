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
const diasMes = 
[
    31, 28, 31,
    30, 31, 30,
    31, 31, 30,
    31, 30, 31
];

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

    const datraso = (compra.vencimento.ano - dataHoje.getFullYear())*360 + (compra.vencimento.mes - dataHoje.getMonth())*30 + (compra.vencimento.dia - dataHoje.getDate());
    console.log(datraso);

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

function CalcularJuros () 
{
    const tabela = compras.map(el => 
    {
        //console.log(el);
        let atraso = 0;
        const adias = dataHoje.getDate(), 
        ameses = dataHoje.getMonth()+1,
        aanos = dataHoje.getFullYear();
        const venc = el.vencimento;
        //console.log(venc);
        //console.log("d" + adias + " m" + ameses + " a" + aanos + " | " + atraso);
        const dias = adias - venc.dia, 
        meses = ameses - venc.mes,
        anos = aanos - venc.ano;
        if(dias > 0) atraso += dias;
        for(let i = 0; i < meses; i++){
            atraso += diasMes[i];
        }
        if(anos > 0) atraso += (anos*365);
        //console.log("d" + dias + " m" + meses + " a" + anos + " | " + atraso);
        const tjuros = atraso > 0 ? mora + (atraso * juroDia) : 0;
        return {
            compra: el,
            juros: {
                total: tjuros,
                valor: el.valor * tjuros,
            }
        };
    });
    DesenharJuros(tabela);
}

function DesenharJuros (tabela)
{
    jurosBox.children[0].remove();
    const container = document.createElement("ul");
    jurosBox.append(container);

    comprasBox.classList.add("hidden");
    jurosBox.classList.remove("hidden");
    //const container = jurosBox.children[0];
    tabela.forEach(element => 
    {
        const juroBox = document.createElement("li");
    
        const nameText = document.createElement("h3");
        nameText.textContent = element.compra.cliente;
        juroBox.append(nameText);
        
        const subBox = document.createElement("div");
        
        const vencText = document.createElement("h5");
        vencText.textContent = (element.juros.total*100).toFixed(2) + "%";
        subBox.append(vencText);
        
        const valorText = document.createElement("h4");
        const d = parseFloat(element.compra.valor) + parseFloat(element.juros.valor);
        //console.log(d);
        valorText.textContent = "R$" + d.toFixed(2);
        subBox.append(valorText);
        
        juroBox.append(subBox);

        container.append(juroBox);
    });
}

function DesenharCompra (compra)
{
    comprasBox.classList.remove("hidden");
    jurosBox.classList.add("hidden");
    const compraBox = document.createElement("li");
    
    const nameText = document.createElement("h3");
    nameText.textContent = compra.cliente;
    compraBox.append(nameText);
    
    const subBox = document.createElement("div");
    
    const vencText = document.createElement("h5");
    vencText.textContent = compra.vencimento.dia + "/" + compra.vencimento.mes + "/" + compra.vencimento.ano;
    subBox.append(vencText);
    
    const valorText = document.createElement("h4");
    valorText.textContent = "R$" + compra.valor;
    subBox.append(valorText);
    
    compraBox.append(subBox);

    comprasBox.children[0].appendChild(compraBox);
}