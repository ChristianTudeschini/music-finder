const convertUppercase = (str) => {
    let arr = str.split(" ");
    arr.map((x, index) => {
        arr[index] = x.charAt(0).toUpperCase() + x.substring(1, x.length);
    });

    let finalStr = arr.join(" ");
    return finalStr;
}

const getLyrics = (artist, song) => {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open('GET',`https://api.lyrics.ovh/v1/${artist}/${song}`);
        req.send(null);

        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200) 
                    resolve(JSON.parse(req.responseText));
                else
                    reject(JSON.parse(req.responseText));
            }
        }
    });
}

var song = document.getElementById("lyrics__name");
var artist = document.getElementById("lyrics__artist");
var songLyrics = document.getElementById("lyrics__song");

const getResults =  async (artistName, songName) => {
    try {
        let lyric = await getLyrics(artistName, songName);
        let newLyric = JSON.stringify(lyric.lyrics);
        let convertedLyric = newLyric.replace(/\\n/g, "<br>").replace(/\\&&\\r/g, "");

        song.innerHTML = convertUppercase(songName);
        artist.innerHTML = convertUppercase(artistName);
        songLyrics.innerHTML = convertedLyric;
    } catch (err) {
        alert("Sorry, the song wasn't found");
    }
}

var inputArtistName = document.getElementById("artistName");
var inputSongName = document.getElementById("songName");

var btnFind = document.getElementById("btnFind");
btnFind.addEventListener("click", (event) => {
    event.preventDefault();
    const artistName = inputArtistName.value;
    const songName = inputSongName.value;

    if (!artistName || !songName)
        alert('Please fill all the required fields')
    else {
        getResults(artistName, songName);
    }
});



// SWITCH MODE LOGIC
/* 
var body = document.querySelector("body");
var form = document.getElementsByClassName("form");

var btnSwitch = document.getElementById("switch-mode");
btnSwitch.addEventListener("click", (e) => {
    e.preventDefault();
    btnSwitch.querySelector("img").src()
    body.classList.toggle("background-dark");
}) */