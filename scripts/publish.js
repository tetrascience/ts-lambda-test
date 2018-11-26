const AWS = require('aws-sdk');
const program = require('commander');
const bluebird = require('bluebird');
const _ = require('lodash');

const sns = new AWS.SNS();
const TopicArn = 'arn:aws:sns:us-east-2:706717599419:CHUNFENG-TEST-development';

program
  .option('-m, --message [m]', 'message')
  .option('-c, --count [c]', 'number of messages', parseInt)
  .option('-v, --verbose')
  .parse(process.argv);

program.message =
  program.message || `group-${Math.floor(Math.random() * 10000)}`;
program.count = program.count || 1;

(async () => {
  const params = {
    TopicArn,
  };
  const arr = _.range(program.count);
  const results = await bluebird.map(arr, async n => {
    const Message = `${program.message} (${n})`;
    return await sns
      .publish({
        ...params,
        Message,
      })
      .promise();
  });
  console.log(results);
})();
