export class PistonCup{
    constructor(game, y, x){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.y = 150*y;
        this.x = 150*x;
        this.pistonImg = document.getElementById('pistonCup');
    }
    draw(context){
        context.drawImage(this.pistonImg, this.x+20, this.y+20, this.width, this.height);
    }
}