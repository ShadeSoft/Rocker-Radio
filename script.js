const url = 'http://stream.diazol.hu:35200';

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

	setInterval(() => loadSongData(), 10000);
    loadSongData();
});

let togglePlayer = () => {
	if(player.paused) {
        player.setAttribute('src', url+'/stream');
        player.play();
        toggle.classList.remove('fa-play-circle');
        toggle.classList.add('fa-pause-circle');
    } else {
        player.pause();
        player.removeAttribute('src');
        toggle.classList.remove('fa-pause-circle');
        toggle.classList.add('fa-play-circle');
    }
};

let loadSongData = () => {
    if(!player.paused) {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let data = this.responseText
                    .match('<td>Currently playing:</td><td class="streamstats">([^<]+)</td>')[1]
                    .replace(/\s\[[0-9]{4}]/, '')
                    .split(' - ');
                title.innerHTML = data[1] ? data[1] : '';
                artist.innerHTML = data[0] ? data[0] : '';
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
    }
};