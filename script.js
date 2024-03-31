const canvas=document.getElementById('gameCanvas');
const ctx= canvas.getContext('2d')
let snake=[{x:10,y:10}]
let dx= 10;
let dy = 0;

let food = {x:Math.floor(Math.random()*39)*10,y:Math.floor(Math.random()*39)*10};
let score=0;

function main() {
    if (gameOver()) return;
    setTimeout(function onTick(){
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        main();

    },100);
    
}