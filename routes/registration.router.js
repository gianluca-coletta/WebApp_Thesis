var express = require("express");
var router = express.Router();
var logging = require("../models/logging");

router.get("/signup", function (req, res) {

    var sql = "SELECT * FROM `corsodilaurea`";
    db.query(sql, function (err, result) {
        logging.info(result);
        res.render('signup', { message: null, cdl: result });
    });
});

router.post("/signup", async (req, res) => {

    function isMatricolaDuplicated(matr) {
        return new Promise((resolve, reject)=> {
            var sql = "SELECT COUNT(*) AS NUM FROM Studente WHERE matricola = ?";
            var values = [matr];
            db.query(sql, values, (err, result) => {
                if (err) reject(err);
                var res = Number(result[0].num) > 0;
                resolve(res);
            });
        });
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



    var sql = "INSERT INTO studente (matricola, nome, cognome, password, email, numerotelefonico, corsodilaurea) VALUES (?,?,?,?,?,?,?,?)";
    var values = [matr, uni, fname, lname, pass, mail, mob, cdl];

    // Check fields validations
    if (matr == '' || fname == '' || lname == '' || pass == '' || mail == '' || mob == '' || cdl == '') {
        message = 'Controlla che tutti i campi siano riempiti correttamente! REGISTRAZIONE NON COMPLETATA!';
        res.render('signup.ejs', { message: message });
    }

    // Check matricola
    if (await isMatricolaDuplicated(matr)) {
        message = "La matricola è duplicata";
        res.render('signup.ejs', { message: message });
    }

    db.query(sql, values, (err, result) => {
        logging.info(query);
        message = "Perfetto! Registrazione avvenuta con successo!";
        logging.info("hai appena aggiunto un nuovo studente \n Comunicazione con il database riuscita");

        res.render('signup.ejs', { message: message });
    });


});

module.exports = router;