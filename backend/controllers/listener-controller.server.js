const listenerService = require('../services/listener-service.server');

module.exports = function (app) {
    app.get('/api/listeners', (req, res) => {
        listenerService.findAllListeners().then(listeners => res.json(listeners));
    });
    app.get('/api/listeners/:listenerId', (req, res) => {
        const listenerId = req.params.listenerId;
        if (listenerId) {
            listenerService.findListenerById(listenerId).then(listener => {
                if (listener) res.json(listener);
                else res.json({error: "No listener with id"});
            });
        }
    });
    app.put('/api/listeners/:listenerId', (req, res) => {
        const listenerId = req.params.listenerId;
        const listener = req.body;
        listenerService.updateListener(listenerId, listener).then(status => {
            if (status.ok === 1) res.json(listener);
            else res.json({error: "Could not update listener"});
        });
    });
    app.get('/api/listeners/search/:query', (req, res) => {
        const query = req.params.query;
        listenerService.queryListener(query).then(listeners => res.json(listeners));
    });
}