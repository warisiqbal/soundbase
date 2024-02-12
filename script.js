console.log('hello');

// const songs = async () => {
//   let url = await fetch('http://127.0.0.1:5500/songs/');
//   let response = await url.text();
//   console.log(response);
// };

// songs();

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

const main = async () => {
  let songs = await getSongs();
  console.log(songs);
  let songUl = document
    .querySelector('.songList')
    .getElementsByTagName('ul')[0];
  for (const song of songs) {
    songUl.innerHTML =
      songUl.innerHTML + `<li>${song.replaceAll('%20', ' ')}</li>`;
  }
  // var audio = new Audio(songs[3]);
  // audio.play();
};
main();
