// navbar transparency scrolling effect
const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})

if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
  console.log("test")
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

console.log("YT: ", YT)

// const playbackRate = 1;
// const data = {event: 'command', func: 'setPlaybackRate', args: [playbackRate, true]};
// const message = JSON.stringify(data);
// console.log(document.querySelector("iframe"))
// const iframe = document.querySelector("iframe").src
// console.log("iframe: ", iframe)
// const frame2 = iframe.document.querySelectorAll("*")
// console.log("video: ", frame2)
// const test = window.frames[0].document
// console.log("test: ", test)
var player;
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
  console.log("stfu: ", Object.keys(event.target))
  console.log("3esedf: ", event.target.getAvailablePlaybackRates())
  event.target.setPlaybackRate(2)
  console.lo
}

onYouTubePlayerAPIReady()

// video.defaultPlaybackRate = 20.0;