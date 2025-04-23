const playlist = [
  {
    title: "TV Off",
    artist: "Kendrick Lamar",
    file: "assets/music/Kendrick Lamar - tv off.mp3",
    cover: "assets/images/album1.jpg"
  },
  {
    title: "Chicken Fried",
    artist: "Zac Brown Band",
    file: "assets/music/Chickenfried.m4a",
    cover: "assets/images/album2.jpg"
  },
  {
    title: "Starboy",
    artist: "The Weeknd",
    file: "assets/music/starboy.m4a",
    cover: "assets/images/WKND COVER.png"
  },
  {
    title: "One Last Breath",
    artist: "Creed",
    file: "assets/music/creed.m4a",
    cover: "assets/images/creed.jpg"
  },
  {
    title: "Deja Vu",
    artist: "Post Malone",
    file: "assets/music/dejavu.mp3",
    cover: "assets/images/post.jpg"
  }
];

let currentTrack = 0;
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const titleEl = document.getElementById("track-title");
const artistEl = document.getElementById("track-artist");
const coverEl = document.getElementById("album-cover");
const seekbar = document.getElementById("seekbar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeEl = document.getElementById("volume");

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.file;
  titleEl.textContent = track.title;
  artistEl.textContent = track.artist;
  coverEl.src = track.cover;
  audio.load();
}

function playTrack() {
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

function pauseTrack() {
  audio.pause();
  playPauseBtn.textContent = "▶️";
}

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});

nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  playTrack();
});

prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  playTrack();
});

audio.addEventListener("timeupdate", () => {
  seekbar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

seekbar.addEventListener("input", () => {
  audio.currentTime = (seekbar.value / 100) * audio.duration;
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

volumeEl.addEventListener("input", () => {
  audio.volume = volumeEl.value;
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

// Greeting the user
window.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem("username") || "User";
  const userGreeting = document.querySelector('.d-flex.align-items-center.mb-4 h4');
  if (userGreeting) {
    userGreeting.textContent = `Hello, ${username}`;
  }
});

// Click on any card to play song
document.querySelectorAll('.playlist-card').forEach(card => {
  card.addEventListener('click', () => {
    const index = card.getAttribute('data-track');
    loadTrack(index);
    playTrack();
  });
});

// Init
loadTrack(currentTrack);
