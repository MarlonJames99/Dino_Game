import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const dinoElem = document.querySelector("[data-dino]");
const jumpSpeed = 0.40;
const gravity = 0.0015;
const dinoFrameCount = 2;
const frameTime = 100;

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
export function setupDino() {
    isJumping = false;
    dinoFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;
    setCustomProperty(dinoElem, "--bottom", 0);
    document.removeEventListener("keydown", onJump);
    document.addEventListener("keydown", onJump);
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale);
    handleJump(delta);
}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect();
}

export function setDinoLose() {
    dinoElem.src = `./img/dino-lose.png`;
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        dinoElem.src = `./img/dino-stationary.png`;
        return;
    }

    if (currentFrameTime >= frameTime) {
        dinoFrame = (dinoFrame + 1) % dinoFrameCount;
        dinoElem.src = `./img/dino-run-${dinoFrame}.png`;
        currentFrameTime -= frameTime;
    }
    currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
    if (!isJumping)
        return;

    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta);

    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
        setCustomProperty(dinoElem, "--bottom", 0);
        isJumping = false;
    }

    yVelocity -= gravity * delta;
}

function onJump(e) {
    if (e.code !== "Space" || isJumping)
        return;

    yVelocity = jumpSpeed;
    isJumping = true;
}
