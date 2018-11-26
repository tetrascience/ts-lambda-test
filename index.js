const bluebird = require('bluebird');
const _ = require('lodash');

module.exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event, null, 2));
  const message = _.get(event, ['Records', 0, 'body']);
  console.log(message);
  await bluebird.delay(55 * 1000);
  console.log(message, 'done');
  return event;
};
