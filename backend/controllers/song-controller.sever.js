const songService = require('../services/song-service.server');

module.exports = function (app) {
    app.get('/api/songs', (req, res) => {
        const songs = songService.findAllSongs();
        res.json(songs);
    });
    app.get('/api/songs/:songId', (req, res) => {
        const songId = req.params.songId;
        const song = songService.findSongById(songId);
        if (song) res.json(song);
        else res.json({error: "No song with id"});
    });
}