var express = require('express');
var router = express.Router();

router.get('/call1', function (req, res) {

    res.send("return nothing 1");

});

module.exports = router;