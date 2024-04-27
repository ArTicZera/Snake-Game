let snake;
let food;
let gridSize = 20;
let canvasSize = 400;
let snakeBody = [];
let xSpeed = 0;
let ySpeed = 0;

function setup() 
{
  createCanvas(canvasSize, canvasSize);
  frameRate(10);
  snakeBody.push(createVector(floor(width / 2), floor(height / 2)));
  foodLocation();
}

function draw() 
{
  background(220);
  updateSnake();
  showSnake();

  if (eatFood()) 
  {
    foodLocation();
  } 
  else 
  {
    death();
  }

  fill(255, 0, 0);
  rect(food.x, food.y, gridSize, gridSize);
}

function keyPressed() 
{
  if (keyCode === UP_ARROW && ySpeed !== 1) 
  {
    xSpeed = 0;
    ySpeed = -1;
  } 
    
  else if (keyCode === DOWN_ARROW && ySpeed !== -1) 
  {
    xSpeed = 0;
    ySpeed = 1;
  } 
    
  else if (keyCode === LEFT_ARROW && xSpeed !== 1) 
  {
    xSpeed = -1;
    ySpeed = 0;
  } 
    
  else if (keyCode === RIGHT_ARROW && xSpeed !== -1) 
  {
    xSpeed = 1;
    ySpeed = 0;
  }
}

function foodLocation()
{
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(gridSize);
}

function updateSnake() 
{
  let head = snakeBody[snakeBody.length - 1].copy();
  head.x += xSpeed * gridSize;
  head.y += ySpeed * gridSize;
  snakeBody.shift();
  snakeBody.push(head);
}

function showSnake() 
{
  for (let i = 0; i < snakeBody.length; i++) 
  {
    fill(0);
    noStroke();
    rect(snakeBody[i].x, snakeBody[i].y, gridSize, gridSize);
  }
}

function eatFood() 
{
  let head = snakeBody[snakeBody.length - 1];
  
  if (head.x === food.x && head.y === food.y) 
  {
    let tail = snakeBody[0].copy();
    snakeBody.unshift(tail);
    return true;
  }
  return false;
}

function death() 
{
  let head = snakeBody[snakeBody.length - 1];
  
  if (head.x > width - gridSize || head.x < 0 || head.y > height - gridSize || head.y < 0) 
  {
    background(255, 0, 0);
    noLoop();
  }
  
  for (let i = 0; i < snakeBody.length - 1; i++) 
  {
    let part = snakeBody[i];
    if (part.x === head.x && part.y === head.y) {
      background(255, 0, 0);
      noLoop();
    }
  }
}
