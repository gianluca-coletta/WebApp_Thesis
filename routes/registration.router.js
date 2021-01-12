var express = require("express");
var router = express.Router();
var logging = require("../models/logging");
var crypto = require("../models/crypto");

// crypto.cypher("");
/**
 * Load all Corso di laurea
 */
async function fillCorsoDiLaurea() {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `corsodilaurea`";
        db.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
}

router.get("/signup", async function (req, res) {
    var cdl = await fillCorsoDiLaurea();
    return res.render('signup', { message: null, cdl });
});

router.post("/signup", async function (req, res) {

    function isMatricolaDuplicated(matr) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT COUNT(*) AS NUM FROM Studente WHERE matricola = ?";
            var values = [matr];
            db.query(sql, values, (err, result) => {
                if (err) reject(err);
                var res = Number(result[0].NUM) > 0;
                resolve(res);
            });
        });
    }

    function isEmailDuplicated(mail) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT COUNT(*) AS NUM FROM Studente WHERE email = ?";
            var values = [mail];
            db.query(sql, values, (err, result) => {
                if (err) reject(err);
                var res = Number(result[0].NUM) > 0;
                resolve(res);
            });
        });
    }

    async function returnForm(message) {
        try {
            var cdl = await fillCorsoDiLaurea();
            res.render('signup.ejs', { message, cdl });
        } catch (error) {
            res.render('signup.ejs', { message: error, cdl: [] });
        }
    }

    var message = '';
    var post = req.body;
    var mail = post.email;
    var matr = post.matricola;
    var cdl = post.corsodilaurea
    var pass = post.password;
    var fname = post.nome;
    var lname = post.cognome;
    var mob = post.numerotelefonico;

    var pass2 = crypto.hashPassword(pass);
    var sql = "INSERT INTO studente (matricola, nome, cognome, password, email, numerotelefonico, corsodilaurea) VALUES (?,?,?,?,?,?,?)";
    var values = [matr, fname, lname, pass2, mail, mob, cdl];

    // Check fields validations
    if (matr == '' || fname == '' || lname == '' || pass == '' || mail == '' || mob == '' || cdl == '') {
        message = 'Controlla che tutti i campi siano riempiti correttamente!';
        return await returnForm(message);
    }

    // Check matricola
    if (await isMatricolaDuplicated(matr)) {
        message = "La matricola è duplicata";
        return await returnForm(message);
    }

    // Check email
    if (await isEmailDuplicated(mail)) {
        message = "L'email è duplicata";
        return await returnForm(message);
    }

    db.query(sql, values, async (err, result) => {
        if (err)
            message = err;
        else
            message = "Registrazione avvenuta con successo!";
        return await returnForm(message);
    });
});

module.exports = router;