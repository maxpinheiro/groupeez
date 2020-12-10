const generateId = (length) => {
    const options = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let result = "";
    while (result.length < length) {
        let idx = Math.floor(Math.random() * options.length);
        result += options[idx];
    }
    return result;
};

module.exports = {generateId};