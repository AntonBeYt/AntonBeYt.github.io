function updateAnalogClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secondsDegrees = (seconds / 60) * 360 + 45;
  const minutesDegrees = ((minutes + seconds / 60) / 60) * 360 + 45;
  const hoursDegrees = ((hours + minutes / 60) / 12) * 360 + 45;

  document.querySelector(
    ".seconds-circle"
  ).style.transform = `translate(-50%, -50%) rotate(${secondsDegrees}deg)`;

  document.querySelector(
    ".minutes-circle"
  ).style.transform = `translate(-50%, -50%) rotate(${minutesDegrees}deg)`;

  document.querySelector(
    ".hours-circle"
  ).style.transform = `translate(-50%, -50%) rotate(${hoursDegrees}deg)`;
}

setInterval(updateAnalogClock, 1000);
updateAnalogClock();

const DIGIT_SEGMENTS = {
  0: [1, 1, 1, 0, 1, 1, 1],
  1: [0, 0, 1, 0, 0, 1, 0],
  2: [1, 0, 1, 1, 1, 0, 1],
  3: [1, 0, 1, 1, 0, 1, 1],
  4: [0, 1, 1, 1, 0, 1, 0],
  5: [1, 1, 0, 1, 0, 1, 1],
  6: [1, 1, 0, 1, 1, 1, 1],
  7: [1, 0, 1, 0, 0, 1, 0],
  8: [1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 0, 1, 1],
};

function updateDigitalClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  updateDigit("hours-1", hours[0]);
  updateDigit("hours-2", hours[1]);
  updateDigit("minutes-1", minutes[0]);
  updateDigit("minutes-2", minutes[1]);
  updateDigit("seconds-1", seconds[0]);
  updateDigit("seconds-2", seconds[1]);
}

function updateDigit(digitClass, value) {
  const digit = document.querySelector(`.${digitClass}`);
  const segments = digit.querySelectorAll(".digit");
  const activeSegments = DIGIT_SEGMENTS[parseInt(value)];

  segments.forEach((segment, index) => {
    segment.style.opacity = activeSegments[index] ? "1" : "0";
  });
}

setInterval(updateDigitalClock, 1000);
updateDigitalClock();
