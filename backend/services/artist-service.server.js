const {generateId} = require('../utils/utils');

let songs = [...(require('./songs.json'))];

const findAllSongs = () => songs;

const findUserByCredentials = (songId) => songs.find(song => song.id === songId);

const findUserById = (songId) => songs.find(song => song.id === songId);

const createUser = (song) => {
    let id = generateId(10);
    // can't have two songs with the same id
    while (songs.find(u => u.id === id)) {
        id = generateId(10);
    }
    songs.push({id, artist: song.artist, artistId: song.artistId, name: song.name});
    console.log('songs: ' + songs);
    return {id, artist: song.artist, artistId: song.artistId, name: song.name};
}


module.exports = {findAllSongs, findUserByCredentials, findUserById, createUser};