var express = require("express");
var router = express.Router();
var logging = require("../models/logging");

router.get("/", function (req, res) {
    res.render('index', { message: '', userId: req.session.userId });
});

module.exports = router;