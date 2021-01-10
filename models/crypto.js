var crypto = require("crypto");

function sha256(value) {
    return crypto
                .createHash("sha256")
                .update(value)
                .digest("hex");
}

function hashPassword(value){
    return sha256(value);
}


module.exports = {
    sha256,
    hashPassword
}


