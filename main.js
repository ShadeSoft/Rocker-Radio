const streamUrl   = 'http://rockerradio.online/live.mp3';
const dataUrl     = 'http://stream.diazol.hu:35200/7.html';
const trackDataNo = 11;

let artist,
    player,
    title,
    toggle;

document.addEventListener('DOMContentLoaded', () => {
	title  = document.getElementById('song-title');
    artist = document.getElementById('song-artist');

    player = document.getElementById('player');
    toggle = document.getElementById('toggle-player');

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

let loadSongData = () => {
    if(!player.paused) {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let data = this.responseText.replace(/<[^>]+>/g, '').split(',')[trackDataNo]
                    .replace(/\[[0-9]{4}]/, '')
                    .split(' - ');
                title.innerHTML = data[1] ? data[1].trim() : '';
                artist.innerHTML = data[0] ? data[0].trim() : '';
            }
        };

        xhr.open('GET', dataUrl, true);
        xhr.send();
    }
};

let clearSongData = () => {
    title.innerHTML = '';
    artist.innerHTML = '';
};