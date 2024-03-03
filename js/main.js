import { Game } from "./classes/Game.js";

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    var dificultMode = localStorage.getItem('mode');
    canvas.width = 1950;
    canvas.height = 1200;
    var numberOfPistonsCups;
    var numberOfObstacles;
    if(dificultMode == "Fàcil"){
        numberOfPistonsCups = 5;
        numberOfObstacles = 5;
    }else if(dificultMode == "Mitjà"){
        numberOfPistonsCups = 10;
        numberOfObstacles = 8;
    }else if(dificultMode == "Difícil"){
        numberOfPistonsCups = 15;
        numberOfObstacles = 10;
    }else{
        numberOfPistonsCups = 0;
        numberOfObstacles = 0;
    }

  

    const game = new Game(canvas.width, canvas.height, numberOfObstacles, numberOfPistonsCups); 

    this.document.getElementById('reset').addEventListener('click', reset);
    this.document.getElementById('resetGame').addEventListener('click', resetGame);
    this.document.getElementById('instructions').addEventListener('click', instructions);
    this.document.getElementById('easy').addEventListener('click', easyMod);
    this.document.getElementById('medium').addEventListener('click', mediumMod);
    this.document.getElementById('hard').addEventListener('click', hardMod);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        drawBoard();
        displayRecord();
        displayDificulty();
        displayPistonCupsCollected();
        displayPistonCupsCollectedFinished();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    function drawBoard(){
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 13; x++) {
                if(x % 2 == 0 && y % 2 == 0){
                    ctx.fillStyle = "black"; // Color para coordenadas pares
                } else if(x % 2 != 0 && y % 2 != 0){
                    ctx.fillStyle = "black"; // Color para coordenadas impares
                } else {
                    ctx.fillStyle = "white"; // Color blanco para el resto de los casos
                }
                
                ctx.fillRect(150*x, 150*y, 150, 150);
            }
        }
    }

    function resetGame(){
        localStorage.clear();
        location.reload();
    }

    function displayDificulty(){
        var dificulty = document.getElementById('dificulty');
        if(dificultMode){
            dificulty.innerHTML = "Dificultat: "+ dificultMode;
        }else{
            dificulty.innerHTML = "Escull la dificultat";
        }
    }

    function displayRecord(){
        const record = localStorage.getItem('recordMessage');
        var recordHTML = document.getElementById('record');
        if(record == null){
            recordHTML.innerHTML = "Encara no hi ha ningun Rècord";
        }else{
            recordHTML.innerHTML = "El record és: "+record;
        }
    }

    function displayPistonCupsCollected(){
        var pistonCupsCollected = document.getElementById("pistonCupsCollected");
        pistonCupsCollected.innerHTML ="Piston Cups collected: " + game.player.score + "/" + numberOfPistonsCups;
    }

    function displayPistonCupsCollectedFinished(){
        var message = document.getElementById("finished");
        if(numberOfPistonsCups == game.player.score && numberOfPistonsCups != 0){
            message.innerHTML = "ENHORABONA HAS RECOLLIT TOTS EL PREMIS!! ";
        }
    }

    function reset(){
        location.reload();
    }
    function instructions(){
        window.location.href = "../pages/instructions.html";
    }

    function easyMod(){
        localStorage.setItem('mode', 'Fàcil');
        location.reload();
    }

    function mediumMod(){
        localStorage.setItem('mode', 'Mitjà');
        location.reload();
    }
    
    function hardMod(){
        localStorage.setItem('mode', 'Difícil');
        location.reload();
    }
    animate();
});
