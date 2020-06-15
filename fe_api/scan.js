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

    var items = dbObj.Items;
    var resultObj = items.map(({ userId, rate, currencyFrom, currencyTo, amountBuy, amountSell, timePlaced, originatingCountry, messageId, ipAddress }) =>
        ({ userId, rate, currencyFrom, currencyTo, amountBuy, amountSell, timePlaced, originatingCountry, messageId, ipAddress }));

    res.json(resultObj);
});


module.exports = router;