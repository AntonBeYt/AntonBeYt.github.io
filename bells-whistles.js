const hasPointer = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.setAttribute(
  "data-theme",
  prefersDark ? "dark" : "light"
);

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.documentElement.setAttribute(
    "data-theme",
    document.documentElement.getAttribute("data-theme") === "light"
      ? "dark"
      : "light"
  );
});

const styleRadios = document.querySelectorAll('input[name="style"]');
styleRadios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-style", e.target.value);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
});

const checkedStyle = document.querySelector('input[name="style"]:checked');
if (checkedStyle) {
  document.documentElement.setAttribute("data-style", checkedStyle.value);
}

if (hasPointer) {
  document.querySelector(".spotlight-toggle-container").className = "menu-item";

  const spotlightToggle = document.getElementById("spotlight-toggle");
  const overlay = document.querySelector(".overlay");
  const circle = document.querySelector(".circle");

  overlay.style.opacity = "0";
  circle.style.opacity = "0";

  spotlightToggle.addEventListener("change", () => {
    overlay.style.opacity = spotlightToggle.checked ? "1" : "0";
    circle.style.opacity = spotlightToggle.checked ? "1" : "0";
    document.body.style.cursor = spotlightToggle.checked ? "none" : "auto";
    const cursor = document.querySelector(".circle");
    const cursorRadius = 50;
    cursor.style.width = `${cursorRadius}px`;
    cursor.style.height = `${cursorRadius}px`;
    setupMouseTracking();
  });

  let mouseX = 0;
  let mouseY = 0;

  function setupMouseTracking() {
    if (spotlightToggle.checked) {
      mouseMoveListener = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        getDimensions(e);
      };
      document.addEventListener("mousemove", mouseMoveListener);
      const bubbleGrowElements = document.querySelectorAll(".bubble-grow");
      bubbleGrowElements.forEach((element) => {
        element.addEventListener("mouseenter", () => (isHovering = true));
        element.addEventListener("mouseleave", () => (isHovering = false));
      });

      animate();
      animateCursor();
    } else {
      if (mouseMoveListener) {
        document.removeEventListener("mousemove", mouseMoveListener);
      }
      const cursor = document.querySelector(".circle");
      cursor.style.width = `${cursorRadius}px`;
      cursor.style.height = `${cursorRadius}px`;

      const overlay = document.querySelector(".overlay");
      const maskValue = `radial-gradient(circle ${baseRadius}px at ${mouseX}px ${mouseY}px, transparent 100%, black 100%)`;
      overlay.style.mask = maskValue;
      overlay.style.webkitMask = maskValue;
    }
  }

  let isHovering = false;
  const baseRadius = 100;
  const expandedRadius = 400;
  let currentRadius = baseRadius;

  function animate() {
    if (!spotlightToggle.checked) return;
    const overlay = document.querySelector(".overlay");
    const growSpeed = 0.05;
    const shrinkSpeed = 0.08;

    currentRadius += isHovering
      ? (expandedRadius - currentRadius) * growSpeed
      : (baseRadius - currentRadius) * shrinkSpeed;

    currentRadius = Math.min(
      Math.max(currentRadius, baseRadius),
      expandedRadius
    );

    const maskValue = `radial-gradient(circle ${currentRadius}px at ${mouseX}px ${mouseY}px, transparent 100%, black 100%)`;
    overlay.style.mask = maskValue;
    overlay.style.webkitMask = maskValue;

    requestAnimationFrame(animate);
  }

  const cursor = document.querySelector(".circle");
  const cursorRadius = 50;
  cursor.style.width = `${cursorRadius}px`;
  cursor.style.height = `${cursorRadius}px`;

  function animateCursor() {
    if (!spotlightToggle.checked) return;
    if (isHovering) {
      const pulseSize = Math.sin(Date.now() * 0.01) * 10;
      const finalSize = cursorRadius + pulseSize;

      cursor.style.width = `${finalSize}px`;
      cursor.style.height = `${finalSize}px`;
      cursor.style.top = `${mouseY - finalSize / 2}px`;
      cursor.style.left = `${mouseX - finalSize / 2}px`;
    }

    requestAnimationFrame(animateCursor);
  }

  function getDimensions(e) {
    const currentSize = cursor.offsetWidth;
    cursor.style.top = `${e.clientY - currentSize / 2}px`;
    cursor.style.left = `${e.clientX - currentSize / 2}px`;
  }

  window.addEventListener("mousemove", (e) => {
    if (spotlightToggle.checked) {
      getDimensions(e);
    }
  });

  animate();
  animateCursor();
} else {
  document.querySelector(".circle").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
}
