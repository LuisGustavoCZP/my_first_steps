class RPGManager 
{
    canvas = null;
    ctx = null;
    jogador = new GameObjeto(0, 0, 50, "#A0f");
    monstros = [new GameObjeto(250, 50, 50, "#B11"), new GameObjeto(50, 250, 50, "#511")];

    gameupdate (){
        this.jogador.update();
        for(i = 0; i < this.monstros.length; i++){
            var monstro = this.monstros[i];
            monstro.update();
            monstro.collision(this.jogador);
        }
    }

    gamedraw (){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        for(i = 0; i < this.monstros.length; i++){
            var monstro = this.monstros[i];
            monstro.draw(canvas, ctx);
        }
        this.jogador.draw(canvas, ctx);
    }

    gameloop (){
        console.log("looping");
        window.requestAnimationFrame(this.gameloop, this.canvas);
        this.gameupdate();
        this.gamedraw();
    }

    constructor(canvas, ctx, jogador, monstros){
        this.canvas = canvas;
        this.ctx = ctx;
        this.jogador = jogador;
        this.monstros = monstros;
    }
}