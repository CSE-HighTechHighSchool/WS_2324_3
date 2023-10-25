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