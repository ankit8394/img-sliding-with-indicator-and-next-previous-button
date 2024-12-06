const sliderImages = document.querySelectorAll('.slider-img');
const textContainer = document.querySelector('.text-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const sliderContainer = document.querySelector('.slider-container');
const dotsContainer = document.querySelector('.dots-container');

let currentIndex = 0;

// Create dots dynamically
sliderImages.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === currentIndex) dot.classList.add('active'); // Set active dot initially
  dotsContainer.appendChild(dot);

  // Add click event to navigate to specific slide
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

function updateDots(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index); // Toggle active class
  });
}

function showSlide(index) {
  sliderImages.forEach((img, i) => {
    img.classList.remove('active');
    if (i === index) {
      img.classList.add('active');
    }
  });

  updateDots(index); // Update the dots
  currentIndex = index;
}

showSlide(currentIndex);

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
  showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % sliderImages.length;
  showSlide(currentIndex);
});

// Draggable text
let isDragging = false;
let offsetX, offsetY;

textContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - textContainer.offsetLeft;
  offsetY = e.clientY - textContainer.offsetTop;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const containerRect = sliderContainer.getBoundingClientRect();
    const textRect = textContainer.getBoundingClientRect();

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Calculate boundaries relative to the slider container
    let maxX = containerRect.width - textRect.width;
    let maxY = containerRect.height - textRect.height;

    // Prevent going outside boundaries
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    textContainer.style.left = newX + 'px';
    textContainer.style.top = newY + 'px';
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false; // Reset dragging flag
});
