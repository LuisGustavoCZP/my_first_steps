class Music {
    constructor(name, link){
        this.link = link;
        this.name = name;
    }
}

const musics = [
    new Music ("Pequeno Blues", "https://www.youtube.com/embed/trO-Gy7b4N8"),
    new Music ("Diz pra Mim", "https://www.youtube.com/embed/JoeZRI7jBbg"),
    new Music ("Saia da Bolha", "https://www.youtube.com/embed/Fw1VEXl9wxY"),
    new Music ("Cadê Nosso Sol?", "https://www.youtube.com/embed/lzEWkUfVR7w"),
    new Music ("+1 Minuto ft Marina Sena", "https://www.youtube.com/embed/7FEQJFBCVOk"),
    new Music ("Se Eu Vou Lá", "https://www.youtube.com/embed/f6Gv7k3ImUU"),
    new Music ("Aqueles Dias", "https://www.youtube.com/embed/adjzt10C6D8")
];

const mentions = [
    new Music("Edi Rock - That's My Way ft. Seu Jorge", "https://www.youtube.com/embed/ysfm_adxRrI"),
    new Music("RedLips - Relaxar na Quarentena", "https://www.youtube.com/embed/cuhXUSSBsv4")
];

const iframewidth=560, iframeheight=315, iframetitle="YouTube video player", iframeallow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
var artistIndex = 0, mentionsIndex = 0;

function CreateIframe (link) {
    let iframe = document.createElement("iframe");
    iframe.allowFullscreen = true;
    iframe.allow=iframeallow;
    iframe.title=iframetitle;
    iframe.frameBorder = 0;
    iframe.src = link;
    //iframe.width=iframewidth;
    //iframe.height=iframeheight;
    return iframe;
}

function ChangeArtistMusic (button, positive) 
{
    artistIndex += (positive?1:-1);
    if(artistIndex >= musics.length) {
        artistIndex = 0;
    } else if(artistIndex < 0) {
        artistIndex = musics.length -1;
    }
    artistMusic.src = musics[artistIndex].link; 
}

function ChangeMentionsMusic (button, positive) 
{
    mentionsIndex += (positive?1:-1);
    if(mentionsIndex >= mentions.length) {
        mentionsIndex = 0;
    } else if(mentionsIndex < 0) {
        mentionsIndex = mentions.length -1;
    }
    mentionsMusic.src = mentions[mentionsIndex].link
}

function AddButtons (parent, func) 
{
    let buttonlast = document.querySelector(parent + " > span > span").children[0];
    buttonlast.innerText = "<";
    buttonlast.onclick = x => {func(buttonlast, false)};
    
    let buttonnext = document.querySelector(parent + " > span > span").children[1];
    buttonnext.innerText = ">";
    buttonnext.onclick = x => {func(buttonnext, true)};
}

document.querySelector("title").innerText = "Favorite Artist";

document.querySelector("h1").innerText = "Favorite Artist";
document.querySelector("aside h2").innerText = "About Me";
let infos = document.querySelectorAll("aside h4");
infos[0].innerText = "Luis Gustavo C. Z. Pereira";
infos[1].innerText = "28 Ano";
infos[2].innerText = "Paraná";
document.querySelector("aside img").src="images/luis.jpg";

//document.querySelector("#me > .name").innerText = "About Me";

let artistMusic = CreateIframe(musics[artistIndex].link);
document.querySelector("#artist h2").innerText = "Jean Tassy";
document.querySelector("#artist ul").append(artistMusic);
AddButtons("#artist", ChangeArtistMusic);

let mentionsMusic = CreateIframe(mentions[mentionsIndex].link);
document.querySelector("#mentions h2").innerText = "Menções Honrosas";
document.querySelector("#mentions ul").append(mentionsMusic);
AddButtons("#mentions", ChangeMentionsMusic);

document.querySelector("footer").innerText = "All rights reserved to Luis Gustavo C. Z. Pereira";