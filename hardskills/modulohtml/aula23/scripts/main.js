class SubPage 
{
    constructor (title, menu, context, style){
        this.title = title;
        this.menu = menu;
        this.context = context;
        this.style = style;
    }

    title="";
    menu="";
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
    new SubPage("Home", "", "pages/index.html", "styles/style1.css"),
];

function OnLoadXML(data)
{
    let pages = data.firstChild;
    for(i = 0; i < pages.childElementCount; i++)
    {
        let page = ReadPage(pages.children[i]);
        subpages.push(page);
    }

    SelectSubpage(subpages[subpageIndex]);
}

function ReadPage (page)
{
    return new SubPage(page.children[0].innerHTML, page.children[1].innerHTML, page.children[2].innerHTML, page.children[3].innerHTML);
}

function SelectSubpage(subpage)
{
    if(!subpage.menu || subpage.menu == "") 
    {
        let total = subpages.length;
        for (i = 0; i < total; i++)
        {
            let opcao = document.createElement("a");
            opcao.innerText = subpages[i].title;
            menu.append(opcao);
        }
        return;
    }

    LoadHTML(subpage.menu, x => 
    {
        if(menu.firstChild) menu.firstChild.remove();
        menu.append(x);
    });
}

LoadXML("datas/pages.xml", OnLoadXML);
//menu.append();