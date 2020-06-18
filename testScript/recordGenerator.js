const axios = require('axios');
var FormData = require('form-data');

const currencyList = ['USD', 'EUR', 'JPY', 'GBP', 'CHF', 'CAD', 'AUD', 'HKD'];
const countryList = ['US', 'UK', 'CN', 'HK', 'JP', 'AU', 'FR', 'CA', 'CH', 'NZ'];

const crossRate = [
    [1, 1.1262, 0.0093, 1.2585, 1.0527, 0.7366, 0.6888, 0.1290],
    [0.8879, 1, 0.0083, 1.1175, 0.9348, 0.6541, 0.6116, 0.1146],
    [107.3400, 120.8863, 1, 135.0874, 113.0014, 79.0718, 73.9358, 13.8501],
    [0.7946, 0.8949, 0.0074, 1, 0.8365, 0.5853, 0.5473, 0.1025],
    [0.9499, 1.0698, 0.0088, 1.1954, 1, 0.6997, 0.6543, 0.1226],
    [1.3575, 1.5288, 0.0127, 1.7084, 1.4291, 1, 0.9350, 0.1752],
    [1.4518, 1.6350, 0.0135, 1.8271, 1.5284, 1.0695, 1, 0.1873],
    [7.7501, 8.7282, 0.0722, 9.7535, 8.1589, 5.7091, 5.3383, 1]
];


function getRandom(min, max, digit = 0) {
    var expo = Math.pow(10, digit);
    min = Math.ceil(min * expo);
    max = Math.floor(max * expo);

    var ranVal = Math.floor(Math.random() * (max - min + 1)) + min;

    return (ranVal / expo);
}


// 10000 good messages
var msgCount = 0 ;
for (var i = 0; i < 100; i++) {
    var insertBody = new FormData();
    var userId = getRandom(1234500, 12345600);
    var cFrom = getRandom(0, 7);
    var cTo = getRandom(0, 7);

    var currencyFrom = currencyList[cFrom];
    var currencyTo = currencyList[cTo];

    var rate = crossRate[cFrom][cTo];
    var amountBuy = getRandom(100, 10000, 2);
    var amountSell = Math.round(amountBuy * rate *100) /100;
    var timePlaced = (new Date()).toISOString();
    var originatingCountry = countryList[getRandom(0, 9)];

    insertBody.append('userId', userId);
    insertBody.append('currencyFrom', currencyFrom);
    insertBody.append('currencyTo',currencyTo);
    insertBody.append('rate', rate);
    insertBody.append('amountBuy', amountBuy);
    insertBody.append('amountSell',amountSell);
    insertBody.append('timePlaced', timePlaced);
    insertBody.append('originatingCountry', originatingCountry);
    
    
     axios.post('http://ec2-18-188-218-222.us-east-2.compute.amazonaws.com:30000/api/sendMessage', insertBody, { headers: insertBody.getHeaders() }).
     
     then(function (response) {
         msgCount++;
         console.log("Message count => " + msgCount );
    },
    function (reason)  {
      console.log(reson);
    })
    .catch(error => {
        console.log(error.response)
    });
    
}
