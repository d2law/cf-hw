var express = require('express');
var router = express.Router();
var config = require("./../config");

var docClient = new config.AWS.DynamoDB();

async function scanForResults() {
    try {
        var params = {
            TableName: "cfIncomeMessage",
        };
        return await docClient.scan(params).promise();
    } catch (error) {
        res.send("error getting records");
        console.error(error);
    }
}

///get all transaction from DB
router.get('/scan', async function (req, res) {
    var dbObj = await scanForResults();
    var items = [];
    for (var item of dbObj.Items) {
        items.push(config.AWS.DynamoDB.Converter.unmarshall(item));
    }

    res.json(items);
});


module.exports = router;