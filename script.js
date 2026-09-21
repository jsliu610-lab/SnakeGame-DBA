/* script.js - 貪食蛇完整邏輯控制 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const overlay = document.getElementById('gameOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlaySub = document.getElementById('overlaySub');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let food = { x: 5, y: 5 };
let dx = 1;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameInterval = null;
let isRunning = false;
let changingDirection = false;

highScoreEl.textContent = highScore;

function startGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    dx = 1;
    dy = 0;
    score = 0;
    scoreEl.textContent = score;
    spawnFood();
    overlay.classList.add('opacity-0', 'pointer-events-none');
    isRunning = true;
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 110);
}

function gameLoop() {
    changingDirection = false;
    update();
    if (!isRunning) {
        return;
    }
    if (checkGameOver()) {
        endGame();
        return;
    }
    draw();
}

function update() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.textContent = score;
        if (score > highScore) {
            highScore = score;
            highScoreEl.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        if (!spawnFood()) {
            draw();
            endGame("你贏了！", `你的最終得分: ${score}`);
            return;
        }
    } else {
        snake.pop();
    }
}

function spawnFood() {
    if (snake.length >= tileCount * tileCount) {
        return false;
    }

    do {
        food.x = Math.floor(Math.random() * tileCount);
        food.y = Math.floor(Math.random() * tileCount);
    } while (snake.some(part => part.x === food.x && part.y === food.y));

    return true;
}

function checkGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }

    ctx.fillStyle = '#f43f5e';
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc((food.x * gridSize) + gridSize/2, (food.y * gridSize) + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? '#10b981' : '#34d399';
        ctx.shadowColor = index === 0 ? '#10b981' : 'transparent';
        ctx.shadowBlur = index === 0 ? 6 : 0;
        ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
    });
    ctx.shadowBlur = 0;
}

function endGame(title = "遊戲結束！", subtext = `你的最終得分: ${score}`) {
    clearInterval(gameInterval);
    isRunning = false;
    overlayTitle.textContent = title;
    overlaySub.textContent = subtext;
    overlay.classList.remove('opacity-0', 'pointer-events-none');
}

function changeDirection(dir) {
    if (!isRunning || changingDirection) return;
    
    if (dir === 'UP' && dy === 0) {
        dx = 0; dy = -1;
        changingDirection = true;
    }
    if (dir === 'DOWN' && dy === 0) {
        dx = 0; dy = 1;
        changingDirection = true;
    }
    if (dir === 'LEFT' && dx === 0) {
        dx = -1; dy = 0;
        changingDirection = true;
    }
    if (dir === 'RIGHT' && dx === 0) {
        dx = 1; dy = 0;
        changingDirection = true;
    }
}

window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    const isUp = e.key === 'ArrowUp' || e.code === 'KeyW' || key === 'w';
    const isDown = e.key === 'ArrowDown' || e.code === 'KeyS' || key === 's';
    const isLeft = e.key === 'ArrowLeft' || e.code === 'KeyA' || key === 'a';
    const isRight = e.key === 'ArrowRight' || e.code === 'KeyD' || key === 'd';

    if (isUp) { e.preventDefault(); changeDirection('UP'); }
    if (isDown) { e.preventDefault(); changeDirection('DOWN'); }
    if (isLeft) { e.preventDefault(); changeDirection('LEFT'); }
    if (isRight) { e.preventDefault(); changeDirection('RIGHT'); }
});