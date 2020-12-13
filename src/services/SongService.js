const findAllSongs = () => {
    return fetch('http://localhost:4000/api/songs')
        .then(response => response.json());
};

const findSongById = (songId) => {
    return fetch(`http://localhost:4000/api/songs/${songId}`)
        .then(response => response.json());
};

const createSong = (newSong) => {
    return fetch('http://localhost:4000/api/songs', {
        method: 'POST',
        body: JSON.stringify(newSong),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
};

const updateSong = (songId, song) => {
    return fetch(`http://localhost:4000/api/songs/${songId}`, {
        method: 'PUT',
        body: JSON.stringify(song),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
};

const deleteSong = (songId) => {
    return fetch(`http://localhost:4000/api/songs/${songId}`, {
        method: 'DELETE'
    }).then(response => response.json());
};

const querySong = (query) => {
    return fetch(`http://localhost:4000/api/songs/search/${query}`)
        .then(response => response.json());
}

export default {findAllSongs, findSongById, createSong, updateSong, deleteSong, querySong};