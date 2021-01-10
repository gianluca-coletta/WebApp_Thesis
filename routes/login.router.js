var express = require("express");
var router = express.Router();
var logging = require("../models/logging");
var crypto = require("../models/crypto")
var moment = require("moment");

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
        if (results.length === 0 || results[0].password != crypto.hashPassword(pass)) {
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
    
    var sql = "SELECT * FROM `studente` WHERE `email`='" + email + "'";
    db.query(sql, function (err, result) {
        res.render('profile.ejs', { user: user, data: result, userId: req.session.userId });
    });
});

//myReservation

router.get("/myReservation", function (req, res) {

    var email = req.session.userId.email,
        matricola = req.session.userId.matricola;
    if (email == null) {
        return res.redirect("/home/login");
    }
//select prenotazioni
    var sql =  `
            SELECT 
                orainizio
                ,orafine
                ,gg
                ,a.nome as Aula
                ,a.sede
                ,p.id as idPrenotazione
                ,p.NumPosto
                ,i.Nome as Insegnamento
            FROM 
                lezione 
                inner join aula a
                    on lezione.idaula = a.id 
                inner join prenotazione p
                    on lezione.id = p.idLezione
                    and p.Studente = '${matricola}'
			   inner join insegnamento i
					on lezione.insegnamento = i.CodiceI
    `;
    db.query(sql, function (err, result) {
        if (err) {
            req.session.error_message = err;
            return res.redirect("/error");
        }
         // Format date for dd-mm-yyyy
         result.forEach(p => { p.gg = moment(p.gg).format('l'); });

        return res.render('myReservation.ejs', {
            userId: req.session.userId,
            reserv: result
             });
    });
});
//delete prenotazione
router.post("/delete", (req, res) => {

    var idPrenotazione = req.body.idPrenotazione;
    logging.info(idPrenotazione)

    var sql = `DELETE FROM prenotazione WHERE id = '${idPrenotazione}'`;
    logging.info(sql)
    db.query(sql, function (err, result) {

        return res.redirect(`/home/myReservation`);
    });
});


module.exports = router;