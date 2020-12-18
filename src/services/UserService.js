const root = 'http://localhost:4000';

export const login = (username, password) => {
    return fetch(`${root}/api/login`, {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
}

export const register = (newUser) => {
    return fetch(`${root}/api/register`, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
}

export const logout = () => {
    return fetch(`${root}/api/logout`, {
        method: 'POST'
    }).then(response => response.json());
}

export const getCurrentUser = () => {
    return fetch(`${root}/api/currentUser`, {
        withCredentials: true
    }).then(response => response.json());
}
export const getUserById = (userId) => {
    return fetch(`${root}/api/users/${userId}`).then(response => response.json());
}

export const getAccessToken= () => {
    return fetch(`${root}/api/accessToken`).then(response => response.json());
}

export const setAccessToken = (accessToken) => {
    return fetch(`${root}/api/accessToken`, {
        method: 'POST',
        body: JSON.stringify({accessToken: accessToken, message: "ok"}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
}

export const getRefreshToken= () => {
    return fetch(`${root}/api/accessToken`).then(response => response.json());
}

export const setRefreshToken = (refreshToken) => {
    return fetch(`${root}/api/refreshToken`, {
        method: 'POST',
        body: JSON.stringify({refreshToken: refreshToken, message: "ok"}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
}

export default {login, register, logout, getCurrentUser, getUserById, getAccessToken, setAccessToken, getRefreshToken, setRefreshToken};