const songsModel = require('../models/songs.model.server');

const findAllSongs = () => songsModel.find();

const findSongById = (songId) => songsModel.findById(songId);

const createSong = (song) => {

};

const querySong = (query) => songsModel.find();

module.exports = {findAllSongs, findSongById, createSong, querySong}