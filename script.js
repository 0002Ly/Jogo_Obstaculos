let player = document.getElementById("player");
let obstacle = document.getElementById("obstacle");
let statusText = document.getElementById("status");
let scoreText = document.getElementById("score");

let playerX = 135; // posição inicial do player
let obstacleY = -30; // posição inicial do obstáculo
let isGameRunning = false;
let gameInterval;
let score = 0; // Pontuação inicial
let speed = 5; // Velocidade inicial do obstáculo

document.addEventListener("keydown", function (event) {
    if (!isGameRunning) {
        startGame();
    }

    // Movimenta o jogador com as setas esquerda e direita
    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= 10;
    } else if (event.key === "ArrowRight" && playerX < 270) {
        playerX += 10;
    }
    player.style.left = playerX + "px";
});

// Funções para os botões de controle
document.getElementById("leftButton").addEventListener("click", function() {
    if (!isGameRunning) {
        startGame();
    }
    if (playerX > 0) {
        playerX -= 10;
        player.style.left = playerX + "px";
    }
});

document.getElementById("rightButton").addEventListener("click", function() {
    if (!isGameRunning) {
        startGame();
    }
    if (playerX < 270) {
        playerX += 10;
        player.style.left = playerX + "px";
    }
});

function startGame() {
    isGameRunning = true;
    statusText.textContent = "Jogo em andamento!";
    speed = 5; // Reseta a velocidade do obstáculo
    score = 0; // Reseta a pontuação
    scoreText.textContent = "Pontuação: " + score;

    gameInterval = setInterval(() => {
        // Movimenta o obstáculo
        obstacleY += speed;
        obstacle.style.top = obstacleY + "px";

        // Quando o obstáculo passar o jogador (sai da tela), pontuar e reposicionar
        if (obstacleY > 300) {
            obstacleY = -30;
            obstacle.style.left = Math.random() * 270 + "px"; // Movimenta para uma posição aleatória
            score++; // Incrementa a pontuação
            scoreText.textContent = "Pontuação: " + score;

            // Aumenta a velocidade a cada 2 obstáculos passados
            if (score % 2 === 0) {
                speed += 1; // Aumenta a velocidade
            }
        }

        // Detecta colisão
        if (detectCollision()) {
            endGame();
        }
    }, 50);
}

function detectCollision() {
    let playerRect = player.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    return !(
        playerRect.bottom < obstacleRect.top ||
        playerRect.top > obstacleRect.bottom ||
        playerRect.right < obstacleRect.left ||
        playerRect.left > obstacleRect.right
    );
}

function endGame() {
    clearInterval(gameInterval);
    isGameRunning = false;
    statusText.textContent = "Você perdeu! Pontuação final: " + score + ". Pressione qualquer tecla para reiniciar.";
    obstacleY = -30;
    score = 0; // Reseta a pontuação
    scoreText.textContent = "Pontuação: " + score;
}

// Função para criar dados coloridos no fundo
function createDice() {
    // Limitar o número de dados na tela
    if (document.getElementsByClassName('dice').length >= 10) return;

    const dice = document.createElement('div');
    dice.classList.add('dice');

    // Posiciona os dados aleatoriamente na tela
    dice.style.left = Math.random() * (window.innerWidth - 40) + 'px';
    dice.style.top = Math.random() * (window.innerHeight - 40) + 'px';
    
    document.getElementById('background').appendChild(dice);
    
    // Remove o dado após 5 segundos
    setTimeout(() => {
        dice.remove();
    }, 5000);
}

// Gera dados a cada 1 segundo
setInterval(createDice, 1000);

