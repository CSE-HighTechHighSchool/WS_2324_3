// Main code for the index page + corresponding styling
//------------------------------------------------------------------------------------------ navbar transparency scrolling effect
const navbar = document.querySelector('.navbar')
window.addEventListener('scroll', () => {
  // if scrolled enough, enable transparency effect for navbar. otherwise, don't
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})

//------------------------------------------------------------------------------------------ iframe speed adjustment

// checks if the youtube API has loaded and load the script if not
if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
  console.log("test")
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// video player states
var player;
let PLAYBACK_RATE = 0.75;

// runs once youtube iframe API is loaded, creates a player and mounts onto node
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
    height: '385',
    width: '640',
    videoId: "M7lc1UVf-VE",
    events: {
      'onReady': onPlayerReady
    }
  });
  console.log("YT: ", YT)
}

// runs once youtube player from API is loaded
function onPlayerReady(event) {
  event.target.playVideo()
  event.target.setPlaybackRate(PLAYBACK_RATE) // set the initial playback rate of the video
}

onYouTubePlayerAPIReady()

//------------------------------------------------------------------------------------------ zoom out + fade out hero parallax
const hero = document.querySelector("main")
const zoomElement = document.querySelector(".zoom");
const MAX_ZOOM = 1;
const MIN_OPACITY = 0;
let prevScrollPosition = 0;

document.addEventListener("scroll", function() {
  const scrollPosition = window.scrollY;
  console.log(`scroll pos: ${scrollPosition}`);
  const scrollDirection = scrollPosition > prevScrollPosition ? "down" : "up";
  console.log(`scroll dir: ${scrollDirection}`)
  
  prevScrollPosition = scrollPosition;

  // adjust zoom/opacity based on scroll position based on the window height
  const zoom = 1 + scrollPosition / (window.innerHeight/1.5);
  const opacity = 1 - scrollPosition / (window.innerHeight/1.5);

  // cap the zoom/opacity at max zoom and min opacity
  zoomElement.style.transform = `scale(${Math.max(zoom, MAX_ZOOM)})`;
  zoomElement.style.opacity = Math.max(opacity, MIN_OPACITY);

  // disable pointer if the items disappear
  if (opacity === 0) {
    zoomElement.style.pointerEvents = 'none';
  } else {
    zoomElement.style.pointerEvents = 'auto';
  }

  if (scrollPosition < 0) {
    window.scrollTo(0, 0);
  } else {
    // adjust playback rate based on scroll position (both ways)
    if (scrollPosition <= 100) {
      PLAYBACK_RATE = 0.75;
    } else if (scrollPosition <= 200) {
      PLAYBACK_RATE = 1;
    } else if (scrollPosition <= 300) {
      PLAYBACK_RATE = 1.5;
    } else if (scrollPosition <= 400) {
      PLAYBACK_RATE = 1.75;
    } else if (scrollPosition <= 500) {
      PLAYBACK_RATE = 2;
    }
    player.setPlaybackRate(PLAYBACK_RATE);
  }
});



//------------------------------------------------------------------------------------------ infinite scrolling animation
const scrollers = document.querySelectorAll(".scroller"); // select the scroller node

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller-inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it, add aria-hidden to it, and add it into the `.scroller-inner`
    // Allows seamless looping
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
addAnimation();

//------------------------------------------------------------------------------------------ dotted background
const dotsContainer = $(".dots-container")[0] // select the div for the dots on html

// configuration for x: starts at 20px and creates another dot every 40 pixels
const xStart = 20
const xStep = 40
const xEnd = Math.floor(dotsContainer.offsetWidth / 40) + 1 // fetch viewport width to determine how many columns of dots should be rendered

// creates a new row of dots every 40 pixels
const yStep = 40
const yEnd = Math.floor(dotsContainer.offsetHeight / 40) // fetch viewport height to determine how many rows are required


// util function to setup classes for dot span
const createDot = (xRow, yRow, random, delay) => $("<span></span>").css({
  position: "absolute",
  left: `${10+xRow*xStep}px`, // set position dynamically
  top: `${10+yRow*yStep}px`, // set position dynamically
  borderRadius: "50%",
  width: "8px",
  height: "8px",
  zIndex: 0,
  backgroundColor: random === 1 ? "#94a3b8" : "#cbd5e1", // uses random variable to set changing
  animation: "pulse-animation 2s infinite ease-in-out",
  animationDelay: `${delay}ms`
})[0]

function loopDots(){
  // loop through a matrix of dot positions
  for(let i = 0; i < yEnd; i++) {
    for(let j = 0; j < xEnd; j++) {

      const random = Math.floor(Math.random() * 2) // calculate a random number to determine the dot background color
      const delay = Math.floor((i+j)*100) // calculate the animation delay based on which diagonal the dot is on (farther diagonals have a larger delay)

      dotsContainer.append(createDot(j, i, random, delay)); // create the dot and append to container
    }
  }
}
loopDots()