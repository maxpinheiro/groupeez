let listeners = [...(require('./listeners.json'))];

const findAllListeners = () => listeners;

const findListenerById = (listenerId) => listeners.find(listener => listener.id === listenerId);

const createListener = (listener) => {
    listeners.push({id: listener.id, username: listener.username, name: 'New user', bio: ''});
    console.log('listeners: ' + listeners);
    return {id: listener.id, username: listener.username, name: 'New user', bio: ''};
};

const updateListener = (listenerId, newListener) => {

};

const deleteListener = (listenerId, newListener) => {

};

module.exports = {findAllListeners, findListenerById, createListener, updateListener, deleteListener}