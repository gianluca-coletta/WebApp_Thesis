var express = require("express");
var router = express.Router();
var logging = require("../models/logging");

router.get("/", function (req, res) {
    // if (process.env.pippo == "DEV)
    // PowerShell -> $env:pippo="DEV"
    var t = new Date();
    // INSERT INTO (timestamp, code, errno)... values 
    // Data ora attuale
    // req.sessios.error_message.code
    // req.sessios.error_message.errNo

    logging.error(req.session.error_message);
    res.render('error', { 
        error_message: req.session.error_message, 
        userId: req.session.userId,
        env: process.env.APP_ENV
     });
});

module.exports = router;