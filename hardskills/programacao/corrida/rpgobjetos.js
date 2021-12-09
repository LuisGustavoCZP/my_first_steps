class Objeto 
{
    constructor (posX, posY){
        this.positionX = posX;
        this.positionY = posY;
    }
    positionX;
    positionY;
}

class GameObjeto extends Objeto
{
    constructor (sprite, posX, posY, s, rot)
    {
        super(posX, posY);
        this.size = s;
        this.sprite = sprite;
        this.rotation = rot;
    }

    size;
    sprite;
    rotation;

    draw(canvas, context) {
        let hsize = this.size / 2;
        let cx = this.positionX + (canvas.width/2), cy = this.positionY + (canvas.height/2); //hsize
        //console.log("Drawing GO");
        context.translate(cx, cy);
        context.rotate((Math.PI / 180) * this.rotation);     
        context.translate(-cx, -cy);
        this.sprite.draw(context, cx, cy, this.size);
        context.translate(cx, cy);
        context.rotate((Math.PI / 180) * -this.rotation);
        context.translate(-cx, -cy); 
    }
}