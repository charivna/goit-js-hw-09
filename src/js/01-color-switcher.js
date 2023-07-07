function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}

let intervalId = null;
const INTERVAL = 1000;

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);


function onStartClick() {
    intervalId = setInterval(() => {
        const color = getRandomHexColor();
        refs.body.style.backgroundColor = color;
    }, INTERVAL)
    buttonDisabled(refs.start);
    buttonActive(refs.stop)
}

function onStopClick() {
    clearInterval(intervalId);
    buttonDisabled(refs.stop)
   buttonActive(refs.start)
}

function buttonDisabled(button) {
    button.disabled = true
}

function buttonActive(button) {
     button.disabled = false
}