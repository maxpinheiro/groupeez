const artistService = require('../services/artist-service.server');

module.exports = function (app) {
    app.get('/api/artists', (req, res) => {
        const artists = artistService.findAllArtists();
        res.json(artists);
    });
    app.get('/api/artists/:artistId', (req, res) => {
        const artistId = req.params.artistId;
        const artist = artistService.findArtistById(artistService);
        if (artist) res.json(artist);
        else res.json({error: "No artist with id"});
    });
}