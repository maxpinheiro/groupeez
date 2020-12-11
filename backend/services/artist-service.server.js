let artists = [...(require('./artists.json'))];

const findAllArtists = () => artists;

const findArtistById = (artistId) => artists.find(artist => artist.id === artistId);

const createArtist = (artist) => {
    const spotifyId = artist.spotifyId || null;
    artists.push({id: artist.id, name: 'New user', spotifyId});
    console.log('artists: ' + artists);
    return {id: artist.id, name: 'New user', spotifyId};
};

const updateArtist = (artistId, newArtist) => {

};

const deleteArtist = (artistId, newArtist) => {

};

module.exports = {findAllArtists, findArtistById, createArtist, updateArtist, deleteArtist}