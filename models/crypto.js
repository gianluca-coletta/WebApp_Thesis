var crypto = require("crypto");

function cypher(value) {
    return crypto
                .createHash("sha256")
                .update(value)
                .digest("hex");
}

module.exports = {
    cypher
}

// Login
// 1. password utente => pippo
// 2. SELECT PASSWORD FROM STUDENTE WHERE EMAIL = 'XXX'
// 3. var c = cypher(pippo)
// 3. if (c == PASSWORD)


// Salvo du DB
// cypther pippo => 0x1223123