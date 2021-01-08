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

// Login
// 1. password utente => pippo
// 2. SELECT PASSWORD FROM STUDENTE WHERE EMAIL = 'XXX'
// 3. var c = cypher(pippo)
// 3. if (c == PASSWORD)


// Salvo du DB
// cypther pippo => 0x1223123