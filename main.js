const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");
//index for song
let index;
//loop
let loop = true;
//is active shuffle?
let isShuffleActive = false;
//list of songs
const songsList = [
  {
    name: "Dizine Dursun",
    link: "./assets/Yıldız-Tilbe-Dizine Dursun.mp3",
    artist: "Yıldız Tilbe",
    image: "./assets/yildiz-tilbe.jpg",
  },
  {
    name: "Ademle Havva",
    link: "./assets/Elif Kaya-Ademle-Havva.mp3",
    artist: "Elif Kaya",
    image: "./assets/Elif_Kaya.jpg",
  },
  {
    name: "Seni Gidi Seni",
    link: "./assets/Feride-Hilal-Akın-Seni Gidi Seni.mp3",
    artist: "Feride Hilal Akın",
    image: "./assets/Feride-Hilal-Akın.jpg",
  },
  {
    name: "İstanbul Ankara",
    link: "./assets/Mustafa-Ceceli-İstanbul Ankara.mp3",
    artist: "Mustafa Ceceli",
    image: "./assets/Mustafa-Ceceli.jpg",
  },
  {
    name: "Kay Kay",
    link: "./assets/Sinan Akçıl-Kay Kay.mp3",
    artist: "Sinan Akçık",
    image: "./assets/Sinan-Akcıl.jpg",
  },
  {
    name: "Bundan Böyle",
    link: "./assets/Zeynep-Bastık-Bundan Böyle.mp3",
    artist: "Zeynep Bastık",
    image: "./assets/zeynep-bastik.jpg",
  },
];
//setting the format of time
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? +second : second;
  return `${minute}:${second}`;
};
//play the song
const playAudio = () => {
  console.log("playAudio");
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

//set the song
const setSong = (arrayIndex) => {
  if (loop == true && isShuffleActive == true) {
    arrayIndex = Math.floor(Math.random() * 100) % 5;
  }
  console.log(arrayIndex + isShuffleActive);

  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  playListContainer.classList.add("hide");
  playAudio();
};

//play the next one
const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
  }
};

playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;

  let coordEnd = event.clientX;
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progressBar * 100 + "%";

  audio.currentTime = progress * audio.duration;
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

const previousSong = () => {
  console.log(index);
  if (index > 0) {
    index -= 1;
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
};

repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
    console.log("tekrar kapatildi");
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
    console.log("tekrar acildi");
  }
});

shuffButton.addEventListener("click", () => {
  if (shuffButton.classList.contains("active")) {
    isShuffleActive = false;
    shuffButton.classList.remove("active");
    audio.loop = true;
    console.log("karistirici kapatildi");
  } else {
    isShuffleActive = true;
    shuffButton.classList.add("active");
    audio.loop = false;
    console.log("karistirici acildi");
  }
});

const initializePlaylist = () => {
  for (let i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container"> 
          <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details">
          <span id="playlist-song-name">
            ${songsList[i].name}
          </span>
          <span id="playlist-song-artist-album">
            ${songsList[i].artist}
          </span>
        </div>
        </li>`;
  }
};

//click catch
nextButton.addEventListener("click", nextSong);
pauseButton.addEventListener("click", pauseAudio);
playButton.addEventListener("click", playAudio);
prevButton.addEventListener("click", previousSong);

//catch the finish of song
audio.onended = () => {
  nextSong();
};

audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//onload
window.onload = () => {
  index = 0;
  setSong(index);
  //stop and set playlist

  pauseAudio();
  initializePlaylist();
};
