console.log('hello');

// const songs = async () => {
//   let url = await fetch('http://127.0.0.1:5500/songs/');
//   let response = await url.text();
//   console.log(response);
// };

// songs();
let currentSongs = new Audio();
const secondsToMinSec = (seconds) => {
  if (isNaN(seconds) || seconds < 0) {
    return 'invalid input';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedgSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedgSeconds}`;
};
async function getSongs() {
  let url = await fetch('http://127.0.0.1:5500/songs/');
  let response = await url.text();
  // console.log(response);
  let div = document.createElement('div');
  div.innerHTML = response;
  let a = div.getElementsByTagName('a');
  let song = [];
  for (let index = 0; index < a.length; index++) {
    const element = a[index];
    if (element.href.endsWith('.mp3')) {
      song.push(element.href.split('/songs/')[1]);
    }
  }
  return song;
}
const playMusic = (track) => {
  // let audio = new Audio('/songs/' + track);
  // audio.play();
  currentSongs.src = '/songs/' + track;
  currentSongs.play();
  play.src = 'img/pause.svg';
  document.querySelector('.songinfo').innerHTML = track;
  document.querySelector('.songtime').innerHTML = '00:00 / 00:00';
};

const main = async () => {
  let songs = await getSongs();
  console.log(songs);
  let songUl = document
    .querySelector('.songList')
    .getElementsByTagName('ul')[0];
  for (const song of songs) {
    songUl.innerHTML =
      songUl.innerHTML +
      `<li><img class="invert" width="34" src="img/music.svg" alt="" srcset="" />
      <div class="info">
        <div>${song.replaceAll('%20', ' ')}</div>
        <div>Harry</div>
      </div>
      <div class="playnow">
        <span>play now</span>
        <img class="invert" src="img/play.svg" alt="" srcset="" />
      </div></li>`;
    //Attach event listener to each song
    Array.from(
      document.querySelector('.songList').getElementsByTagName('li')
    ).map((e) => {
      e.addEventListener('click', (element) => {
        console.log(e.querySelector('.info').firstElementChild.innerHTML);
        playMusic(e.querySelector('.info').firstElementChild.innerHTML.trim());
      });
    });
  }
  //Attach event listener to play, pause, next and previous buttons
  play.addEventListener('click', () => {
    if (currentSongs.paused) {
      currentSongs.play();
      play.src = 'img/pause.svg';
    } else {
      currentSongs.pause();
      play.src = 'img/play.svg';
    }
  });
  //Attach event listener for timelap
  currentSongs.addEventListener('timeupdate', () => {
    console.log(currentSongs.currentTime, currentSongs.duration);
    document.querySelector('.songtime').innerHTML = `${secondsToMinSec(
      currentSongs.currentTime
    )}/${secondsToMinSec(currentSongs.duration)}`;
  });
  // var audio = new Audio(songs[1]);
  // audio.play();
};
main();
