export class GuiUniverse {
  constructor(_gameConstants) {
    this.gameProperties = _gameConstants;
  }

  buildElmentCounterDisplay() {
    this.buildElementCounter(
      "main-counter",
      "Elapsed Time",
      this.gameProperties.mainCounter
    );
    const elements = Object.keys(this.gameProperties.elements);
    for (let i = 0; i < elements.length; i++) {
      const element = this.gameProperties.elements[elements[i]];
      // console.log(element);
      this.buildElementCounter(element.id, element.displayName, element.count);
    }
  }

  buildElementCounter(elementId, displayName, elementCounterValue) {
    const counterWrapper = document.createElement("div");

    const btnUpgrade = document.createElement("button");
    btnUpgrade.setAttribute("id", `btn-${elementId}`);
    btnUpgrade.innerHTML = "Increase Collection";
    counterWrapper.append(btnUpgrade);
    btnUpgrade.addEventListener("click", () => {
      this.gameProperties.elements[
        displayName.toLowerCase()
      ].multiplier += 0.05;
    });

    const counterLabel = document.createElement("label");
    counterLabel.setAttribute("id", `label-${elementId}`);
    counterLabel.setAttribute("for", `${elementId}`);
    counterLabel.innerHTML = `${displayName}: `;
    counterWrapper.append(counterLabel);

    const newCounter = document.createElement("span");
    newCounter.setAttribute("id", elementId);
    newCounter.innerHTML = elementCounterValue;
    counterWrapper.append(newCounter);

    document.getElementById("main-counter-display").append(counterWrapper);
  }

  updateAllUICounters() {
    updateUICounter("main-counter", this.gameProperties.mainCounter);
    const elements = Object.keys(this.gameProperties.elements);
    for (let i = 0; i < elements.length; i++) {
      const element = this.gameProperties.elements[elements[i]];
      updateUICounter(element.id, element.count);
    }
  }

  updateUICounter(id, counter) {
    document.getElementById(id).innerHTML = counter.toFixed(2);
  }

  attachStopLoopButton(callback) {
    this.attachListenerToElement("btn-mainloop-pause", "click", callback);
  }

  attachStartLoopButton(callback) {
    this.attachListenerToElement("btn-mainloop-unpause", "click", callback);
  }

  attachListenerToElement(id, eventType, callback) {
    document.getElementById(id).addEventListener(eventType, callback);
  }
}
