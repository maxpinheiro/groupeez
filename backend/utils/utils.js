const ss = require('string-similarity');

const generateId = (length) => {
    const options = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let result = "";
    while (result.length < length) {
        let idx = Math.floor(Math.random() * options.length);
        result += options[idx];
    }
    return result;
};

const stringSimilarity = (str1, str2) => ss.compareTwoStrings(str1, str2);

module.exports = {generateId, stringSimilarity};