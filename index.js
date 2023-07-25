const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');


const music = new Audio();

const songs = [
    {
        path: 'assets/musics/song-hustlerattitude.mp3',
        songName: 'Hustler Attitude',
        artist: 'San Andreas',
        cover: 'assets/img/img-hustlerattitude.jpg',
        background: 'assets/img/img-hustlerattitude.jpg',
    },
    {
        path: 'assets/musics/song-getmoney.mp3',
        songName: 'Get Money',
        artist: 'San Andreas',
        cover: 'assets/img/img-getmoney.jpg',
        background: 'assets/img/img-getmoney.jpg',
    },
    {
        path: 'assets/musics/song-shawty.mp3',
        songName: 'Shawty Pt.2',
        artist: 'San Andreas',
        cover: 'assets/img/img-shawty.jpg',
        background: 'assets/img/img-shawty.jpg',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;

    // Change play button icon
    playBtn.classList.replace('ph-play', 'ph-pause');

    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;

    // Change pause button icon
    playBtn.classList.replace('ph-pause', 'ph-play');

    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.songName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.background;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) %
    songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX =e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));

music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);