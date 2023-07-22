$(document).ready(function () {
  let slideIndex = 0;
  const slides = $(".slider-slide");
  const buttons = $(".slider-button");
  const nextButton = $(".next-button");
  console.log(slides + "\n" + buttons + "\n" + nextButton);
  showSlide(slideIndex);

  buttons.click(function () {
    slideIndex = $(this).index();
    showSlide(slideIndex);
  });

  nextButton.click(function () {
    if (slideIndex < slides.length - 1) {
      slideIndex++;
      showSlide(slideIndex);
    } else {
      window.location.href = "http://127.0.0.1:5500/landingPage/login.html";
    }
  });

  function showSlide(index) {
    slides.hide();
    slides.eq(index).show();
    buttons.removeClass("active");
    buttons.eq(index).addClass("active");
    if (slideIndex == slides.length - 1) {
      nextButton.text("Get started");
    } else {
      nextButton.text("Next");
    }
  }
  
  const scrollAmount = 15; // Set the number of pixels to scroll per interval

  const documentHeight = document.documentElement.scrollHeight; // Get the height of the document

  let currentPosition = 0; // Set the starting position of the scroll

  function autoScroll() {
    // Define the function to perform the scroll
    // Calculate the next position of the scroll
    const nextPosition = currentPosition + scrollAmount;

    // If the next position exceeds the document height, stop scrolling
    if (nextPosition >= documentHeight) {
      clearInterval(scrollIntervalId);
    }

    // Scroll to the next position
    window.scrollTo(0, nextPosition);

    // Update the current position
    currentPosition = nextPosition;
  }

  // Start the scroll interval
  setTimeout(() => {
    // Start the scroll interval
    const scrollIntervalId = setInterval(autoScroll, 50);
  }, 5000);

});
