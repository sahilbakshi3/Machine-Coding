const ballElement = document.getElementById("ballId");

const bottomLimit = 270;
const topLimit = 0;
let delta = 10;
const fps = 30; //30 frames per 1000ms;
const timeForOneFrame = 1000 / fps;
let currentPos = 0;
let prevTime = 0;

function bounce(currentTime) {
  if (currentTime - prevTime > timeForOneFrame) {
    prevTime = currentTime;
    if (currentPos >= bottomLimit) {
      delta = -10;
    } else if (currentPos <= topLimit) {
      delta = 10;
    }
    currentPos += delta;
    ballElement.style.transform = `translateY(${currentPos}px)`;
  }
  requestAnimationFrame(bounce);
}

requestAnimationFrame(bounce);
