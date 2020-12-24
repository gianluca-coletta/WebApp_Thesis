var express = require("express");
var router = express.Router();
var logging = require("../models/logging");
var moment = require("moment");

router.post("/delete", (req, res) => {
    if (!req.session.userId) res.redirect("/home/login");

    var idPrenotazione = req.body.idPrenotazione;
    var idInsegnamento = req.body.idInsegnamento;

    // DELETE FROM 

    return res.redirect(`/dashboard/reservation?id=${idInsegnamento}`);
});

router.post("/save", (req, res) => {
    if (!req.session.userId) res.redirect("/home/login");

    var matricola = req.body.matricola;
    var idLezione = req.body.idLezione;
    var idInsegnamento = req.body.idInsegnamento;

    // logging.info(`matricola ${matricola} idLezione ${idLezione} idInsegnamento ${idInsegnamento}`);

    // INSERT INTO TABELLA


    return res.redirect(`/dashboard/reservation?id=${idInsegnamento}`);
});

router.get("/", function (req, res, next) {

    if (!req.session.userId) res.redirect("/home/login");

    var user = req.session;
    var email = req.session.userId.email;

    logging.info(req.session.userId.email);

    if (email == null) {
        return res.redirect("/login");
    }

    var sql = "SELECT * FROM studente WHERE `email`='" + email + "'";
    db.query(sql, function (err, results) {
        return res.render('dashboard.ejs', { user: user, userId: req.session.userId });
    });
});

router.get("/reservation/:id?", function (req, res) {

    if (!req.session.userId) res.redirect("/home/login");
    var id = req.query.id;

    logging.info(id);

    // Select Ins e Lez

    var email = req.session.userId.email;

    var sql = "SELECT i.* FROM studente s inner join insegnamento i on s.corsodilaurea = i.CorsoDiLaurea WHERE s.email = '" + email + "'";

    db.query(sql, function (err, result) {
        if (id !== undefined) {
            var sql1 = `
            SELECT 
                 lezione.id as id
                ,orainizio
                ,orafine
                ,gg
                ,insegnamento
                ,nome
                ,sede
                ,postitotali 
                ,p.Studente
                ,p.id IdPrenotazione
            FROM 
                lezione 
                inner join aula 
					on lezione.idaula = aula.id 
				left join prenotazione p
                    on lezione.id = p.idLezione
                    and p.Studente = '${req.session.userId.matricola}'
			WHERE insegnamento = '${id}'
            `;
            // logging.info(sql1);
            db.query(sql1, function (err, result2) {
                //    logging.info(result2);

                if (err) {
                    req.session.error_message = err;
                    return res.redirect("/error");
                }
                result2.forEach(p => { p.gg = moment(p.gg).format('l'); });

                return res.render('prenotazione.ejs', {
                    ins: result,
                    userId: req.session.userId,
                    matricola: req.session.userId.matricola,
                    idInsegnamento: id,
                    lez: result2
                });
            });
        } else {
            return res.render('prenotazione.ejs', {
                ins: result,
                userId: req.session.userId,
                matricola: req.session.userId.matricola,
                lez: null
            });
        }

    });
});

module.exports = router;