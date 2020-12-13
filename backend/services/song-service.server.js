const {stringSimilarity} = require('../utils/utils');

let songs = [...(require('./songs.json'))];

const findAllSongs = () => songs;

const findSongById = (songId) => songs.find(song => song.id === songId);

const createSong = (song) => {
    songs.push({id: song.id, username: song.username, name: 'New user', bio: ''});
    return {id: song.id, username: song.username, name: 'New user', bio: ''};
};

const updateSong = (songId, newSong) => {

};

const deleteSong = (songId, newSong) => {

};

const querySong = (query) => songs.filter(s => stringSimilarity(query, s.title) >= 0.6);

module.exports = {findAllSongs, findSongById, createSong, updateSong, deleteSong, querySong}