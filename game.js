const board = document.getElementById("game-board");
const snake = [];
//Define el tamaño del tablero
let boardHeight = 602;
let boardWidth = boardHeight;
let puntaje = document.getElementById("puntaje");
let speed =200;
//aqui editar css con el tamaño del tablero del js

// Crea 5 elementos "div" y los agrega a un array llamado "snake"
// Cada elemento se le asigna la clase "snake-unit" y se le da una posición inicial
// Por último, se agrega cada elemento a la tabla de juego
for (let i = 0; i < 5; i++) {
  snake.push(document.createElement("div"));
  snake[i].classList.add("snake-unit");
  snake[i].style.left = (i * 10) + "px";
  board.appendChild(snake[i]);
}
function generarColorAleatorio() {
  var r = Math.floor(Math.random() * 128) + 128;
  var g = Math.floor(Math.random() * 128) + 128;
  var b = Math.floor(Math.random() * 128);
  return "rgba(" + r + ", " + g + ", " + b + ", 0.8)";
}


function check(variable){

}
// Establece la dirección inicial del juego hacia la derecha
function head(position){
    switch (position) {
      case "up":
        snake[0].classList.toggle("top-left", true);
        snake[0].classList.toggle("top-right", true);
        snake[0].classList.toggle("bottom-left", false);
        snake[0].classList.toggle("bottom-right", false);
        break;
      case "right":
        snake[0].classList.toggle("top-left", false);
        snake[0].classList.toggle("top-right", true);
        snake[0].classList.toggle("bottom-left", false);
        snake[0].classList.toggle("bottom-right", true);
        break;
      case "down":
        snake[0].classList.toggle("top-left", false);
        snake[0].classList.toggle("top-right", false);
        snake[0].classList.toggle("bottom-left", true);
        snake[0].classList.toggle("bottom-right", true);
        break;
      case "left":
        snake[0].classList.toggle("top-left", true);
        snake[0].classList.toggle("top-right", false);
        snake[0].classList.toggle("bottom-left", true);
        snake[0].classList.toggle("bottom-right", false);
        break;
    
  }
  // if (){//snake.classList.contains('up')
  //     snake.classList.remove('up');
  //   }
}
let direction = "right";

// Detecta el evento de presionar una tecla y cambia la dirección según la tecla presionada
// Las teclas permitidas son izquierda (37), arriba (38), derecha (39) y abajo (40)
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

// Crea una variable para la comida en el juego
let food = null;

// Función que crea un elemento de comida en una posición aleatoria en el tablero de juego
function createFood() {
  food = document.createElement("div");
  food.classList.add("food-unit");
  food.innerText = "🍎";
  food.style.left = (Math.floor(Math.random() * 30) * 10) + "px";
  food.style.top = (Math.floor(Math.random() * 30) * 10) + "px";
  board.appendChild(food);

}

// Llamar la función createFood() para crear la primera comida en el juego
createFood();

// Funciones para mover la serpiente a la izquierda, derecha, arriba y abajo
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
    //agrega una clase a la cabeza
    snake[0].classList.add("head")
  
//Establece un intervalo de tiempo para la ejecución de la función
let intervalo = setInterval(function() {
  main();
}, speed);
function main(){

  //Ciclo for para actualizar la posición de cada unidad de la serpiente
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].style.left = snake[i - 1].style.left;
    snake[i].style.top = snake[i - 1].style.top;
  }

  //Switch para determinar la dirección de movimiento de la serpiente
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
  head(direction);
  if (parseInt(puntaje.innerText)>0){
    for (let i = 2; i < snake.length; i++) {
      if (snake[0].style.top == snake[i].style.top && snake[0].style.left == snake[i].style.left) {
        //clearInterval(gameLoop);
        alert("Game Over");
        //console.log("asd")
        location.reload();
        break;
      }
    }
  }
  //Condicional para detectar si la serpiente come la comida
  if (Math.abs(snake[0].offsetLeft - food.offsetLeft) <10 && 
      Math.abs(snake[0].offsetTop - food.offsetTop) < 10) {
    //suma puntaje si agarra comida
    puntaje.innerText = 10 + parseInt(puntaje.innerText);
    //puntaje.classList.toggle("animar", true);
    clearInterval(intervalo);
    if (speed > 50){
    speed = speed-10;

   }
   intervalo = setInterval(function() {
    main();
  }, speed);
    puntaje.animate([{opacity: 0},{opacity: 1}],{ duration: 500});
    puntaje.style.color = generarColorAleatorio();
    //Agrega una nueva unidad a la serpiente
    snake.push(document.createElement("div"));
    snake[snake.length - 1].classList.add("snake-unit");
    snake[snake.length - 1].style.left = (snake.length - 1 * 10) + "px";
    board.appendChild(snake[snake.length - 1]);

    //Elimina la comida actual y crea una nueva
    board.removeChild(food);
    createFood();
  }
}