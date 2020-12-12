var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    var message = '';
    res.render('index', { message: message });
});

module.exports = router;