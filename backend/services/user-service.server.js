let users = [
    {
        username: "mpinheiro",
        password: "thatsgreedy"
    },
    {
        username: "ofloody",
        password: "nowayjose"
    }
];

const findUserByCredentials = (username, password) => users.find(user => user.username === username);

const createUser = (username, password) => {
    if (users.find(user => user.username === username)) {
        return undefined;
    } else {
        users.push({username, password});
        return {username, password};
    }
}

module.exports = {findUserByCredentials, createUser};