var express = require("express");
var router = express.Router();
var logging = require("../models/logging");

router.get("/", function (req, res) {
    var message = '';
    res.render('index', { message: message });
});

module.exports = router;