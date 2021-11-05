class Skill 
{
    constructor (category, name, icon, type, quality){
        this.category = category;
        this.name = name;
        this.icon = icon;
        this.type = type;
        this.quality = quality;
    }

    category="";
    name="";
    icon="";
    type=""
    quality="";
}

var subpage = document.getElementById("subpage");
var pagestyle = document.getElementById("pagestyle");
var pagelayout = document.getElementById("pagelayout");

function OnLoadXML(data)
{
    let skills = data.firstChild;
    for(i = 0; i < skills.childElementCount; i++)
    {
        let skill = ReadPage(skills.children[i]);
        AddSkill ("template-skill.html", skill);
    }
}
photo.childElementCount
function ReadPage (skill)
{
    return new Skill(skill.children[0].innerHTML, skill.children[1].innerHTML, skill.children[2].innerHTML, skill.children[3].innerHTML, skill.children[4].innerHTML);
}

function AddSkill (template, skill)
{
    var categoryElement = document.getElementById(skill.category);
    LoadHTML(template, element => 
    {
        var skillHeader = element.children[0];
        var per = (parseInt(skill.quality)/5) * 100;
        if(skill.icon == "")
        {
            skillHeader.children[0].innerHTML = skill.name;
            element.title = skill.name + ": " + per + "%";
        }
        else 
        {
            var skillicon = skillHeader.children[1];
            skillicon.src = skill.icon;
            element.title = skill.name + ": " + per + "%";
        }

        var skillQualify = element.children[1];
        for (i = 0; i < skillQualify.childElementCount; i++)
        {
            skillQualify.children[i].src = skill.type;
        }

        skillQualify.classList.add("score"+skill.quality);
        categoryElement.append(element);
    });
}


LoadXML("datas/skills.xml", OnLoadXML);