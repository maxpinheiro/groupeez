const songService = require('../services/song-service.server');

module.exports = function (app) {
    app.get('/api/songs', (req, res) => {
        songService.findAllSongs().then(songs => res.json(songs));
    });
    app.get('/api/songs/:songId', (req, res) => {
        const songId = req.params.songId;
        if (songId.length === 24) {
            songService.findSongById(songId).then(song => {
                if (song) res.json(song);
                else res.json({error: "No song with id"});
            });
        } else res.json({error: "No song with id"});
    });
    app.get('/api/songs/search/:query', (req, res) => {
        const query = req.params.query;
        songService.querySong(query).then(songs => res.json(songs));
    });
}