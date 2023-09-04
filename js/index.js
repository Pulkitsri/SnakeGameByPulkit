//Game Constants & Variables 
let inputDir ={x:0 ,y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound =  new Audio('music/gameover.mp3');
const moveSound =  new Audio('music/move.mp3');
const musicSound =  new Audio('music/music.mp3');
let speed =5;
let score =0;
let lastPaintTime =0;
let snakeArray = [{x:10,y:10}];
let food = {x:16,y:7};

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed ){
        return;
    }    
    lastPaintTime =  ctime;
    gameEngine();
    
}

function isCollide(sarr){
    return false;      
}
function gameEngine(){
    //musicSound.play();
    //Part 1 : Updating the Snake array & Food
    if(isCollide(snakeArray)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game Over. Press ant key to play again!");
        snakeArray = [{x:20,y:10}];
        musicSound.play();
        score =0;

    }

    //If you have eaten the food, incrememnt the score and regenerate the food
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        foodSound.play();
        snakeArray.unshift({x:snakeArray[0].x + inputDir.x,y:snakeArray[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = {x : Math.round(a+(b -a)* Math.random())};
    } 

    //Moving the snake
    for (let i = snakeArray.length -2; i >= 0 ; i--) {
        snakeArray[i+1] = {...snakeArray[i]};  // to create a new object to avoid ref problem
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;



    //Part 2 : Display the Snake and Food
    //Display the Snake
    board.innerHTML ="";
    snakeArray.forEach((e,index)=>{
        snakeElement =  document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColStart = e.x;
        if(index === 0 ){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
       
        board.appendChild(snakeElement);
    });

    //Display the Food
        foodElement =  document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}

//Main logic starts here
 window.requestAnimationFrame(main);
 window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1};  //Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
 })


 //Continue from 58:35 codeWithharry