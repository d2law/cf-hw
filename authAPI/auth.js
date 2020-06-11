var express = require("express");
var router = express.Router();
var config = require("./../config");
const jwt = require('jsonwebtoken');

router.post('/auth', function (req, res) {
    if (req.body.key == config.key) {
        var payload = {
            key: req.body.key
        };
        var token = jwt.sign(payload, config.secret, { expiresIn: 1000 });
        res.send({ token });
    } else {
        res.status(401).send({
            success: false,
            message: "Authentication failed."
        });
    }
});

router.use(function (req, res, next) {
    if (req.headers["authorization"]) {
        
        var token = req.headers["authorization"].replace("Bearer ", "");

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Failed to authenticate token."
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: "No token provided."
        });
    }
});

module.exports = router;