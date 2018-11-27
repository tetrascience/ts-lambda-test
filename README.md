# ts-lambda-test

This repo tests the concurrency and dead letter queue of lambda
function. There are 4 test branches.

## Test Branches

### sns-sqs-lambda

In this branch, messages are published to a SNS topic, which is
subscribed by a SQS. And lambda listens on the SQS. We set the
`reservedConcurrency` to 1, `maxReceiveCount` of the SQS to 3, and
send 20 messages to the SNS. However, only 3 lambda execution are
succeed.

Although this link
(https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#throttling-behavior)
says SQS is a poll-based event sources that are not stream-based, it
seems to be a non-stream-based event sources that is invoked
synchronously based on the test result.

### sns-lambda

When we get rid of the sqs, all messages can be processed
successfully.

### sns-lambda-timeout-dlq

In this branch, we set up a dead letter queue for failed lambda
executions. And we timed out all the executions. All messages are sent
to the dlq.

### sns-lambda-timeout-error-dlq

In this branch, half of the executions are timed out and the rest of
them throw errors. All messages are sent to the dlq.

## *Notes*

* Since serverless dosen't support "DLQ with SQS"
  (https://serverless.com/framework/docs/providers/aws/guide/functions#dlq-with-sqs).
  "DLQ with SNS" is used here.
* Lambda funcstion will retry twice before send messages to dlq. Here
  is the link to the doc:
  https://docs.aws.amazon.com/lambda/latest/dg/retries-on-errors.html
* When the lambda function is throttled, it's hard to figure out how
  many executions are delayed. The only way I found is to enable
  "active tracing", but this feature is not support by cloudformation
  yet.
