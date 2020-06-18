const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    var count = 0;
    for (const item of event.Records) {
        console.log("number event =>" + count + " start");
        // TODO - Add validations
        // TODO - Add more business logic
        var input = (({ currencyFrom, currencyTo, amountSell, amountBuy }) => (
            { currencyFrom, currencyTo, amountSell, amountBuy }))(JSON.parse(item.body));

        var [result1, result2, result3] = await Promise.all([saveItem(item),
        saveFXs({
            currency: input.currencyFrom,
            amount: parseFloat(input.amountSell.replace(",", "."))
        }), saveFXs({
            currency: input.currencyTo,
            amount: - parseFloat(input.amountBuy.replace(",", "."))
        })]);



        console.log("number event =>" + count + " end");
        count++;
    }
    //callback(null, [result1, result2, result3]);
    //callback(null, result1);

    return `Successfully processed ${event.Records.length} messages.`;
};

function saveItem(item) {
    return new Promise(resolve => {

        var inputBody = new Object();

        inputBody.messageId = item.messageId;
        inputBody.SentTimestamp = parseInt(item.attributes.SentTimestamp);

        var msgAttr = item.messageAttributes
        var ipAddressObj = msgAttr.ipAddress ? msgAttr.ipAddress : { "stringValue": "0.0.0.0" };

        inputBody.ipAddress = ipAddressObj.stringValue;
        inputBody = { ...inputBody, ...JSON.parse(item.body) };

        var params = {
            TableName: 'cfIncomeMessage',
            Item: inputBody
        };

        var dbPromise = ddb.put(params).promise();
        dbPromise.then(function (data) {
            console.log("data insert successful");
            resolve(data);
        });

    });
}
function saveFXs(item) {
    return new Promise(resolve => {
        var params = {
            TableName: 'fxAmt',
            Key: {
                "currency": item.currency
            },
            UpdateExpression: "set currentAmt =  currentAmt + :num",
            ExpressionAttributeValues: {
                ":num": item.amount
            },
        };

        var dbPromise = ddb.update(params).promise();
        dbPromise.then(function (data) {
            console.log("fx update successful");
            resolve(data);
        });

    });

}
