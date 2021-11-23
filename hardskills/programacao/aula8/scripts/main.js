const head = document.querySelector("head");
const aside = document.querySelector("aside");
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const animal = "Coelho de Caerbannog"; 

function createText (tag, text){
    let el = document.createElement(tag);
    el.innerText = text;
    return el;
}

function createImg (src){
    let el = document.createElement("img");
    el.src = src;
    return el;
}

function createList (ordered, somelist){
    let el = document.createElement(ordered ? "ol" : "ul");
    for (i in somelist) {
        el.append(createText("li", somelist[i]));
    }
    return el;
}

function fillHead () {
    let style = document.createElement("link");
    style.href = "styles/style.css";
    style.rel="stylesheet";
    head.append(style);
    document.querySelector("title").innerText = animal;
}

function fillAside () {
    let imgs = [
        "images/infoextra.png"
    ];
    for (i in imgs ){
        aside.append(createImg(imgs[i]));
    }
}

function fillHeader () {
    header.append(createImg("images/rep1.png"));
    let sub1 = document.createElement("div");
    sub1.append(createText("h1", animal));
    sub1.append(createText("h3", "Oryctolagus achachinus"));
    header.append(sub1);
}

function fillHabitat () {
    let section = document.createElement("section");
    section.id = "habitat";
    let texts = document.createElement("div");
    section.append(texts);
    texts.append(createText("h2", "Habitate"));
    let p1 = document.createElement("p");
    texts.append(p1);
    p1.append(createText("span", "Nas cavernas escuras e umidas de Caerbannog reside um predador implacável."));
    p1.append(createText("span", " Normalmente estão a espreita e próximos de estradas, acampamentos, embaixo da sua cama ou rios, onde eles se alimentam de viajantes, também de animais sozinhos ou que se perderam do bando. Muitos estudos sobre o caso apontam para o desaparecimento de 90mil turistas nestes locais..."));
    section.append(createImg("images/habitat.jpg"));
    return section;
}

function fillCaracteristicas () {
    let section = document.createElement("section");
    section.id = "howto";
    section.append(createImg("images/animal1.jpeg"));
    let texts = document.createElement("div");
    section.append(texts);
    texts.append(createText("h2", "Como identificar"));
    texts.append(createText("p", "Primeiro é necessário identificar o local como sendo um possível habitate, em seguida é preciso ver suas caracteristicas principais, como:"));
    texts.append(createList(false, ["Ser um coelho", "Parecer inofensivo", "Parecer estar sorrindo", "Ser pequeno", "Não gostar de cenouras", "Ter sangue, ossos ou corpos por perto"]));
    section.append(createImg("images/animal2.jpeg"));
    return section;
}

function fillAtaques () {
    let section = document.createElement("section");
    section.id = "ataques";
    section.append(createText("h2", "Ataques"));
    let imgs = document.createElement("div");
    section.append(imgs);

    imgs.append(createImg("images/ataquecao.jpg"));
    imgs.append(createImg("images/coelho-caerbannog.jpg"));
    imgs.append(createImg("images/ataque_coelhos.jpg"));
    return section;
}

function fillMain () {
    main.append(fillHabitat ());
    main.append(fillCaracteristicas ());
    main.append(fillAtaques ());
}

function fillFooter () {
    footer.append(createText("h4", "Fontes de "));
    
    let links = [
        ["Desciclopedia", "https://desciclopedia.org/wiki/Leporidae"],
        ["Wikipedia", "https://en.wikipedia.org/wiki/Rabbit_of_Caerbannog"]
    ];
    let l = Math.floor(Math.random()*(links.length));
    let link = links[l];
    console.log(l);
    let a1 = createText("a", link[0]);
    a1.href = link[1];
    a1.target = "_blank";
    footer.append(a1);
}

fillHead ();
fillAside ();
fillHeader ();
fillMain ();
fillFooter ();