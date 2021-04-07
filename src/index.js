import { GuiUniverse } from "./gui.js";

const mainGameLoopDelta = 1000;
const gameProperties = {
  mainCounter: 0,
  elements: {
    hydrogen: {
      id: "element-hydrogen",
      displayName: "Hydrogen",
      count: 0,
      multiplier: 1,
      additive: 0,
    },
    helium: {
      id: "element-helium",
      displayName: "Helium",
      count: 0,
      multiplier: 1,
      additive: 0,
    },
  },
};
let mainGameLoopInterval;

function FofX(multiplier, additive, x) {
  return multiplier * x + additive * x;
}

function increaseElement(elementKey, dt) {
  gameProperties.elements[elementKey].count += FofX(
    gameProperties.elements[elementKey].multiplier,
    gameProperties.elements[elementKey].additive,
    dt
  );
}

function increaseElementsLoop(dt) {
  const elements = Object.keys(gameProperties.elements);
  for (let i = 0; i < elements.length; i++) {
    increaseElement(elements[i], dt);
  }
}

function mainGameLoop(delta) {
  gameProperties.mainCounter += 1;
  increaseElementsLoop(delta / 1000);
  updateAllUICounters();
}

function startGameLoop() {
  if (!mainGameLoopInterval) {
    mainGameLoopInterval = setInterval(function () {
      mainGameLoop(mainGameLoopDelta);
    }, mainGameLoopDelta);
    console.log(`Interval started ${mainGameLoopInterval}`);
  }
}

function stopGameLoop() {
  console.log(`Interval cleared ${mainGameLoopInterval}`);
  clearInterval(mainGameLoopInterval);
  mainGameLoopInterval = undefined;
}

window.addEventListener("load", function () {
  const guiManager = new GuiUniverse(gameProperties);
  guiManager.buildElmentCounterDisplay();
  guiManager.attachStartLoopButton(() => {
    return startGameLoop();
  });
  guiManager.attachStopLoopButton(() => {
    return stopGameLoop();
  });
});
