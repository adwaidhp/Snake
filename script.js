const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let snake = [{ x: 10, y: 10 }];
let dx = 10;
let dy = 0;

let food = {
  x: Math.floor(Math.random() * 39) * 10,
  y: Math.floor(Math.random() * 39) * 10,
};
let score = 0;

function main() {
  if (gameOver()) return;
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    main();
  }, 100);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = "green";
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById("score").innerText = "Score: " + score;
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * 39) * 10,
    y: Math.floor(Math.random() * 39) * 10,
  };
}

function drawFood() {
  ctx.beginPath();
  ctx.arc(food.x,food.y,5,0,Math.PI*2);
  ctx.fillStyle = "Red";
  ctx.fill();

}

function gameOver(){
    const head = snake[0];
    return (
        head.x <0 || head.x >=400 || head.y <0 || head.y>=400 ||
        snake.slice(1).some(part => part.x ===head.x && part.y=== head.y)

    );
}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

document.addEventListener('keydown',changeDirection);

function changeDirection(event){
    const LEFT_KEY =37;
    const RIGHT_KEY =39;
    const UP_KEY=38;
    const DOWN_KEY=40;
    const keyPressed= event.keyCode;
    const goingUp=dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight){
        dx=-10;
        dy=0;
    }
    if (keyPressed === UP_KEY && !goingDown){
        dx=0;
        dy=-10;

    }
    if (keyPressed === RIGHT_KEY && !goingLeft){
        dx=10;
        dy=0;

    }
    if (keyPressed=== DOWN_KEY && !goingUp){
        dx=0;
        dy=10;
    }
}
main()