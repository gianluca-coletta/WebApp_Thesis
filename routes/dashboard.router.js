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
    // var user = req.session;
    var corsodilaurea;
    var email = req.session.userId.email;

    var sql = "SELECT corsodilaurea FROM `studente` WHERE `email`='" + email + "'";
    db.query(sql, function (err, result) {
        corsodilaurea = result[0].corsodilaurea;
        // logging.info(corsodilaurea);

        var sql1 = "SELECT * FROM `insegnamento` WHERE `corsodilaurea`='" + corsodilaurea + "'";

        db.query(sql1, function (err, result) {
            if (id !== undefined) {
                var sql2 = "SELECT orainizio, orafine, gg, insegnamento, nome, sede, postitotali FROM `lezione`, `aula` WHERE lezione.idaula=aula.id";
                db.query(sql2, function (err, result2) {
                    //    logging.info(result2);
                    res.render('prenotazione.ejs', { data: result, userId: req.session.userId, data2: result2 });
                });
            } else {
                res.render('prenotazione.ejs', { data: result, userId: req.session.userId, data2: null });
            }

        });
    });
});

module.exports = router;