const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTimeEl = document.querySelector('.time-elapsed');
const durationEl = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause //
function showPlay () {
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title', 'play')
}

function playAndPause () {
  if(!video.paused){
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'pause')
    video.pause()
  } else {
    video.play()
    showPlay()
  }
}
// On video end, show play button icon
video.addEventListener('ended', showPlay)

// Progress Bar //

function displayTime(time){
  const minutes = Math.floor(time / 60);
  let s = Math.floor(time % 60);
  s = s < 10 ? s = `0${s}`: s;
  return `${minutes}:${s}`;
}

// Update Progress Bar & Time
function updateProgressBar(e) {
    e.preventDefault();
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    progressBar.style.width = `${(currentTime / duration) * 100}%`;
    // Calculate display for currentTime
    currentTimeEl.textContent = `${displayTime(currentTime)} / `;
    durationEl.textContent = `${displayTime(duration)}`;
    if(currentTime >= duration) {
      playBtn.classList.replace('fa-pause', 'fa-play')
      playBtn.setAttribute('title', 'pause')
    }
}

// Click to seek within the video
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = video;
  video.currentTime = (clickX / width) * duration;
}

// Volume Controls //
let volumeClass = 'fa-volume-up';
let lastVol = 1;

function volumeIconChange(newIcon) {
  volumeIcon.classList.replace(volumeClass,newIcon)
  volumeClass = newIcon
}


// Mute
function mute() {
  if(!video.muted){
    video.muted = true;
    volumeIcon.classList.replace(volumeClass, 'fa-volume-xmark')
    volumeBar.style.width = '0';
  } else {
    video.muted = false;
    volumeIcon.classList.replace('fa-volume-xmark', volumeClass)
    volumeBar.style.width = `${lastVol * 100}%`;
    if(!lastVol){
      video.volume = 1
      volumeBar.style.width = '100%'
      volumeIconChange('fa-volume-up')
    }
  }
}


// Volume Bar
function changeVolume(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  video.volume = clickX / width;
 if(video.volume < 0.15) {
    volumeIconChange('fa-volume-xmark')
    video.volume = 0;
  } else if(video.volume < 0.5){
    volumeIconChange('fa-volume-down')
  } else if(video.volume > 0.85) {
    volumeIconChange('fa-volume-up')
    video.volume = 1
  } else if(video.volume > 0.5){
    volumeIconChange('fa-volume-up')
  }
  volumeBar.style.width =`${video.volume * 100}%`;
  lastVol = video.volume;
}


// Change Playback Speed 
function changeSpeed () {
  video.playbackRate = speed.value;
}

// Fullscreen 
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen')
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen')
}

let isFullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
  !isFullscreen ? openFullscreen(player) : closeFullscreen();
  isFullscreen =! isFullscreen
}

// Event Listeners
playBtn.addEventListener('click', playAndPause)
video.addEventListener('click', playAndPause)
video.addEventListener('timeupdate', updateProgressBar);
video.addEventListener('canplay', updateProgressBar)
progressRange.addEventListener('click', setProgressBar)
volumeIcon.addEventListener('click', mute)
volumeRange.addEventListener('click', changeVolume)
speed.addEventListener('change',changeSpeed)
fullscreenBtn.addEventListener('click',toggleFullscreen)
