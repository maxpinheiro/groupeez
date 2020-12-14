const artistService = require('../services/artist-service.server');

module.exports = function (app) {
    app.get('/api/artists', (req, res) => {
        artistService.findAllArtists().then(artists => res.json(artists));
    });
    app.get('/api/artists/:artistId', (req, res) => {
        const artistId = req.params.artistId;
        if (artistId.length === 24) {
            artistService.findArtistById(artistId).then(artist => {
                if (artist) res.json(artist);
                else res.json({error: "No artist with id"});
            })
        } else {
            artistService.findAllArtists().then(artists => {
                const artist = artists.find(a => a.spotifyId === artistId);
                if (artist) res.json(artist);
                else res.json({error: "No artist with spotify id"});
            })
            /*artistService.findArtistBySpotifyId(artistId).then(artist => {
                if (artist) res.json(artist);
                else res.json({error: "No artist with id"});
            })*/
        }

    });
    app.get('/api/artists/search/:query', (req, res) => {
        const query = req.params.query;
        artistService.queryArtist(query).then(artists => res.json(artists));
    });
}