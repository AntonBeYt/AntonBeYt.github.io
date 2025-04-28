const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.documentElement.setAttribute(
    "data-theme",
    document.documentElement.getAttribute("data-theme") === "light"
      ? "dark"
      : "light"
  );
});

let hasMouseMoved = false;

document.addEventListener("mousemove", (e) => {
  if (!hasMouseMoved) {
    const overlay = document.querySelector(".overlay");
    const circle = document.querySelector(".circle");
    overlay.style.opacity = "1";
    circle.style.opacity = "1";
    hasMouseMoved = true;
  }
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let isHovering = false;
const baseRadius = 100;
const expandedRadius = 200;
let currentRadius = baseRadius;
let mouseX = 0;
let mouseY = 0;

const heading = document.querySelector("h1");
heading.addEventListener("mouseenter", () => (isHovering = true));
heading.addEventListener("mouseleave", () => (isHovering = false));

function animate() {
  const overlay = document.querySelector(".overlay");
  const growSpeed = 0.05;
  const shrinkSpeed = 0.08;

  currentRadius += isHovering
    ? (expandedRadius - currentRadius) * growSpeed
    : (baseRadius - currentRadius) * shrinkSpeed;

  currentRadius = Math.min(Math.max(currentRadius, baseRadius), expandedRadius);

  const maskValue = `radial-gradient(circle ${currentRadius}px at ${mouseX}px ${mouseY}px, transparent 100%, black 100%)`;
  overlay.style.mask = maskValue;
  overlay.style.webkitMask = maskValue;

  requestAnimationFrame(animate);
}

animate();

const cursor = document.querySelector(".circle");

function getDimensions(e) {
  const circleSize = cursor.offsetWidth;
  cursor.style.top = `${e.clientY - circleSize / 2}px`;
  cursor.style.left = `${e.clientX - circleSize / 2}px`;
}

window.addEventListener("mousemove", (e) => {
  getDimensions(e);
});

const delay = 250;

function throttle(callback, limit) {
  let wait = false;
  return function () {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
}

window.addEventListener("mousemove", (e) => {
  throttle(getDimensions(e), delay);
});
