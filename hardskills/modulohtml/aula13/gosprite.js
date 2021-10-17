class GOSprite 
{
    spriteSheet;
    background = "####";
    frameWidth = 32;
    frameHeight = 32;
    index = 0;
    readyDraw;

    draw(context, posX, posY, size) {
        let hsize = size / 2;
        //ctx.fillStyle = this.colliding? "#000" : this.sprite.color;
        //ctx.fillRect(, , this.size, this.size);
        if(this.readyDraw)
        {
            let fw = this.frameWidth;
            let fh = this.frameHeight;
            let maxColum = this.spriteSheet.width / this.frameWidth;
            let x = this.index % maxColum, y = (this.index - x) / maxColum;
            let fx = fw * x;
            let fy = fh * y;

            context.drawImage(
                this.spriteSheet,
                fx,
                fy,
                fw,
                fh,
                posX - hsize, 
                posY - hsize,
                size,
                size
            );
        }
    }
    
    constructor (fWidth, fHeight, source, id){
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
        this.background = "####";
        this.frameWidth = fWidth;
        this.frameHeight = fHeight;
        this.index = id;
    }
}