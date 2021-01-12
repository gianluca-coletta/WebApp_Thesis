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
            Dati prenotazione :

            Insegnamento: ${data.insegnamento}, 
            Aula: ${data.aula},
            Sede dell'aula: ${data.sede},
            Giorno: ${data.giorno}, 
            Orario inizio: ${data.orario},
            Numero posto: ${data.seat}.

        `,
    });
}
// ${}
module.exports = {
    sendEMail
}