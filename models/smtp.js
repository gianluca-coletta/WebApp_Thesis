var config = require("./smtp.json");

const send = require("gmail-send")({
    user: config.userName,
    pass: config.password,
});


function sendEMail(to, data) {
    send({
        to,
        subject: "Conferma prenotazione posto",
        text: `
            Ecco i dati e la conferma della tua prenotazione appena effettuata:

            insegnamento: ${data.insegnamento}, 
            aula: ${data.aula},
            sede dell'aula: ${data.sede},
            giorno: ${data.giorno}, 
            orario inizio: ${data.orario},
            numero posto: ${data.seat}.

        `,
    });
}
// ${}
module.exports = {
    sendEMail
}