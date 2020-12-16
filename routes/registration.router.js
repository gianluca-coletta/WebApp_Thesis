var express = require("express");
var router = express.Router();
var logging = require("../models/logging");


router.get("/signup", function (req, res) {

    var sql = "SELECT * FROM `universita` ";
    db.query(sql, function (err, result) {
        logging.info(result);

        var sql1 = "SELECT * FROM `corsodilaurea`";
        db.query(sql1, function (err, result1) {
            logging.info(result1);
            res.render('signup', { message: null, univ:result, cdl: result1 });
        });
    });
});

router.post("/signup", function (req, res) {

    var message = '';
    var post = req.body;
    var mail = post.email;
    var uni = post.universita;
    var matr = post.matricola;
    var cdl = post.corsodilaurea
    var pass = post.password;
    var fname = post.nome;
    var lname = post.cognome;
    var mob = post.numerotelefonico;

    var sql = "INSERT INTO studente (matricola, universita, nome, cognome, password, email, numerotelefonico, corsodilaurea) VALUES (?,?,?,?,?,?,?,?)";
    var values = [matr, uni, fname, lname, pass, mail, mob, cdl];

    if (matr == '' || uni == '' || fname == '' || lname == '' || pass == '' || mail == '' || mob == '' || cdl == '') {
        message = 'Controlla che tutti i campi siano riempiti correttamente! REGISTRAZIONE NON COMPLETATA!';
        res.render('signup.ejs', { message: message });
    }

    else {
        var query = db.query(sql, values, function (err, result) {
            logging.info(query);
            message = "Perfetto! Registrazione avvenuta con successo!";
            logging.info("hai appena aggiunto un nuovo studente \n Comunicazione con il database riuscita");

            res.render('signup.ejs', { message: message });
        });
    }

});

module.exports = router;