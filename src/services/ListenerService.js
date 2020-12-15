const root = 'http://localhost:4000';
const root2 = 'https://nameless-plateau-81307.herokuapp.com';
const findAllListeners = () => {
    return fetch(`${root}/api/listeners`)
        .then(response => response.json());
};

const findListenerById = (listenerId) => {
    return fetch(`${root}/api/listeners/${listenerId}`)
        .then(response => response.json());
};

const createListener = (listener) => {
};

const updateListener = (listenerId, newListener) => {
    return fetch(`${root}/api/listeners/${listenerId}`, {
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
    return fetch(`${root}/api/listeners/search/${query}`)
        .then(response => response.json());
};

export default {findAllListeners, findListenerById, createListener, updateListener, deleteListener, queryListener};
