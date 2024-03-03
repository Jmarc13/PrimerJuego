import { Game } from "./classes/Game.js";

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas');
    const image = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    canvas.width = 1950;
    canvas.height = 1200;

    const game = new Game(canvas.width, canvas.height, 10 ,10); 


    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 13; x++) {
                if(x % 2 == 0 && y % 2 == 0){
                    ctx.fillRect(150*x, 150*y, 150, 150);
                }else if(x % 2 != 0 && y % 2 != 0){
                    ctx.fillRect(150*x, 150*y, 150, 150);
                }
            }
        }
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate();
});