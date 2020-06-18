var AWS = require('aws-sdk');

const auth_config = {
  secret: "super secret key",
  key: "secret key between client/server",
};

const aws_remote_config = {
  accessKeyId: 'AKIAZFI5NMVWJSZWXPCY',
  secretAccessKey: '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',
  region: 'us-east-2',
}

AWS.config.update(aws_remote_config);


module.exports = {auth_config, AWS};
