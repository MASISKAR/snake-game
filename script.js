/*Created by Sirius MK (Masis Karaetyan) on 18.06.2017. */
/*Finished on 23.06.2017.*/

var gameZone = document.getElementById("gameZone");
//создаем блоки внутри gameZone
for (var j = 0; j < 26; j++) {
    var line = document.createElement("div");
    line.setAttribute("class", "line");
    gameZone.appendChild(line);
    for (var i = 0; i < 26; i++) {
        var block = document.createElement("div");
        block.setAttribute('id', j + "x" + i);
        block.setAttribute('class', "block");
        line.appendChild(block);
    }
}

var score = 0;
var direction = "down";
//создаем функцию кнопки play и обратный счет
var play = document.getElementById("play");
var continueGame = document.getElementById("continue");
var countdown = document.getElementById("Countdown");
function Go() {
    var cnt;
    cnt = 3;
    play.style.display = "none";
    countdown.style.display = "block";
    var interval = setInterval(function () {
        if (cnt == "GO!") {
            clearInterval(interval);
            countdown.style.display = "none";
            gameZone.style.background = "#8A8787";
            moveDown();
            addEvent();
            cnt = 4;

        }
        cnt--;
        if (cnt < 1)
            cnt = "GO!";
        countdown.innerHTML = cnt;
    }, 200);
}
play.onclick = Go;
function resume() {
    document.getElementById("pause_win_gameover").style.display = "none";
    switch (direction) {
        case "up":
            moveUp();
            break;
        case "down":
            moveDown();
            break;
        case "left":
            moveLeft();
            break;
        case "right":
            moveRight();
            break;
    }
    addEvent();
}
continueGame.onclick = resume;
function pause() {
    clearEvent();
    clearInterval(timer);
    document.getElementById("pause_win_gameover").style.display = "block";
    document.getElementById("paused").style.color = "#333333";
    document.getElementById("yourScore").style.display = "none";
    document.getElementById("paused").innerHTML = "PAUSED";
    document.getElementById("continue").innerHTML = "Resume";

}
function addEvent() {
    document.getElementById("downKey").setAttribute("onclick", "moveDown()");
    document.getElementById("upKey").setAttribute("onclick", "moveUp()");
    document.getElementById("leftKey").setAttribute("onclick", "moveLeft()");
    document.getElementById("rightKey").setAttribute("onclick", "moveRight()");
    document.getElementById("pause").setAttribute("onclick", "pause()");
    addEventListener("keydown", moveWithKey);
}

function clearEvent() {
    document.getElementById("downKey").removeAttribute("onclick");
    document.getElementById("upKey").removeAttribute("onclick");
    document.getElementById("leftKey").removeAttribute("onclick");
    document.getElementById("rightKey").removeAttribute("onclick");
    removeEventListener("keydown", moveWithKey);
}

// создаем змейку
var head;
var headY = 3;
var headX = 0;
var highscore = 0;
var snake;
var eat = 0;
snake = ["3x0", "2x0", "1x0", "0x0"];

createSnake();
function createDeleteSnakeBlock(y, x, tail) {
    var snakeBlock = document.getElementById(y + "x" + x);
    if (headX < 0 || headX > 25 || headY < 0 || headY > 25) {
        gameOver();
    }
    else {
        snakeBlock.style.background = "#333333";
        if (tail != "0")
            document.getElementById(tail).style.background = "";
        head = snake[0];
        for (var i = 1; i < snake.length; i++) {
            if (snake[i] == snake[0]) {
                gameOver();
                break;
            }
        }
        if (head == foodCoord) {
            if (snake.length == 676)
                youWon();
            playSound("sounds/sound.mp3");
            food.classList.remove("animated");
            score += 100;
            document.getElementById("currentScore").innerHTML = score;
            eat = 1;
            createFood();
        }
    }
}

function createSnake() {
    for (var y = 0; y <= 3; y++)
        createDeleteSnakeBlock(y, 0, "0");
}

// создаем функцию создание еды
var foodCoord;
var food;
function createFood() {
    var foodCoordX = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
    var foodCoordY = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
    foodCoord = foodCoordY + "x" + foodCoordX;
    food = document.getElementById(foodCoord);
    for(var i=0; i<snake.length; i++){
        if (foodCoord == snake[i])
            createFood();
        else        food.classList.add("animated");
    }

}
createFood();

var timer;

function moveDown() {
    if (direction != "up") {
        direction = "down";
        clearInterval(timer);
        timer = setInterval(function () {
            headY++;
            snake.unshift(headY + "x" + headX);
            createDeleteSnakeBlock(headY, headX, snake[snake.length - 1]);
            if (eat == 0) {
                snake.pop();
            }
            else eat = 0;
        }, speed);
    }
}
function moveUp() {
    if (direction != "down") {
        direction = "up";
        clearInterval(timer);
        timer = setInterval(function () {
            headY--;
            snake.unshift(headY + "x" + headX);
            createDeleteSnakeBlock(headY, headX, snake[snake.length - 1]);
            if (eat == 0) {
                snake.pop();
            }
            else eat = 0;
        }, speed);
    }
}
function moveLeft() {
    if (direction != "right") {
        direction = "left";
        clearInterval(timer);
        timer = setInterval(function () {
            headX--;
            snake.unshift(headY + "x" + headX);
            createDeleteSnakeBlock(headY, headX, snake[snake.length - 1]);
            if (eat == 0) {
                snake.pop();
            }
            else eat = 0;
        }, speed);
    }
}
function moveRight() {
    if (direction != "left") {
        direction = "right";
        clearInterval(timer);
        timer = setInterval(function () {
            headX++;
            snake.unshift(headY + "x" + headX);
            createDeleteSnakeBlock(headY, headX, snake[snake.length - 1]);
            if (eat == 0) {
                snake.pop();
            }
            else eat = 0;
        }, speed);
    }
}

function moveWithKey(event) {
    switch (event.keyCode) {
        case 37:  // если нажата клавиша влево
            moveLeft();
            break;
        case 38:   // если нажата клавиша вверх
            moveUp();
            break;
        case 39:   // если нажата клавиша вправо
            moveRight();
            break;
        case 40:   // если нажата клавиша вниз
            moveDown();
            break;
        case 27:   // если нажата клавиша Esc
            pause();
            break;

    }
}

var speed = 200;
function changeSpeed(flag) {
    var string = document.getElementById("currentSpeed");
    if (flag) {
        if (speed > 50) {
            speed -= 50;
            string.innerHTML = +string.innerHTML + 1;
        }
    }
    else if (speed < 300) {
        speed += 50;
        string.innerHTML = +string.innerHTML - 1;
    }
}

function retry() {
    for (var i = 0; i < 675; i++)
        document.getElementsByClassName("block")[i].style.background = "rgba(0, 0, 0, 0)";
    snake = ["3x0", "2x0", "1x0", "0x0"];
    headY = 3;
    headX = 0;
    score = 0;
    eat = 0;
    food.classList.remove("animated");
    direction = "down";
    Go();
    document.getElementById("currentScore").innerHTML = "0";
    createSnake();
    createFood();
    clearEvent();
    clearInterval(timer);
    document.getElementById("pause_win_gameover").style.display = "none";
}

function gameOver() {
    clearEvent();
    clearInterval(timer);
    document.getElementById("pause_win_gameover").style.display = "block";
    document.getElementById("yourScore").style.display = "block";
    document.getElementById("yourScore").innerHTML = "Your Score: " + score;
    document.getElementById("paused").innerHTML = "Game Over!";
    document.getElementById("paused").style.color = "rgb(74, 6, 6)";
    document.getElementById("continue").innerHTML = "Play Again";
    document.getElementById("continue").onclick = retry;
    playSound("sounds/gameover.mp3");
    if (score > highscore) {
        highscore = score;
        document.getElementById("highScore").innerHTML = highscore;
    }
}
function youWon() {
    clearEvent();
    clearInterval(timer);
    document.getElementById("pause_win_gameover").style.display = "block";
    document.getElementById("pause_win_gameover").style.background = "url(images/snake.gif) no-repeat";
    document.getElementById("yourScore").style.display = "block";
    document.getElementById("play").style.display = "none"
    document.getElementById("yourScore").innerHTML = "Your Score: " + score;
    document.getElementById("paused").innerHTML = "You Won!";
    document.getElementById("paused").style.color = "rgb(4, 7, 74)";
    document.getElementById("continue").innerHTML = "Play Again";
    document.getElementById("continue").onclick = retry;
    if (score > highscore) {
        highscore = score;
        document.getElementById("highScore").innerHTML = highscore;
    }
}

function playSound(source){
    var audio = new Audio();
    audio.src = source;
    audio.autoplay = true;
}