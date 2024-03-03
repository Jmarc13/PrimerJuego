import { InputHandler } from "./Input.js";
import { Obstacle } from "./Obstacle.js";
import { PistonCup } from "./PistonCup.js";
import { Player } from "./Player.js";
import { Chronometer } from "./Chronometer.js";

export class Game {
    constructor(width, height, numObstacles, numbPistonCups) {
        this.width = width;
        this.height = height;
        this.numberPistonCups = numbPistonCups;
        this.obstacles = this.inicializeTableObstacle(8, 13);
        this.obstaclesPosition = this.inicializeTableObstaclePosition(8, 13);
        this.generateObstaclesPosition(numObstacles);
        this.pistonsCups = this.inicializeTablePistonCup(8, 13);
        this.pistonsCupsPosition = this.incializeTablePistonCupPosition(8, 13);
        this.generatePistonCupsPosition(numbPistonCups);
        this.player = new Player(this);
        this.input = new InputHandler();
        this.chronometer = new Chronometer();
    }

    update() {
        this.player.update(this.input.keys);
        if(this.player.score == this.numberPistonCups){
            this.chronometer.stopChronometer();
        }
        if(!this.chronometer.stop){
            this.chronometer.updateTime(this.playerHasMoved());
        }else{
            var message = document.getElementById('message');
            message.innerHTML = "El teu record es "+this.chronometer.seconds +" seconds";
        }

    }
    draw(context) {
        this.player.draw(context);
        this.drawObstacles(context);
        this.drawPistonCup(context);
    }

    playerHasMoved() {
        if (this.player.x != 0 || this.player.y != 1120) {
            return true;
        } else {
            return false;
        }
    }

    //Obstacles
    generateObstaclesPosition(numberObstacles) {
        var counter = 0;
        while (counter != numberObstacles) {
            const x = Math.floor(Math.random() * 13) + 1;
            const y = Math.floor(Math.random() * 6) + 1;

            if (this.checkAroundPositionObstacles(y, x)) {
                counter++;
            }
        }
    }
    checkAroundPositionObstacles(y, x) {
        if (this.obstaclesPosition[y - 1][x - 1] == false &&
            this.obstaclesPosition[y - 1][x] == false &&
            this.obstaclesPosition[y - 1][x + 1] == false &&
            this.obstaclesPosition[y][x - 1] == false &&
            this.obstaclesPosition[y][x + 1] == false &&
            this.obstaclesPosition[y + 1][x - 1] == false &&
            this.obstaclesPosition[y + 1][x] == false &&
            this.obstaclesPosition[y + 1][x + 1] == false &&
            this.obstaclesPosition[y][x] == false) {
            this.obstaclesPosition[y][x] = true;
            return true;
        } else {
            return false;

        }

    }
    inicializeTableObstacle(y, x) {
        var obstaclesArray = [];
        for (let row = 0; row < y; row++) {
            obstaclesArray.push([]); //Agregar nueva fila
            for (let col = 0; col < x; col++) {
                obstaclesArray[row].push(new Obstacle(this, row, col)); //Agregar nueva columna
            }
        }
        return obstaclesArray;
    }
    inicializeTableObstaclePosition(y, x) {
        var obstaclePositionArray = [];
        for (let row = 0; row < y; row++) {
            obstaclePositionArray.push([]); //Agregar nueva fila
            for (let col = 0; col < x; col++) {
                obstaclePositionArray[row].push(false); //Agregar nueva columna
            }
        }
        return obstaclePositionArray;
    }
    drawObstacles(context) {
        this.obstaclesPosition.forEach((obstacles, y) => {
            obstacles.forEach((obstacle, x) => {
                if (obstacle == true) {
                    this.obstacles[y][x].draw(context);
                }
            });
        });
    }

    //Piston cups
    inicializeTablePistonCup(y, x) {
        var pistonCupArray = [];
        for (let row = 0; row < y; row++) {
            pistonCupArray.push([]);//Agregar nueva fila
            for (let col = 0; col < x; col++) {
                pistonCupArray[row].push(new PistonCup(this, row, col));
            }
        }
        return pistonCupArray;
    }
    incializeTablePistonCupPosition(y, x) {
        var pistonCupPositionArray = [];
        for (let row = 0; row < y; row++) {
            pistonCupPositionArray.push([]); //Agregar nueva fila
            for (let col = 0; col < x; col++) {
                if (this.obstaclesPosition[row][col] == true) {
                    pistonCupPositionArray[row].push("obstacle");
                } else {
                    pistonCupPositionArray[row].push(null);
                }
            }
        }
        return pistonCupPositionArray;
    }
    generatePistonCupsPosition(numberPistonsCups) {
        var counter = 0;
        // this.pistonsCupsPosition[0][0]= "piston";
        // this.pistonsCupsPosition[this.pistonsCupsPosition.length-1][this.pistonsCupsPosition[0].length-1] = "piston";
        // this.pistonsCupsPosition[0][this.pistonsCupsPosition[0].length-1] = "piston";

        while (counter != numberPistonsCups) {
            const x = Math.floor(Math.random() * 13);
            const y = Math.floor(Math.random() * 7);

            if (this.checkPistonCupPosition(y, x)) {
                counter++;
            }
        }
    }
    checkPistonCupPosition(y, x) {
        if (this.pistonsCupsPosition[y][x] === null) {
            this.pistonsCupsPosition[y][x] = "piston";
            return true;
        } else {
            return false;
        }
    }
    drawPistonCup(context) {
        this.pistonsCupsPosition.forEach((pistonCupss, y) => {
            pistonCupss.forEach((pistonCup, x) => {
                if (pistonCup === "piston") {
                    this.pistonsCups[y][x].draw(context);
                }
            });
        })
    }
}