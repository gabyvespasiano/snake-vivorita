const board = document.getElementById("game-board");
const snake = [];
let boardHeight = 302;
let boardWidth = boardHeight;

for (let i = 0; i < 5; i++) {
  snake.push(document.createElement("div"));
  snake[i].classList.add("snake-unit");
  snake[i].style.left = (i * 10) + "px";
  board.appendChild(snake[i]);
}
let direction = "right";

document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 37:
      if (direction !== "right") direction = "left";
      break;
    case 38:
      if (direction !== "down") direction = "up";
      break;
    case 39:
      if (direction !== "left") direction = "right";
      break;
    case 40:
      if (direction !== "up") direction = "down";
      break;
  }
};

let food = null;

function createFood() {
  food = document.createElement("div");
  food.classList.add("food-unit");
  food.style.left = (Math.floor(Math.random() * 30) * 10) + "px";
  food.style.top = (Math.floor(Math.random() * 30) * 10) + "px";
  board.appendChild(food);
}

createFood();
let moveLeft = () => {
    let headLeft = snake[0].offsetLeft;
    if (headLeft <= 0) {
      headLeft = boardWidth - 10;
    } else {
      headLeft -= 10;
    }
    snake[0].style.left = headLeft + "px";
  };
  
  let moveRight = () => {
    let headLeft = snake[0].offsetLeft;
    if (headLeft >= boardWidth - 10) {
      headLeft = 0;
    } else {
      headLeft += 10;
    }
    snake[0].style.left = headLeft + "px";
  };
  
  let moveUp = () => {
    let headTop = snake[0].offsetTop;
    if (headTop <= 0) {
      headTop = boardHeight - 10;
    } else {
      headTop -= 10;
    }
    snake[0].style.top = headTop + "px";
  };
  
  let moveDown = () => {
    let headTop = snake[0].offsetTop;
    if (headTop >= boardHeight - 10) {
      headTop = 0;
    } else {
      headTop += 10;
    }
    snake[0].style.top = headTop + "px";
  };
  
setInterval(function() {
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].style.left = snake[i - 1].style.left;
    snake[i].style.top = snake[i - 1].style.top;
  }

  switch (direction) {
    case "left":
      moveLeft();
      break;
    case "up":
      moveUp();
      break;
    case "right":
      moveRight();
      break;
    case "down":
        moveDown();
      break;
  }
  if (Math.abs(snake[0].offsetLeft - food.offsetLeft) <10 && Math.abs(snake[0].offsetTop - food.offsetTop) < 10) {
    snake.push(document.createElement("div"));
    snake[snake.length - 1].classList.add("snake-unit");
    snake[snake.length - 1].style.left = (snake.length - 1 * 10) + "px";
    board.appendChild(snake[snake.length - 1]);

    board.removeChild(food);
    createFood();
  }
}, 100);
snake[0].style.top = (snake[0].offsetTop - 9) + "px";