const listenerService = require('../services/listener-service.server');

module.exports = function (app) {
    app.get('/api/listeners', (req, res) => {
        const listeners = listenerService.findAllListeners();
        res.json(listeners);
    });
    app.get('/api/listeners/:listenerId', (req, res) => {
        const listenerId = req.params.listenerId;
        const listener = listenerService.findListenerById(listenerId);
        if (listener) res.json(listener);
        else res.json({error: "No listener with id"});
    });
    app.get('/api/listeners/search/:query', (req, res) => {
        const query = req.params.query;
        const listeners = listenerService.queryListener(query);
        res.json(listeners);
    });
}