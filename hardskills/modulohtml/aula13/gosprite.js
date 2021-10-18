class SpriteFrame 
{
    constructor (width, height, space){
        this.width = width;
        this.height = height;
        this.space = space;
    }
    width;
    height;
    space;
}

class GOSprite 
{ 
    constructor (spriteFrame, source, id){
        this.spriteFrame = spriteFrame;
        this.spriteSheet = new Image();
        this.readyDraw = false;
        this.spriteSheet.onload = () => 
        {
            this.readyDraw = true;
        }
        this.spriteSheet.onloadstart = () => 
        {
            this.readyDraw = false;
        }
        this.spriteSheet.src = source;
        this.index = id;
    }
    spriteFrame;
    spriteSheet;  
    index;
    readyDraw;

    draw(context, posX, posY, size) {
        let hsize = size / 2;
        posX = posX - hsize;
        posY = posY - hsize;

        //ctx.fillStyle = "AAAA";
        //ctx.fillRect(posX, posY, size, size);

        if(this.readyDraw)
        {
            let fw = this.spriteFrame.width;
            let fh = this.spriteFrame.height;
            let fs = this.spriteFrame.space;
            let maxColum = Math.ceil(this.spriteSheet.width / (fw));

            let x = this.index % maxColum, y = (this.index - x) / maxColum;
            let fx = (fw * x);
            let fy = (fh * y);

            //console.log(maxColum + " = (" + x + " , " + y + ") = (" + fx + " , " + fy + ")");

            context.drawImage(
                this.spriteSheet,
                fx,
                fy,
                fw,
                fh,
                posX, 
                posY,
                size,
                size
            );
        }
    }
    
}