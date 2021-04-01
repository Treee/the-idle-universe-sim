const mainGameLoopDelta = 1000;
const gameProperties = {
  mainCounter: 0,
  elements: {
    hydrogen: {
      count: 0,
      formula: (multiply, additive, dt) => {
        return multiply * dt + dt * additive;
      },
    },
    helium: {
      count: 0,
    },
  },
};
let mainGameLoopInterval;

function increaseHydrogen(dt) {
  const increase = gameProperties.elements.hydrogen.formula(1, 1, dt);
  gameProperties.elements.hydrogen.count += increase;
}

function attachStartLoopButton() {
  document
    .getElementById("btn-mainloop-unpause")
    .addEventListener("click", startGameLoop);
}

function startGameLoop() {
  mainGameLoopInterval = setInterval(function () {
    mainGameLoop(mainGameLoopDelta);
  }, mainGameLoopDelta);
}

function mainGameLoop(delta) {
  increaseHydrogen(delta / 1000);
  gameProperties.mainCounter += 1;
  updateUICounter("main-counter", gameProperties.mainCounter);
  updateUICounter("element-hydrogen", gameProperties.elements.hydrogen.count);
  // console.log(`Increment ${gameProperties.mainCounter++}`);
}

function updateUICounter(id, counter) {
  document.getElementById(id).innerHTML = counter;
}

function attachStopLoopButton() {
  document
    .getElementById("btn-mainloop-pause")
    .addEventListener("click", stopGameLoop);
}

function stopGameLoop() {
  clearInterval(mainGameLoopInterval);
}

window.addEventListener("load", function () {
  attachStartLoopButton();
  attachStopLoopButton();
});
