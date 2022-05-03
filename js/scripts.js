import { setupGround, updateGround } from './ground.js'
import { setupDino, updateDino, getDinoRect, setDinoLose } from './dino.js'
import { setupCactus, updateCactus, getCactusRects } from './cactus.js'

const worldWidth = 100;
const worldHeight = 30;
const speedScaleIncrease = 0.00001;

const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");
const gameOverScreenElem = document.querySelector("[data-game-over-screen]");
const tryAgainElem = document.querySelector("[data-try-again]");

setWorldToPixelScale()
window.addEventListener("resize", setWorldToPixelScale);
document.addEventListener("keydown", handleStart, { once: true });

setupGround();

let cloud = document.querySelector("#cloud");

let lastTime
let speedScale
let score
function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;

    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    if (checkLose()) return handleLose();

    lastTime = time;
    window.requestAnimationFrame(update);
}

function checkLose() {
    const dinoRect = getDinoRect();
    return getCactusRects().some(rect => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function updateSpeedScale(delta) {
    speedScale += delta * speedScaleIncrease;
}

function updateScore(delta) {
    score += delta * 0.01;
    scoreElem.textContent = 'Score: ' + Math.floor(score)
}

function handleStart() {
    lastTime = null;
    speedScale = 1;
    score = 0;
    setupGround();
    setupDino();
    setupCactus();
    startScreenElem.classList.add("hide");
    gameOverScreenElem.classList.add("hide");
    tryAgainElem.classList.add("hide");
    window.requestAnimationFrame(update);
    cloud.firstElementChild.style.animation = "cloudAnimate 200s linear infinite";
}

function handleLose() {
    setDinoLose();
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true });
        gameOverScreenElem.classList.remove("hide");
        tryAgainElem.classList.remove("hide");
        cloud.firstElementChild.style.animation = "none";
    }, 100);
}

function setWorldToPixelScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < worldWidth / worldHeight) {
        worldToPixelScale = window.innerWidth / worldWidth;
    } else {
        worldToPixelScale = window.innerHeight / worldHeight;
    }

    worldElem.style.width = `${worldWidth * worldToPixelScale}px`;
    worldElem.style.height = `${worldHeight * worldToPixelScale}px`;
}