class SubPage 
{
    constructor (title, context, style){
        this.title = title;
        this.context = context;
        this.style = style;
    }

    title="";
    context="";
    style="";
}

var menu = document.getElementById("menu");
var subpage = document.getElementById("subpage");
var pagestyle = document.getElementById("pagestyle");
var pagelayout = document.getElementById("pagelayout");

var subpageIndex = 0;
var subpages = 
[
   
];

var audios = [
    "audios/y2meta.com - Foster The People - Pumped Up Kicks (Official Video) (128 kbps).mp3",
    "audios/",
    "audios/y2meta.com - Foster The People - Pumped Up Kicks (Official Video) (128 kbps).mp3",
    "audios/y2meta.com - Foster The People - Pumped Up Kicks (Official Video) (128 kbps).mp3"
]

//new SubPage("Home", "pages/index.html", "styles/style1.css"),

function OnLoadXML(data)
{
    let pages = data.firstChild;
    for(i = 0; i < pages.childElementCount; i++)
    {
        let page = ReadPage(pages.children[i]);
        subpages.push(page);
    }

    SelectSubpage(subpageIndex);
}

function ReadPage (page)
{
    return new SubPage(page.children[0].innerHTML, page.children[1].innerHTML, page.children[2].innerHTML);
}

function SelectSubpage(index)
{
    subpageIndex = index;
    let page = subpages[index];
    let t = menu.childElementCount;
    for(j = 0; j < t; j++)
    {
        menu.firstChild.remove();
    }

    let total = subpages.length;
    for (i = 0; i < total; i++)
    {
        if(i == subpageIndex) continue;
        let opcao = document.createElement("button");
        opcao.innerText = subpages[i].title;
        let x = i;
        opcao.onclick = evt => {
            //console.log(i + " | " + x);
            SelectSubpage(x);
        };
        menu.append(opcao);
    }

    LoadHTML(page.context, element => 
    {
        if(subpage.firstChild) subpage.firstChild.remove();
        subpage.append(element);
    });
}

LoadXML("datas/pages.xml", OnLoadXML);
//menu.append();