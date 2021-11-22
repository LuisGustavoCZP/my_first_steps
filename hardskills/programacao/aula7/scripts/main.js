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
const favoriteArtistTitle = "Favorite Artist Jean Tassy";
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

    let m = musics[artistIndex];
    artistMusic.src = m.link;
    artistMusicName.innerText = m.name;
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

document.querySelector("title").innerText = favoriteArtistTitle;

document.querySelector("h1").innerText = favoriteArtistTitle;
document.querySelector("aside h2").innerText = "About Me";
let infos = document.querySelectorAll("aside h4");
infos[0].innerText = "Luis Gustavo C. Z. Pereira";
infos[1].innerText = "28 Ano";
infos[2].innerText = "Paraná";
document.querySelector("aside img").src="images/luis.jpg";

//document.querySelector("#me > .name").innerText = "About Me";

let m1 = musics[artistIndex];
let artistMusic = CreateIframe(m1.link);
let artistMusicName = document.querySelector("#artist h2");
artistMusicName.innerText = m1.name;
document.querySelector("#artist ul").append(artistMusic);
AddButtons("#artist", ChangeArtistMusic);

let mentionsMusic = CreateIframe(mentions[mentionsIndex].link);
document.querySelector("#mentions h2").innerText = "Honored Mentions";
document.querySelector("#mentions ul").append(mentionsMusic);
AddButtons("#mentions", ChangeMentionsMusic);

document.querySelector("#about h3").innerText = "Name: Jean Tassy";
document.querySelector("#about h4").innerText = "Genre: Hip-hop/Rap/Pop";
let linkconsulta = document.querySelector("#about a");
linkconsulta.innerText = "Contato Oficial";
linkconsulta.href = "https://twitter.com/jeantassy_?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor";
linkconsulta.target = "_blank";
let imgs = document.querySelectorAll("#about img");
imgs[0].src="images/jeantassy2.jpg";
imgs[1].src="images/jeantassy1.jpg";
document.querySelector("footer").innerText = "All rights reserved to Luis Gustavo C. Z. Pereira";