import { GuiUniverse } from "./gui.js";
import { CONSTANTS } from "./constants.js";

// const mainGameLoopDelta = 1000;
// const gameProperties = {
//   mainCounter: 0,
//   elements: {
//     hydrogen: {
//       id: "element-hydrogen",
//       displayName: "Hydrogen",
//       count: 0,
//       multiplier: 1,
//       additive: 0,
//     },
//     helium: {
//       id: "element-helium",
//       displayName: "Helium",
//       count: 0,
//       multiplier: 1,
//       additive: 0,
//     },
//   },
// };
// let mainGameLoopInterval;
let guiManager = undefined;

function FofX(multiplier, additive, x) {
  return multiplier * x + additive * x;
}

function increaseElement(elementKey, dt) {
  CONSTANTS.gameProperties.elements[elementKey].count += FofX(
    CONSTANTS.gameProperties.elements[elementKey].multiplier,
    CONSTANTS.gameProperties.elements[elementKey].additive,
    dt
  );
}

function increaseElementsLoop(dt) {
  const elements = Object.keys(CONSTANTS.gameProperties.elements);
  for (let i = 0; i < elements.length; i++) {
    increaseElement(elements[i], dt);
  }
}

function mainGameLoop(delta) {
  CONSTANTS.gameProperties.mainCounter += 1;
  increaseElementsLoop(delta / 1000);
  guiManager.updateAllUICounters();
}

function startGameLoop() {
  if (!CONSTANTS.gameIntervals.mainGameLoopInterval) {
    CONSTANTS.gameIntervals.mainGameLoopInterval = setInterval(function () {
      mainGameLoop(CONSTANTS.mainGameLoopDelta);
    }, CONSTANTS.mainGameLoopDelta);
    console.log(
      `Interval started ${CONSTANTS.gameIntervals.mainGameLoopInterval}`
    );
  }
}

function stopGameLoop() {
  console.log(
    `Interval cleared ${CONSTANTS.gameIntervals.mainGameLoopInterval}`
  );
  clearInterval(CONSTANTS.gameIntervals.mainGameLoopInterval);
  CONSTANTS.gameIntervals.mainGameLoopInterval = undefined;
}

window.addEventListener("load", function () {
  guiManager = new GuiUniverse(CONSTANTS.gameProperties);
  guiManager.buildElmentCounterDisplay();
  guiManager.attachStartLoopButton(() => {
    return startGameLoop();
  });
  guiManager.attachStopLoopButton(() => {
    return stopGameLoop();
  });
});
