// navbar transparency scrolling effect
const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})


// zoom out + fade out hero parallax
const hero = document.querySelector("main")
const zoomElement = document.querySelector(".zoom");
const MAX_ZOOM = 1;
const MIN_OPACITY = 0;

document.addEventListener("scroll", function() {
  const scrollPosition = window.scrollY;
  const zoom = 1 + scrollPosition / (window.innerHeight * 2);
  const opacity = 1 - scrollPosition / (window.innerHeight * 2);
  
  zoomElement.style.transform = `scale(${Math.max(zoom, MAX_ZOOM)})`;
  zoomElement.style.opacity = Math.max(opacity, MIN_OPACITY);

  if (scrollPosition < 0) {
    window.scrollTo(0, 0);
  }
});