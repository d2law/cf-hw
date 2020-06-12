var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
var db = new AWS.DynamoDB();

router.get('/call1', function (req, res) {

   var userId = Math.random();
   var d = new Date();
   var n = d.toISOString();
   var params = {
    TableName: 'cf_income_raw',
    Item: {
      'userId' : {S: userId},
      'amountBuy': {
        "N": "999"
      },
      "amountSell": {
        "N": "1000"
      },
      "currencyFrom": {
        "S": "EUR"
      },
      "currencyTo": {
        "S": "GBP"
      },
      "originatingCountry": {
        "S": "FR"
      },
      "rate": {
        "N": "0.7471"
      },
      "timePlaced": {
        "S": n
      },
    }
  };
  
  // Call DynamoDB to add the item to the table
  db.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      res.send("return err");
    } else {
      console.log("Success", data);
      res.send("return success");
    }
  });
    


});

module.exports = router;