const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

let gameFrame = 0
let playerFrame = 0
let playerDirection = 'right'
let playerState = 'idle'

const playerIdleRight = new Image();
playerIdleRight.src = './stick_man_idle-r.png';
const playerIdleLeft = new Image();
playerIdleLeft.src = './stick_man_idle-l.png';
const playerWalkLeft = new Image();
playerWalkLeft.src = './stick_man_walk-l.png';
const playerWalkRight = new Image();
playerWalkRight.src = './stick_man_walk-r.png';

let playerX = 0;
let playerY = canvas.height- 220;

let sx = 0
let sy = 0
let sWidth = 794
let sHeight = 778
//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

const drawPlayer = () => {
    let selectedImage = playerIdleRight;
    if (playerDirection === 'left' && playerState === 'idle') selectedImage = playerIdleLeft
    else if (playerDirection === 'right' && playerState === 'idle') selectedImage = playerIdleRight
    else if (playerDirection === 'left' && playerState === 'walk') selectedImage = playerWalkLeft
    else if (playerDirection === 'right' && playerState === 'walk') selectedImage = playerWalkRight

  ctx.drawImage(selectedImage,sx * sWidth, sy * sHeight, sWidth, sHeight, playerX, playerY, canvas.width/2, canvas.height/2);
};

const animation = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();


    //We used 10 to control our animation frame rate
    if (gameFrame % 10 === 0) {
        playerFrame++
        sx = playerFrame % 4 //4 represents how many sprite images in a row
        sy = Math.floor((playerFrame / 16) % 4) //16 represents total image in a sprite and 4 represnts num of images in a column
    }

    gameFrame++
  requestAnimationFrame(animation);
};

animation();

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        playerX -= 10 
        playerState = 'walk'
        playerDirection = 'left';
    }
    if (event.code === 'ArrowRight') {
        playerX += 10 
        playerState = 'walk'
        playerDirection = 'right';
  }
});
document.addEventListener('keyup', (event) => {
    playerState = 'idle'
})