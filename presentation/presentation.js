document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const totalSlides = document.querySelectorAll("section").length - 1;
  const jsConfetti = new JSConfetti({
    confettiRadius: 6,
    confettiNumber: 500,
  });

  updateSlideVisibility();

  function goToPreviousSlide() {
    let currentSlide = parseInt(main.dataset.slide);
    if (currentSlide > 0) {
      main.dataset.slide = currentSlide - 1;
      updateSlideVisibility();
    }
  }

  function goToNextSlide() {
    let currentSlide = parseInt(main.dataset.slide);
    if (currentSlide < totalSlides) {
      main.dataset.slide = currentSlide + 1;
      updateSlideVisibility();
    }
  }

  prevBtn.addEventListener("click", goToPreviousSlide);
  nextBtn.addEventListener("click", goToNextSlide);

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      goToPreviousSlide();
    } else if (event.key === "ArrowRight") {
      goToNextSlide();
    }
  });

  function updateSlideVisibility() {
    const currentSlide = main.dataset.slide;
    const header = document.querySelector("header");

    const slideProgress = (parseInt(currentSlide) / totalSlides) * 100;
    header.style.width = `${slideProgress}%`;

    document.querySelectorAll("section").forEach((section) => {
      const slideNumber = section.className.split("-")[1];
      section.style.display = slideNumber === currentSlide ? "block" : "none";

      if (slideNumber === "5" && currentSlide === "5") {
        jsConfetti.addConfetti();
      }
    });
  }
});
