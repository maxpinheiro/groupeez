let songs = [...(require('./songs.json'))];

const findAllSongs = () => songs;

const findSongById = (songId) => songs.find(song => song.id === songId);

const createSong = (song) => {
    songs.push({id: song.id, username: song.username, name: 'New user', bio: ''});
    console.log('Songs: ' + songs);
    return {id: song.id, username: song.username, name: 'New user', bio: ''};
};

const updateSong = (songId, newSong) => {

};

const deleteSong = (songId, newSong) => {

};



module.exports = {findAllSongs, findSongById, createSong, updateSong, deleteSong}