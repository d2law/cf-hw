const axios = require('axios');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 10000 good messages
for (var i  = 0 ; i < 1000 ; i++){
    var insertBody = new FormData();
    var userId = getRandomInt(1234500, 12345600)
    , rate, currencyFrom, currencyTo, amountBuy, amountSell, timePlaced, originatingCountry, messageId
    insertBody.append('userId', '');
    insertBody.append('valid', 1);
    insertBody.append('count', 100);

    var res = await axios.post('http://localhost:8000/api/insertData', insertBody, token)
}

// 50 bad messages
for (var i  = 0 ; i < 1000 ; i++){

}