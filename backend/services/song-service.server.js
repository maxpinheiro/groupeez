const {stringSimilarity} = require('../utils/utils');
const songsDao = require('../daos/songs.dao.server');

const findAllSongs = () => songsDao.findAllSongs();

const findSongById = (songId) => songsDao.findSongById(songId);

const createSong = (song) => songsDao.createSong(song)

const updateSong = (songId, newSong) => {

};

const deleteSong = (songId, newSong) => {

};

const querySong = (query) => songsDao.querySong(query);

/*
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
*/

module.exports = {findAllSongs, findSongById, createSong, updateSong, deleteSong, querySong}