const findAllListeners = () => {
    return fetch('http://localhost:4000/api/listeners')
        .then(response => response.json());
};

const findListenerById = (listenerId) => {
    return fetch(`http://localhost:4000/api/listeners/${listenerId}`)
        .then(response => response.json());
};

const createListener = (listener) => {
};

const updateListener = (listenerId, newListener) => {
    return fetch(`http://localhost:4000/api/listeners/${listenerId}`, {
        method: `PUT`,
        body: JSON.stringify(newListener),
        headers: {
            "content-type" : "application/json"
        }
    })
        .then(response => response.json());
};

const deleteListener = (listenerId, newListener) => {

};

const queryListener = (query) => {
    return fetch(`http://localhost:4000/api/listeners/search/${query}`)
        .then(response => response.json());
};

export default {findAllListeners, findListenerById, createListener, updateListener, deleteListener, queryListener};
