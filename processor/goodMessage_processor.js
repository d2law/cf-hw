const AWS = require('aws-sdk');
console.log('Loading function');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    for (const item of event.Records) {
        // TODO - Add validations
        // TODO - Add more business logic
        var input = (({ currencyFrom, currencyTo, amountSell, amountBuy }) => (
            { currencyFrom, currencyTo, amountSell, amountBuy }))(JSON.parse(item.body));

        var result = await Promise.all([saveItem(item),
        saveFXs({
            currency: input.currencyFrom,
            amount: parseFloat(input.amountSell.replace(",", "."))
        }), saveFXs({
            currency: input.currencyTo,
            amount: - parseFloat(input.amountSell.replace(",", "."))
        })]);

        callback(null, result);
    }

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

        ddb.put(params, function (err, data) {
            if (err) {
                console.log(err);
                return err;
            }
            else {
                return data;
            }
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

        ddb.update(params, function (err, data) {
            if (err) console.log(err);
            else console.log(data);
        });
    });

}
