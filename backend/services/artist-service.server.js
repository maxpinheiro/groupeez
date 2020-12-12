const {generateId} = require('../utils/utils');

let artists = [...(require('./artists.json'))];

const findAllArtists = () => artists;

const findArtistById = (artistId) => artists.find(artist => artist.id === artistId);

const findArtistBySpotifyId = (spotifyId) => artists.find(artist => artist.spotifyId === spotifyId);

const createArtist = (artist) => {
    /*
        "id": "fb4gb3kwlh",
    "username": "frankocean",
    "name": "Frank Ocean",
    "spotifyId": "2h93pZq0e7k5yf4dywlkpM",
    "bio": "Yep, it's me - Frank Ocean.",
    "profileUrl": "https://cdn.vox-cdn.com/thumbor/T99aQgHVsrd6Te-ZqYXxtr1gLs4=/0x124:628x543/1400x1400/filters:focal(0x124:628x543):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/50762927/Frank-Ocean-blonde-album-cover-628x628.0.0.jpg",
    "library": ["19YKaevk2bce4odJkP5L22", "6Nle9hKrkL1wQpwNfEkxjh"],
    "reviews": ["nrx9p3u7dh", "crjpmerj3q"],
    "posts": ["fx05r14p81", "x3bxcfxbgg"],
    "groupeez": ["7lj02xh15g"]
    * */
    artists.push({id: artist.id, username: artist.username, name: 'New user', spotifyId: artist.spotifyId, bio: ''});
    console.log('artists: ' + artists);
    return {id: artist.id, username: artist.username, name: 'New user', spotifyId: artist.spotifyId, bio: ''};
}


module.exports = {findAllArtists, findArtistById, findArtistBySpotifyId, createArtist};