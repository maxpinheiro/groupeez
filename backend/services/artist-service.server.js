let artists = [...(require('./artists.json'))];

const findAllArtists = () => artists;

const findArtistById = (artistId) => artists.find(artist => artist.id === artistId);

const createArtist = (artist) => {
    artists.push({id: artist.id, name: artist.name, spotifyId: artists.spotifyId});
    return {id: artist.id, name: artist.name, spotifyId: artists.spotifyId};
};

const updateArtist = (artistId, newArtist) => {

};

const deleteArtist = (artistId, newArtist) => {

};

module.exports = {findAllArtists, findArtistById, createArtist, updateArtist, deleteArtist}