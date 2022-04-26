function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
ref = {
  startBtn: document.querySelector(`button[data-start]`),
  stopBtn: document.querySelector(`button[data-stop]`),
};
let intervalIl;
function onStartChangeColor() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  setDisable(ref.startBtn);
  removeDisable(ref.stopBtn);
}

function onStopChangeColor() {
  clearInterval(intervalId);
  setDisable(ref.stopBtn);
  removeDisable(ref.startBtn);
}

function setDisable(e) {
  e.setAttribute(`disabled`, `disabled`);
}

function removeDisable(e) {
  e.removeAttribute(`disabled`);
}

ref.startBtn.addEventListener(`click`, onStartChangeColor);
ref.stopBtn.addEventListener(`click`, onStopChangeColor);
