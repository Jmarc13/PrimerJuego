export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 80;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player');
        this.score = 0;
    }
    update(input) {
        //Movimiento Horizontal 
        if (input.includes('ArrowRight')) {
            this.x = this.x + 5;
            if (!this.checkCollisionObstacle()) {
                this.x = this.x - 5;
            } 
        } 
        if (input.includes('ArrowLeft')) {
            this.x = this.x - 5;
            if (!this.checkCollisionObstacle()) {
                this.x = this.x + 5;
            }
        }
        if (this.x < 0) this.x = 0; //Límite Izquierdo 
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width; //Límite derecho 


        //Movimiento Vertical 
        if (input.includes('ArrowUp')) {
            this.y = this.y - 5;
            if(!this.checkCollisionObstacle()){
                this.y = this.y + 5;
            }
        }
        
        if (input.includes('ArrowDown')) {
            this.y = this.y + 5;
            if(!this.checkCollisionObstacle()){
                this.y = this.y - 5;
            }
        }

        if (this.y < 0) this.y = 0; //Límite superior
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height; //Límite inferior
        this.checkCollisionPiston();
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    checkCollisionObstacle() {
        var canMove = true;
        this.game.obstaclesPosition.forEach((obstaclesPositions, y) => {
            obstaclesPositions.forEach((obstacle, x) => {
                if (obstacle == true) {
                    if (this.game.obstacles[y][x].x < this.x + this.width &&
                        this.game.obstacles[y][x].x + this.game.obstacles[y][x].width > this.x &&
                        this.game.obstacles[y][x].y < this.y + this.height &&
                        this.game.obstacles[y][x].y + this.game.obstacles[y][x].height > this.y) {
                        canMove = false;
                    }
                }
            });
        });
        return canMove;
    }

    checkCollisionPiston(){
        this.game.pistonsCupsPosition.forEach((pistons, y) =>{
            pistons.forEach((piston, x)=>{
                if(piston === "piston"){
                    if( this.game.pistonsCups[y][x].x < this.x + this.width &&
                        this.game.pistonsCups[y][x].x + this.game.pistonsCups[y][x].width > this.x &&
                        this.game.pistonsCups[y][x].y < this.y + this.height &&
                        this.game.pistonsCups[y][x].y + this.game.pistonsCups[y][x].height > this.y){   
                        this.game.pistonsCupsPosition[y][x] = null;   
                        this.score++;
                    }
                }
            });
        });
    }
}