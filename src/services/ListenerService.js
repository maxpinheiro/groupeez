const findAllListeners = () => {
    return fetch('http://localhost:4000/api/listeners')
        .then(response => response.json());
}

const findListenerById = (listenerId) => {
    return fetch(`http://localhost:4000/api/listeners/${listenerId}`)
        .then(response => response.json());
}

const createListener = (listener) => {
};

const updateListener = (listenerId, newListener) => {

};

const deleteListener = (listenerId, newListener) => {

};

module.exports = {findAllListeners, findListenerById, createListener, updateListener, deleteListener}