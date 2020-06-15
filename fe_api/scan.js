var express = require('express');
var router = express.Router();
var config = require("./../config");

var docClient = new config.AWS.DynamoDB();

async function scanForResults(){
    try {
        var params = {
            TableName: "cfIncomeMessage",
        };
        return  await docClient.scan(params).promise();
    } catch (error) {
        res.send("error getting records");
        console.error(error);
    }
}


router.get('/scan', async function (req, res) {
    var dbObj = await scanForResults();
    
    var items = dbObj.Items;

    var resultObj = [];
    for ( var item in items) {
        
    }

    res.json(retVal);
});


module.exports = router;