export const login = (username, password) => {
    return fetch('http://localhost:4000/api/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
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

export default {login, getCurrentUser};