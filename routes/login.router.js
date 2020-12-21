var express = require("express");
var router = express.Router();
var logging = require("../models/logging");

router.get('/login', function (req, res) {
    var message = '';
    res.render('login.ejs', { message: message });
});

router.post('/login', function (req, res) {
    var message = '';
    var sess = req.session;

    var post = req.body;
    var mail = post.email;
    var pass = post.password;

    var sql = "SELECT matricola, nome, cognome, email, password FROM studente WHERE email='" + mail + "' and password = '" + pass + "'";
    db.query(sql, function (err, results) {
        // if (passwrod == cypther(pass)) => autenticato
        if (results.length) {
            req.session.userId = results[0];
            logging.info("ciao " + req.session.userId.nome);

            res.redirect('/dashboard');
        }
        else {
            message = 'Credenziali errate';
            res.render('login.ejs', { message: message });
        }

    });

});

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/");
    })
});

router.get("/profile", function (req, res) {

    var user = req.session,
       email = req.session.userId.email;
    if (email == null) {
        res.redirect("/home/login");
        return;
    }

    logging.info('email ' + email)
    var sql = "SELECT * FROM `studente` WHERE `email`='" + email + "'";
    db.query(sql, function (err, result) {
        res.render('profile.ejs', {user: user, data: result, userId: req.session.userId });
    });
});

module.exports = router;