let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //define o plano em 2D
let box = 32;
let snake = []; //array

/* Variável de Pontuação */
let score = document.getElementById('score');
score.innerHTML = 0

/* Variável de Velocidade */
let speed = document.querySelector('input[name="speed"]:checked').value;

/* Definindo o tamanho da Snake */
snake[0] = { 
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
/* Definir a variável comida de forma aleatória
   Math.floor retira a parte flutuante
   Math.random retorna um número aleatório
   */
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
/**
 * Criar o background
 * fillStyle - Define o estilo/cor do atributo
 * fillRect - Desenha o background pelo tamanho definido
 */
function createBG() { 
    context.fillStyle = "lightgreen"; 
    context.fillRect(0, 0, 16 * box, 16 * box);
}
/**
 * Criar a Snake
 * fillStyle - Definindo a cor da Snake
 * fillRect - Desenha a Snake na posição x, y.
 */
function createSnake(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}
/* Função da "Comida" (drawFood) da Snake */
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
} 

/* Registra a espera do evento */
document.addEventListener('keydown', update);
/*Função de direção da Snake e impossibilidade da direção oposta */
function update (event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

/*Início de Jogo */
function startGame(){
    /* Recebe uma nova propriedade onde fica em "looping" no Box */
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0  && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y =0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box; 
    
    /* Para o jogo caso a Head se choque com o corpo da Snake */
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert('Game Over :/')
        }    
    }

    /* chamando as funções */
    createBG();
    createSnake();
    drawFood();
    
    /* Define zona inicial da Snake. */
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    /* Define a movimentação da Snake */
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    
    /* Aumenta o tamanho da Snake e gera novo Food random */
    if(snakeX != food.x || snakeY != food.y){
     /* Remove o último pixel a cada movimento da Snake
        atribuido pelo Array */
        snake.pop();
    }   
    else {
        score.innerHTML++
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    /* Define a Snake's head */
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}
/*Reinício de Jogo */
function restartGame(){
    clearInterval(game);
    
    score.innerHTML = 0
    
    snake = [];
    snake [0] = {
        x: 8 * box,
        y: 8 * box
    }

    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
    
    speed = document.querySelector('input[name="speed"]:checked').value

    game = setInterval(startGame, (160 / speed));
}

let game = setInterval(startGame, 100);