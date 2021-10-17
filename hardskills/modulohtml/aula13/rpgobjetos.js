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
        let cx = this.positionX - hsize + (canvas.width/2), cy = this.positionY - hsize + (canvas.height/2);
        
        context.translate(cx, cy);
        context.rotate((Math.PI / 180) * this.rotation);     
        context.translate(-cx, -cy);
        this.sprite.draw(context, cx, cy, this.size);
        context.translate(cx, cy);
        context.rotate((Math.PI / 180) * -this.rotation);
        context.translate(-cx, -cy); 
    }
}

class PhysicObjeto extends GameObjeto 
{
    constructor (sprite, positionX, positionY, size, rotation)
    {
        super(sprite, positionX, positionY, size, rotation);
        this.colliding = false;
        this.collisions = [];
    }
    colliding;
    collisions;

    collision (other){
        if(this.positionX + this.size > other.positionX 
            && this.positionX < other.positionX + other.size 
            && this.positionY + this.size > other.positionY 
            && this.positionY < other.positionY + other.size)
        {
            this.colliding = true;
            other.colliding = false;
        } else {
            other.colliding = false;
            this.colliding = false;
        }
        
    }
}

class DynamicObjeto extends PhysicObjeto 
{
    speedRot;
    speed;
    directionX;
    directionY;

    constructor (sprite, positionX, positionY, size, rotation, speedRotation, speed)
    {
        super(sprite, positionX, positionY, size, rotation);

        this.speedRot = speedRotation;
        this.speed = speed;
        this.directionX = 0;
        this.directionY = 0;
    }

    update()
    {
        let rad = (this.rotation*Math.PI)/180;
        let sin = Math.sin(rad), cos = Math.cos(rad);
        let vel = this.directionY*this.speed;
        this.positionX += sin*vel;
        this.positionY -= cos*vel;
        this.rotation += this.directionX * this.speedRot;
        //console.log("moving");
    }
}

class Character extends DynamicObjeto 
{

}