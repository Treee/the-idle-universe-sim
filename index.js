const mainGameLoopDelta = 1000;
const gameProperties = {
  mainCounter: 0,
};
let mainGameLoopInterval;

function attachStartLoopButton() {
  document
    .getElementById("btn-mainloop-unpause")
    .addEventListener("click", startGameLoop);
}

function startGameLoop() {
  mainGameLoopInterval = setInterval(mainGameLoop, mainGameLoopDelta);
}

function mainGameLoop() {
  document.getElementById(
    "main-counter"
  ).innerHTML = gameProperties.mainCounter++;
  // console.log(`Increment ${gameProperties.mainCounter++}`);
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
