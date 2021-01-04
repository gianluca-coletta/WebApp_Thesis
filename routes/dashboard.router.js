var express = require("express");
var router = express.Router();
var logging = require("../models/logging");
var moment = require("moment");

//delete prenotazione
router.post("/delete", (req, res) => {
    if (!req.session.userId) res.redirect("/home/login");

    var idPrenotazione = req.body.idPrenotazione;
    var idInsegnamento = req.body.idInsegnamento;
    //logging.info("idPrenotazione"+idPrenotazione)

    var sql = `DELETE FROM prenotazione WHERE id = '${idPrenotazione}'`;
    db.query(sql, function (err, result) {

        return res.redirect(`/dashboard/reservation?id=${idInsegnamento}`);
    });
});

//save prenotazione
router.post("/save", async (req, res) => {

    // Posti contiene un array di numeri
    /**
     * Prende il numero del posto libero    
     * @param {number} posti Numero dei posti
     */
    function getFirstFreeSeat(posti) {
        var i = 1;

        for (let index = 0; index < posti.length; index++) {
            const e = posti[index];
            if (e !== i) {
                // i contiene il posto libero
                break;
            }
            i++;
        }

        return i;
    }

    /**
     * Check for free seats 
     * @param {string} idLezione Contiene l'id lezione
     */
    function hasFreeSeat(idLezione) {
        return new Promise((resolve, reject) => {
            var sql = `
                    select 
                            PostiTotali    
                    from aula a 
                        inner join lezione l
                            on l.IdAula = a.id
                        left join prenotazione p
                            on p.IdLezione = l.Id
                    where l.id = ${idLezione}
                  `
            db.query(sql, function (err, result) {
                if (err) reject(err);

                var postitotali = result[0].PostiTotali;
                var sql1 = `
                    select PostiAssegnati
                    from v_lezione_postiassegnati
                    where idLezione = ${idLezione}
                `
                db.query(sql1, function (err, result1) {
                    if (err) reject(err);

                    if (result1.length == 0) {
                        var postiOccupati = 0;
                    }
                    else {
                        var postiOccupati = result1[0].PostiAssegnati;
                    }
                    const freeSeat = postitotali - postiOccupati;
                    // logging.info(`freeSeat: ${freeSeat}`)
                    resolve(freeSeat > 0);
                });
            });
        });
    }

    if (!req.session.userId) res.redirect("/home/login");

    var matricola = req.body.matricola;
    var idLezione = req.body.idLezione;
    var idInsegnamento = req.body.idInsegnamento;

    // logging.info(`matricola ${matricola} idLezione ${idLezione} idInsegnamento ${idInsegnamento}`);

    // 
    if (await hasFreeSeat(idLezione)) {

        var sql = `SELECT NumPosto from prenotazione where idLezione = ${idLezione}`
        db.query(sql, function (err, result) {
            var posti = result.map(p => p.NumPosto)
            var seat = getFirstFreeSeat(posti);

            var sql1 = "INSERT INTO prenotazione (numposto, studente, idlezione) VALUES (?,?,?)";
            var values = [seat, matricola, idLezione];
            db.query(sql1, values, function (err, result1) {

                return res.redirect(`/dashboard/reservation?id=${idInsegnamento}`);
            });
        });

    } else {
        return res.redirect(`/dashboard/reservation?id=${idInsegnamento}`);
    }

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

    var sql = `
    SELECT 
        i.* 
    FROM 
        studente s 
        inner join insegnamento i 
            on s.corsodilaurea = i.CorsoDiLaurea 
    WHERE s.email = '${email}'
    `;

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
                ,p.Studente
                ,p.id as idPrenotazione
                ,p.NumPosto
                ,a.PostiAssegnati
                ,PostiTotali 
                ,PostiTotali - a.PostiAssegnati as PostiRimanenti
            FROM 
                lezione 
                inner join aula 
                    on lezione.idaula = aula.id 
                left join v_lezione_postiassegnati a
                    on lezione.Id = a.idlezione
                left join prenotazione p
                    on lezione.id = p.idLezione
                    and p.Studente = '${req.session.userId.matricola}'
			WHERE insegnamento = '${id}' 
            `;
            db.query(sql1, function (err, result2) {

                if (err) {
                    req.session.error_message = err;
                    return res.redirect("/error");
                }

                // Format date for dd-mm-yyyy
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