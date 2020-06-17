var express = require('express');
var router = express.Router();
var config = require("./../config");

// apply rules on message body check,only check if empty body and missing ID at the momnet
function validator(body) {
    var errMsg  = '';
    if (Object.keys(body).length == 0) {
        errMsg = "empty input";
    } else if (!body.userId) {
        errMsg = "userId is missing";
    }
    return errMsg ;
} ;

router.post('/sendMessage', function (req, res) {

    const body = req.body;
    // Create an SQS service object
    var sqs = new config.AWS.SQS();

    var errMsg = validator(body) ;
    var params = {
        MessageAttributes : {
            "ipAddress": {
                DataType: "String",
                StringValue: req.ip
            }
        }
    };

    if (errMsg != '') {
        params.QueueUrl = "https://sqs.us-east-2.amazonaws.com/629811275116/badMessagePipe";
        params.MessageAttributes.error = {
            DataType: "String",
            StringValue: errMsg
        };
    } else {
        params.QueueUrl = "https://sqs.us-east-2.amazonaws.com/629811275116/messagePipe";
    }

    params.MessageBody = JSON.stringify(body);

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            res.json({error: err});
        } else if (errMsg != '') {
            res.json({error: errMsg + ' ' + data.MessageId});
        } else {
            res.json({ message: "Message sent successful " + data.MessageId });
            console.log("Message sent successful " + data.MessageId );
        }
    });
});

module.exports = router;