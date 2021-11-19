document.getElementById("supertitle").innerText = document.getElementById("title").innerText = "Meu Hobby";
document.getElementById("nome").innerText = "Luis Gustavo C. Z. Pereira";
document.getElementById("idade").innerText = "28 anos";
document.getElementById("estado").innerText = "Paraná";
document.getElementById("foto").src = "images/luis.png";

document.getElementById("titulo").innerText = "Game Dev/Programmer";
document.getElementById("descricao").innerText = "Sempre gostei muito de jogos e queria criar um, aprendi a usar macromedia flash onde tive o primeiro contato com codigos. Mas virei um programador de fato quando aprendi Typescript e C# usando o Unity Engine, desde então consegui levar meu hobby para um novo nível. Mas atualmente meus projetos em Unity estão parados e estou buscando direcionar esse conhecimento pra Web.";

function createItem(img, link)
{    
    let item1 = document.createElement("li");
    let linkEl = document.createElement("a");
    linkEl.href = link;
    let imgEl = document.createElement("img");
    imgEl.src = img;
    item1.append(imgEl);
    return item1;
}

function createItems () {
    let exemples = document.getElementById("exemples");
    exemples.append(createItem("", "https://luisgustavoczp.github.io/VacSina/"));
}

createItems();