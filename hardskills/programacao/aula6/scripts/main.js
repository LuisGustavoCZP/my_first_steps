document.getElementById("supertitle").innerText = document.getElementById("title").innerText = "Meu Hobby";
document.getElementById("nome").innerText = "Luis Gustavo C. Z. Pereira";
document.getElementById("idade").innerText = "28 anos";
document.getElementById("estado").innerText = "Paraná";
document.getElementById("foto").src = "images/luis.png";

document.getElementById("titulo").innerText = "Game Dev/Programmer";
document.getElementById("descricao").innerText = "Sempre gostei muito de jogos e queria criar um, aprendi a usar macromedia flash onde tive o primeiro contato com codigos. Mas virei um programador de carteirinha quando aprendi Typescript e C# usando o Unity Engine, desde então consegui levar meu hobby para um novo nível. Mas atualmente meus projetos em Unity estão parados e estou buscando direcionar esse conhecimento pra Web.";

function createItem(img, link)
{    
    let item1 = document.createElement("li");
    let linkEl = document.createElement("a");
    linkEl.href = link;
    linkEl.target = "_blank";
    let imgEl = document.createElement("img");
    imgEl.src = img;
    linkEl.append(imgEl);
    item1.append(linkEl);
    return item1;
}

function createItems () {
    let exemples = document.getElementById("exemples");
    exemples.append(createItem("https://luisgustavoczp.github.io/VacSina/preview.png", "https://luisgustavoczp.github.io/VacSina/"));
    exemples.append(createItem("images/ocairdanoite.png", "https://luiszanetti.itch.io/o-cair-da-noite"));
    
}

createItems();