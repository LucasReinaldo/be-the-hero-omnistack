const crypto = require('crypto');

module.exports = function genUniqueId() {
    return crypto.randomBytes(6).toString('HEX'); //generate id
};
    