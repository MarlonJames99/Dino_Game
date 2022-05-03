import { setupGround, updateGround } from './ground.js'
import { setupDino, updateDino, getDinoRect } from './dino.js'
import { setupCactus, updateCactus, getCactusRects } from './cactus.js'

const worldWidth = 100;
const worldHeight = 30;
const speedScaleIncrease = 0.00001;

const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");

setWorldToPixelScale()
window.addEventListener("resize", setWorldToPixelScale);
document.addEventListener("keydown", handleStart, { once: true });

setupGround();

let lastTime
let speedScale
let score
function update(time) {
    if(lastTime == null) {
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

    lastTime = time;
    window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
    speedScale += delta * speedScaleIncrease;
}

function updateScore(delta) {
    score += delta * 0.01;
    scoreElem.textContent = Math.floor(score);
}

function handleStart() {
    lastTime = null;
    speedScale = 1;
    score = 0;
    setupGround();
    setupDino();
    setupCactus();
    startScreenElem.classList.add("hide");
    window.requestAnimationFrame(update);
}

function setWorldToPixelScale() {
    let worldToPixelScale
    if(window.innerWidth / window.innerHeight < worldWidth / worldHeight) {
        worldToPixelScale = window.innerWidth / worldWidth;
    } else {
        worldToPixelScale = window.innerHeight / worldHeight;
    }

    worldElem.style.width = `${worldWidth * worldToPixelScale}px`;
    worldElem.style.height = `${worldHeight * worldToPixelScale}px`;
}