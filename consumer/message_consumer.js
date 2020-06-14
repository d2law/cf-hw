var express = require('express');
var router = express.Router();
var config = require("./../config");

router.post('/sendMessage', function (req, res) {

    const body = req.body;
    var ip = req.ip;
    console.log(req);
    // Create an SQS service object
    var sqs = new config.AWS.SQS();

    var errMsg = '';
    var queueUrl;
    var params = {};
    if (Object.keys(body).length == 0) {
        errMsg = "empty input";
    } else if (!body.userId) {
        errMsg = "userId is missing";
    }

    if (errMsg != '') {
        params.QueueUrl = "https://sqs.us-east-2.amazonaws.com/629811275116/badMessagePipe";
        params.MessageAttributes = {
            "error": {
                DataType: "String",
                StringValue: errMsg
            }
        };
    } else {
        params.QueueUrl = "https://sqs.us-east-2.amazonaws.com/629811275116/messagePipe";
    }

    params.MessageBody = JSON.stringify(body);

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            errMsg += err;
        } else {
            if (errMsg != '') {
                errMsg += ' ' + data.MessageId;
            }
            console.log("Success", data.MessageId);
        }

        if (errMsg != '') {
            res.json({ error: errMsg });
        } else {
            res.json({ message: "Message sent successful " + data.MessageId });
        }
    });
});

module.exports = router;