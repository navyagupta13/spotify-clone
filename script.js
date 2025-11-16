console.log("Welcome to spotify");

// Initaialize the variables
let songIndex = 0;
let audioElement = new Audio('song1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName("songItem"));
let previous = document.getElementById("previous");
let next = document.getElementById("next");

let songs = [
    {songName: "Let me love you", filePath: "song1.mp3", coverPath: "covers/let-me-love-you.webp"},
    {songName: "Harley in Hawaii", filePath: "song2.mp3", coverPath: "covers/Harleys-in-Hawaii.png"},
    {songName: "Faded", filePath: "song3.mp3", coverPath: "covers/Faded.jpg"},
    {songName: "Middle of the night", filePath: "song4.mp3", coverPath: "covers/Middle-Of-The-Night.jpg"},
    {songName: "Let me down slowly", filePath: "song5.mp3", coverPath: "covers/Let-me-down-slowly.jpg"},
    {songName: "Alone", filePath: "song6.mp3", coverPath: "covers/Alone.jpg"},
    {songName: "Gasolina", filePath: "song7.mp3", coverPath: "covers/Gasolina.jpg"},
    {songName: "Night Changes", filePath: "song8.mp3", coverPath: "covers/Night-changes.png"},
    {songName: "One Kiss", filePath: "song9.mp3", coverPath: "covers/one-kiss.jpg"},
    {songName: "Love your voice", filePath: "song10.mp3", coverPath: "covers/love-your-voice.jpg"},
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity =1
}
else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
}
})

// Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // Update SeekBar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100) 
    myProgressBar.value = progress; 
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (songIndex === index && !audioElement.paused) {
            // Pause if the same song is playing
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            // Play new song
            makeAllPlays();
            songIndex = index;
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
        }
    });
});

previous.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

next.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

function playSong(index) {
    makeAllPlays();
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update play icon in song list
    document.getElementsByClassName("songItemPlay")[index].classList.remove('fa-play-circle');
    document.getElementsByClassName("songItemPlay")[index].classList.add('fa-pause-circle');

    // Update song name in bottom bar
    document.getElementById("masterSongName").innerText = songs[index].songName;
}
