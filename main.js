const appTitle    = 'Rocker Rádió';
const streamUrl   = 'http://rockerradio.online/live.mp3';
const dataUrl     = 'http://stream.diazol.hu:35200/7.html';
const trackDataNo = 6;

let player,
    toggle,
    artist,
    title;

document.addEventListener('DOMContentLoaded', () => {
    player = document.getElementById('player');
    toggle = document.getElementById('toggle-player');

    artist = document.getElementById('song-artist');
    title  = document.getElementById('song-title');

    toggle.onclick = () => togglePlayer();
    togglePlayer();

	setInterval(() => loadSongData(), 5000);
    loadSongData();
});

let togglePlayer = () => {
	if(player.paused) {
        player.setAttribute('src', streamUrl);
        player.play();
        loadSongData();
        toggle.classList.remove('fa-play-circle');
        toggle.classList.add('fa-pause-circle');
    } else {
        player.pause();
        player.removeAttribute('src');
        clearSongData();
        toggle.classList.remove('fa-pause-circle');
        toggle.classList.add('fa-play-circle');
    }
};

let loadSongData = async () => {
    if(!player.paused) {
        let data = (await (await fetch(dataUrl)).text()).replace(/<[^>]+>/g, '').split(',')[trackDataNo]
            .replace(/\[[0-9]{4}]/, '');

        document.title = '▶ ' + data + ' | ' + appTitle;

        data = data.split(' - ');
        title.textContent  = data[1] ? data[1].trim() : '';
        artist.textContent = data[0] ? data[0].trim() : '';
    }
};

let clearSongData = () => {
    document.title     = appTitle;
    title.textContent  = '';
    artist.textContent = '';
};