export class Obstacle{
    constructor(game, y,x){
        this.game = game;
        this.width = 150;
        this.height = 150;
        this.y= 150*y;
        this.x = 150*x;
        this.obstacleImg = document.getElementById('tree');
    }
    draw(context){
        context.drawImage(this.obstacleImg, this.x, this.y, this.width, this.height);
    }
}