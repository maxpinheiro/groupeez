export const login = (username, password) => {
    return fetch('http://localhost:4000/api/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
}

export const register = (newUser) => {
    return fetch('http://localhost:4000/api/register', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
}

export const getCurrentUser = () => {
    return fetch('http://localhost:4000/api/currentUser', {
        withCredentials: true
    }).then(response => response.json());
}
export const getUserById = (userId) => {
    return fetch(`http://localhost:4000/api/users/${userId}`).then(response => response.json());
}

export const getAccessToken= () => {
    return fetch(`http://localhost:4000/api/accessToken`).then(response => response.json());
}

export const setAccessToken = (accessToken) => {
    return fetch('http://localhost:4000/api/accessToken', {
        method: 'POST',
        body: JSON.stringify(accessToken),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
}

export default {login, register, getCurrentUser, getUserById, getAccessToken, setAccessToken};