import { setCustomProperty, incrementCustomProperty, getCustomProperty } from "./updateCustomProperty.js";

const speed = 0.05;
const cactusIntervalMin = 900;
const cactusIntervalMax = 1800;
const worldElem = document.querySelector("[data-world]");

let nextCactusTime
export function setupCactus() {
    nextCactusTime = cactusIntervalMin;
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove();
    })
}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * speed * -1);
        if (getCustomProperty(cactus, "--left") <= -100) {
            cactus.remove();
        }
    })

    if (nextCactusTime <= 0) {
        createCactus();
        nextCactusTime = randomNumberBetween(cactusIntervalMin, cactusIntervalMax) / speedScale;
    }
    nextCactusTime -= delta;
}

export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect();
    });
}

function createCactus() {
    const cactus = document.createElement("img");
    cactus.dataset.cactus = true;
    cactus.src = `./img/cactus.png`;
    cactus.classList.add("cactus");
    setCustomProperty(cactus, "--left", 100);
    worldElem.append(cactus);
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
