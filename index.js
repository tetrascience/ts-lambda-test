const bluebird = require('bluebird');
const _ = require('lodash');

let index = 0;

module.exports.handler = async (event, context, callback) => {
  ++index;
  console.log(JSON.stringify(event, null, 2));
  // const message = _.get(event, ['Records', 0, 'body']); // sqs
  const message = _.get(event, ['Records', 0, 'Sns', 'Message']); // sns
  console.log(message);
  if (index % 2) {
    throw new Error('test');
  }
  await bluebird.delay(35 * 1000);
  console.log(message, 'done');
  return event;
};
