var express = require('express');
var router = express.Router();
var config = require("./../config");

var docClient = new config.AWS.DynamoDB();

async function searchForResults(userId) {
    try {
        var params = {
            TableName: "cfIncomeMessage",
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': { 'S': userId }
            },
        };
        console.log(params);
        return await docClient.query(params).promise();
    } catch (error) {
        res.send("error getting records");
        console.error(error);
    }
}

///get all transaction from DB
router.get('/getUserTrans', async function (req, res) {

    if (!req.query.userId) {
        //empty input
        res.send("userId is missing");
        return;
    }
    var dbObj = await searchForResults(req.query.userId);

    var items = dbObj.Items;
    var resultObj = items.map(({ userId, rate, currencyFrom, currencyTo, amountBuy, amountSell, timePlaced, originatingCountry, messageId, ipAddress }) =>
        ({ userId, rate, currencyFrom, currencyTo, amountBuy, amountSell, timePlaced, originatingCountry, messageId, ipAddress }));

    res.json(resultObj);
});


module.exports = router;