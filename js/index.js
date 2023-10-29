//------------------------------------------------------------------------------------------ navbar transparency scrolling effect
const navbar = document.querySelector('.navbar')
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})

//------------------------------------------------------------------------------------------ iframe speed adjustment
if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
  console.log("test")
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
console.log("YT: ", YT)

var player;
let PLAYBACK_RATE = 0.75;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
    height: '385',
    width: '640',
    videoId: "M7lc1UVf-VE",
    events: {
      // 'onStateChange': onPlayerStateChange,
      'onReady': onPlayerReady
    }
  });
  console.log("YT: ", YT)
}
function onPlayerReady(event) {
  console.log("event: ", event)
  event.target.playVideo()
  console.log("keys: ", Object.keys(event.target))
  console.log("avaliablePlaybacks: ", event.target.getAvailablePlaybackRates())
  event.target.setPlaybackRate(PLAYBACK_RATE)
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

  const zoom = 1 + scrollPosition / (window.innerHeight/1.5);
  const opacity = 1 - scrollPosition / (window.innerHeight/1.5);
  zoomElement.style.transform = `scale(${Math.max(zoom, MAX_ZOOM)})`;
  zoomElement.style.opacity = Math.max(opacity, MIN_OPACITY);

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
    console.log(PLAYBACK_RATE);
    player.setPlaybackRate(PLAYBACK_RATE);
  }
});



//------------------------------------------------------------------------------------------ infinite scrolling animation
const scrollers = document.querySelectorAll(".scroller");

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller-inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
addAnimation();

//------------------------------------------------------------------------------------------ dotted background
const dotsContainer = $(".dots-container")[0]

console.log("dots: ", dotsContainer.offsetHeight)

const xStart = 20
const xStep = 40
const xEnd = Math.floor(dotsContainer.offsetWidth / 40) + 1

const yStep = 40
const yEnd = Math.floor(dotsContainer.offsetHeight / 40)

const createDot = (xRow, yRow, random, delay) => $("<span></span>").css({
  position: "absolute",
  left: `${10+xRow*xStep}px`,
  top: `${10+yRow*yStep}px`,
  borderRadius: "50%",
  width: "8px",
  height: "8px",
  zIndex: 0,
  backgroundColor: random === 1 ? "#94a3b8" : "#cbd5e1",
  animation: "pulse-animation 2s infinite ease-in-out",
  animationDelay: `${delay}ms`
})[0]

console.log("testing")
console.log("yEnd: ", yEnd, ", ")
// console.log("test dot: ", createDot(0, 0))

for(let i = 0; i < yEnd; i++) {
  for(let j = 0; j < xEnd; j++) {

    const random = Math.floor(Math.random() * 2)
    const delay = Math.floor((i+j)*100)

    console.log("test")
    dotsContainer.append(createDot(j, i, random, delay));
  }
}

console.log("end")