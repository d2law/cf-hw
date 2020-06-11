var express = require('express');
var router = express.Router();

router.get('/sendMessage', function (req, res) {

    res.send("do nothing");

});

module.exports = router;