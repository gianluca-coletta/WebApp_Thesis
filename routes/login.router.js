var express = require("express");
var router = express.Router();
var logging = require("../models/logging");
var crypto = require("../models/crypto")

router.get('/login', function (req, res) {
    var message = '';
    res.render('login.ejs', { message: message });
});

//login
router.post('/login', function (req, res) {
    var message = '';
    var sess = req.session;

    var post = req.body;
    var mail = post.email;
    var pass = post.password;
    var sql = "SELECT matricola, nome, cognome, email, password FROM studente WHERE email='" + mail + "'";
    db.query(sql, function (err, results) {
        if (results.length === 0 || results[0].password != crypto.cypher(pass)) {
            message = 'Credenziali errate';
            res.render('login.ejs', { message: message });
        } else {
            var r = results[0];
            req.session.userId = {
                matricola: r.matricola,
                email: r.email,
                nome: r.nome,
                cognome: r.cognome
            };
            logging.info("ciao " + req.session.userId.nome);

            res.redirect('/dashboard');
        }
    });
});

//logout
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/");
    })
});

//profile info
router.get("/profile", function (req, res) {

    var user = req.session,
        email = req.session.userId.email;
    if (email == null) {
        return res.redirect("/home/login");
    }

    logging.info('email ' + email)
    var sql = "SELECT * FROM `studente` WHERE `email`='" + email + "'";
    db.query(sql, function (err, result) {
        res.render('profile.ejs', { user: user, data: result, userId: req.session.userId });
    });
});

module.exports = router;