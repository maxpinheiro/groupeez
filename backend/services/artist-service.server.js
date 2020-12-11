const {generateId} = require('../utils/utils');

let artists = [...(require('./artists.json'))];

const findAllSongs = () => artists;

const findArtistById = (songId) => artists.find(song => song.id === songId);

const createUser = (song) => {
    let id = generateId(10);
    // can't have two songs with the same id
    while (artists.find(u => u.id === id)) {
        id = generateId(10);
    }
    artists.push({id, artist: song.artist, artistId: song.artistId, name: song.name});
    console.log('songs: ' + artists);
    return {id, artist: song.artist, artistId: song.artistId, name: song.name};
}


module.exports = {findAllSongs, findArtistById, createUser};