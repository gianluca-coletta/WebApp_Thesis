var express = require("express");
var router = express.Router();
var logging = require("../models/logging");

router.get("/", function (req, res, next) {

    if (!req.session.userId) res.redirect("/home/login");

    var user = req.session;
    var email = req.session.userId.email;

    logging.info(req.session.userId.email);

    if (email == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM studente WHERE `email`='" + email + "'";
    db.query(sql, function (err, results) {

        res.render('dashboard.ejs', { user: user, userId: req.session.userId });
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
            var sql1 = "SELECT orainizio, orafine, gg, insegnamento, nome, sede, postitotali FROM lezione inner join aula on lezione.idaula = aula.id";
            db.query(sql1, function (err, result2) {
                //    logging.info(result2);
                res.render('prenotazione.ejs', { ins: result, userId: req.session.userId, lez: result2 });
            });
        } else {
            res.render('prenotazione.ejs', { ins: result, userId: req.session.userId, lez: null });
        }

    });
});

module.exports = router;