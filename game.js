const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game constants
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const BALL_RADIUS = 12;
const PLAYER_X = 20;
const AI_X = canvas.width - PADDLE_WIDTH - 20;
const PADDLE_SPEED = 7;
const AI_SPEED = 4;
const BALL_SPEED = 6;

// Paddle objects
const player = {
    x: PLAYER_X,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT
};

const ai = {
    x: AI_X,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT
};

// Ball object
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: BALL_SPEED * (Math.random() < 0.5 ? 1 : -1),
    vy: BALL_SPEED * (Math.random() * 2 - 1),
    radius: BALL_RADIUS
};

// Score
let playerScore = 0;
let aiScore = 0;

// Draw everything
function draw() {
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw middle dashed line
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#fafafa55";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillRect(ai.x, ai.y, ai.width, ai.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#fafafa";
    ctx.fill();

    // Draw score
    ctx.font = "40px Arial";
    ctx.fillStyle = "#fafafa";
    ctx.textAlign = "center";
    ctx.fillText(playerScore, canvas.width / 2 - 60, 50);
    ctx.fillText(aiScore, canvas.width / 2 + 60, 50);
}

// Main game loop
function update() {
    // Move ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Wall collision (top/bottom)
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.vy *= -1;
    } else if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.vy *= -1;
    }

    // Paddle collision (player)
    if (
        ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.x = player.x + player.width + ball.radius;
        ball.vx *= -1;
        // Add a bit of "spin"
        let collidePoint = ball.y - (player.y + player.height / 2);
        collidePoint = collidePoint / (player.height / 2);
        ball.vy = BALL_SPEED * collidePoint;
    }

    // Paddle collision (AI)
    if (
        ball.x + ball.radius > ai.x &&
        ball.y > ai.y &&
        ball.y < ai.y + ai.height
    ) {
        ball.x = ai.x - ball.radius;
        ball.vx *= -1;
        // Add a bit of "spin"
        let collidePoint = ball.y - (ai.y + ai.height / 2);
        collidePoint = collidePoint / (ai.height / 2);
        ball.vy = BALL_SPEED * collidePoint;
    }

    // Score check
    if (ball.x + ball.radius < 0) {
        aiScore++;
        resetBall();
    } else if (ball.x - ball.radius > canvas.width) {
        playerScore++;
        resetBall();
    }

    // Simple AI movement
    let aiCenter = ai.y + ai.height / 2;
    if (aiCenter < ball.y - 10) {
        ai.y += AI_SPEED;
    } else if (aiCenter > ball.y + 10) {
        ai.y -= AI_SPEED;
    }
    // Clamp AI paddle within bounds
    ai.y = Math.max(0, Math.min(ai.y, canvas.height - ai.height));
}

// Mouse control for player paddle
canvas.addEventListener('mousemove', function (evt) {
    let rect = canvas.getBoundingClientRect();
    // Get mouse position relative to canvas
    let mouseY = evt.clientY - rect.top;
    // Center paddle on mouse
    player.y = mouseY - player.height / 2;
    // Clamp within bounds
    player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));
});

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = BALL_SPEED * (Math.random() < 0.5 ? 1 : -1);
    ball.vy = BALL_SPEED * (Math.random() * 2 - 1);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();