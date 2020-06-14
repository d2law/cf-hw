var AWS = require('aws-sdk');

const auth_config = {
  secret: "super secret key",
  key: "secret key between client/server",
};

const aws_remote_config = {
  accessKeyId: 'AKIAZFI5NMVWMVFLEXUT',
  secretAccessKey: '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',
  region: 'us-east-2',
}

AWS.config.update(aws_remote_config);


module.exports = {auth_config, AWS};
