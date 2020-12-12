var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {

    var user = req.session;
    var email = req.session.userId.email;
    console.log(req.session.userId.email);
    if (email == null) {
        res.redirect("/login");
        return;
    }
    var sql = "SELECT * FROM studente WHERE `email`='" + email + "'";

    db.query(sql, function (err, results) {

        res.render('dashboard.ejs', { user: user });
    });
});

router.get("/reservation", function (req, res) {

    console.log(req.session);
    var user = req.session;
    var corsodilaurea;
    var email = req.session.userId.email;

    var sql = "SELECT corsodilaurea FROM `studente` WHERE `email`='" + email + "'";
    db.query(sql, function (err, result) {
        corsodilaurea = result[0].corsodilaurea;
        console.log(corsodilaurea);

        var sql1 = "SELECT Nome FROM `insegnamento` WHERE `corsodilaurea`='" + corsodilaurea + "'";
        db.query(sql1, function (err, result) {
            console.log(result);

            res.render('prenotazione.ejs', { data: result });
        });
    });
});

module.exports = router;