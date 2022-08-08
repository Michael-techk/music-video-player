const music = document.querySelector('audio');
const img = document.querySelector('img');
const title = document.querySelector('.title')
const artist = document.querySelector('.artist')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

let songIndex = 0;

const songs = [{
    artist : 'Unga Bunga',
    nameDisplay : 'Twoja stara',
    name : 'jacinto-1',
},
{
    artist : 'Star Wors',
    nameDisplay : 'Obi Won SieRobi',
    name : 'jacinto-2',
},
{
    artist : 'Zwiadowcy',
    nameDisplay : 'Halt',
    name : 'jacinto-3',
},
{
    artist : 'Drunk Uncle',
    nameDisplay : 'very scary',
    name : 'metric-1',
}]

let flag = false;

const play = () => {
  flag= true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

const pause = () => {
  flag = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

const loadSong = (song) => {
    title.textContent = song.nameDisplay;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
}

const prevSong = () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
      }
    loadSong(songs[songIndex])
    play()
}

const nextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex])
    play()
}

//on load
loadSong(songs[songIndex]);

//update progress bar & time 
function updateProgressBar(e){
    if(flag){
        const {duration, currentTime} = e.srcElement;
        //update prograss bar width
        let progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //calculate duration
        let durationMin = Math.floor(duration / 60);
        let durationSec = Math.floor(duration % 60)
        if(durationSec < 10) durationSec = `0${durationSec}`;
        //delay switching el to avoid NaN
        if(durationSec) durationEl.textContent = `${durationMin}:${durationSec}`;

        // Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
          currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
}

//set progress bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => (flag ? pause() : play()));
nextBtn.addEventListener('click',nextSong)
prevBtn.addEventListener('click',prevSong)
music.addEventListener('timeupdate',updateProgressBar)
music.addEventListener('ended',nextSong)
progressContainer.addEventListener('click', setProgressBar)