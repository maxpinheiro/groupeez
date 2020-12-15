const root = 'http://localhost:4000';
const root2 = 'https://nameless-plateau-81307.herokuapp.com/';

export const login = (username, password) => {
    return fetch(`${root2}/api/login`, {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
}

export const register = (newUser) => {
    return fetch(`${root2}/api/register`, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
}

export const getCurrentUser = () => {
    return fetch(`${root2}/api/currentUser`, {
        withCredentials: true
    }).then(response => response.json());
}
export const getUserById = (userId) => {
    return fetch(`${root2}/api/users/${userId}`).then(response => response.json());
}

export const getAccessToken= () => {
    return fetch(`${root2}/api/accessToken`).then(response => response.json());
}

export const setAccessToken = (accessToken) => {
    return fetch(`${root2}/api/accessToken`, {
        method: 'POST',
        body: JSON.stringify({accessToken: accessToken, message: "ok"}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
}

export const getRefreshToken= () => {
    return fetch(`${root2}/api/accessToken`).then(response => response.json());
}

export const setRefreshToken = (refreshToken) => {
    return fetch(`${root2}/api/refreshToken`, {
        method: 'POST',
        body: JSON.stringify({refreshToken: refreshToken, message: "ok"}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
}

export default {login, register, getCurrentUser, getUserById, getAccessToken, setAccessToken, getRefreshToken, setRefreshToken};