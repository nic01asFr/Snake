const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
};

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width/ tileCount -2;
let headX = tileCount/ 2;
let headY = tileCount/ 2;

let appleX = tileCount /4;
let appleY = tileCount /4;

let xVelocity = 0;
let yVelocity = 0;

const snakeParts = [];
let snakeLength = 2;
let score = 0;

audioLooseList = [
    new Audio('https://www.myinstants.com/media/sounds/motus-boule-noire.mp3'),
    new Audio('https://www.myinstants.com/media/sounds/tes-mauvais-jack.mp3'),
    new Audio('https://www.myinstants.com/media/sounds/euh-nique-ta-mere.mp3'),
    new Audio('https://www.myinstants.com/media/sounds/sarkozy-quelle-indignite.mp3'),
    new Audio('https://www.myinstants.com/media/sounds/pas-ca-zinedine-mp3cut.mp3'),
    new Audio('https://www.myinstants.com/media/sounds/hitler-nein_1.mp3'),
    new Audio('https://www.myinstants.com/media/sounds/bah-oui-connard-alphacast.mp3'),
    new Audio('https://www.myinstants.com/media/sounds/chewbacca.swf.mp3'),
    new Audio('https://www.myinstants.com/media/sounds/the-lion-sleeps-tonight.mp3'),
    new Audio('https://www.myinstants.com/media/sounds/the-simpsons-nelsons-haha.mp3'),

]

gulpSound = new Audio('http://www.eng.auburn.edu/~sealscd/COMP7970/project/3Dstudio/levels/MISSION2/hambu.WAV');

looseSound = audioLooseList[Math.floor(Math.random()*(audioLooseList.length))];

function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    detectCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/ speed);
};
function isGameOver() {
    let gameOver = false;

    if(xVelocity == 0 && yVelocity == 0){
        return false;
    };

    //walls
    if(headX < 0){
        gameOver = true;
        looseSound.play();
    };
    if(headX == tileCount){
        gameOver = true;
        looseSound.play();
    };
    if(headY < 0){
        gameOver = true;
        looseSound.play();
    };
    if(headY == tileCount){
        gameOver = true;
        looseSound.play();
    };
    //snake body
    for(i= 0; i< snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x == headX && part.y == headY){
            gameOver = true;
            looseSound.play();
            break;
        };
    };
    if(gameOver){
        context.fillStyle = 'hsla(90deg, 50%, 5%, 0.9)';
    
        context.font = '50px Verdana';
        context.fillText("OK Boomer", canvas.width / 6.5, canvas.height /2)
    }
    return gameOver;
}
function clearScreen() {
    context.fillStyle = 'hsla(90deg, 80%, 60%, 0.9)';
    context.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
    context.fillStyle = 'hsla(90deg, 90%, 30%, 0.8)';
    for(i= 0; i < snakeParts.length ; i++){
        let part = snakeParts[i];
        context.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)

    };

    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > snakeLength){
        snakeParts.shift();
    }

    context.fillStyle = 'hsla(90deg, 90%, 5%, 0.9)'
    context.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize)

}
function drawApple() {
    context.fillStyle = 'hsla(90deg, 50%, 1%, 0.9)'
    context.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
}
function drawScore() {
    context.fillStyle = "hsla(90deg, 90%, 5%, 0.9)";
    context.font = "10px Verdana";
    context.fillText("Score " + score, canvas.width - 50, 10)
}
function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}
function detectCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        snakeLength ++;
        score ++;
        gulpSound.play();
    }
}

document.body.addEventListener('keydown', keyDown);
function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1){
            return;
        };
        yVelocity = -1;
        xVelocity = 0;
    };
    //down
    if(event.keyCode == 40){
        if(yVelocity == -1){
            return;
        };
        yVelocity = 1;
        xVelocity = 0;
    };
    //left
    if(event.keyCode == 37){
        if(xVelocity == 1){
            return;
        };
        yVelocity = 0;
        xVelocity = -1;
    };
    //right
    if(event.keyCode == 39){
        if(xVelocity == -1){
            return;
        };
        yVelocity = 0;
        xVelocity = 1;
    };
}

drawGame();
