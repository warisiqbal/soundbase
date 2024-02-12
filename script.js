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
      song.push(element.href);
    }
  }
  return song;
}

const main = async () => {
  let songs = await getSongs();
  console.log(songs);
};
main();
