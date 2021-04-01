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
  gameProperties.mainCounter += 1;
  increaseElementsLoop(delta / 1000);
  updateAllUICounters();
}

function updateAllUICounters() {
  updateUICounter("main-counter", gameProperties.mainCounter);
  const elements = Object.keys(gameProperties.elements);
  for (let i = 0; i < elements.length; i++) {
    const element = gameProperties.elements[elements[i]];
    updateUICounter(element.id, element.count);
  }
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

function buildElementCounter(elementId, displayName, elementCounterValue) {
  const counterWrapper = document.createElement("div");

  const btnUpgrade = document.createElement("button");
  btnUpgrade.setAttribute("id", `btn-${elementId}`);
  btnUpgrade.innerHTML = displayName;
  counterWrapper.append(btnUpgrade);
  btnUpgrade.addEventListener("click", function () {});

  // const counterLabel = document.createElement("label");
  // counterLabel.setAttribute("id", `label-${elementId}`);
  // counterLabel.setAttribute("for", `${elementId}`);
  // counterLabel.innerHTML = `${displayName}: `;
  // counterWrapper.append(counterLabel);

  const newCounter = document.createElement("span");
  newCounter.setAttribute("id", elementId);
  newCounter.innerHTML = elementCounterValue;
  counterWrapper.append(newCounter);

  document.getElementById("main-counter-display").append(counterWrapper);
}

function buildElmentCounterDisplay() {
  buildElementCounter(
    "main-counter",
    "Elapsed Time",
    gameProperties.mainCounter
  );
  const elements = Object.keys(gameProperties.elements);
  for (let i = 0; i < elements.length; i++) {
    const element = gameProperties.elements[elements[i]];
    // console.log(element);
    buildElementCounter(element.id, element.displayName, element.count);
  }
}

window.addEventListener("load", function () {
  attachStartLoopButton();
  attachStopLoopButton();
  buildElmentCounterDisplay();
});
