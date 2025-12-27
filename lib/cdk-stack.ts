import { Duration, Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib/core';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, OutputFormat } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

        // Create log group for the lambda function
        const bundLambdaLogGroup = new logs.LogGroup(this, 'BundLambdaLogGroup', {
          logGroupName: `/aws/lambda/${"bund"}`,
          retention: logs.RetentionDays.ONE_WEEK,
          removalPolicy: RemovalPolicy.DESTROY,
        });

    // Create the bund lambda function using NodejsFunction with esbuild
    const bundLambda = new NodejsFunction(this, 'BundLambda', {
      entry: 'src/lambdas/bund/index.ts',
      handler: 'handler',
      functionName: 'esbuildTest',
      memorySize: 2048,
      runtime: lambda.Runtime.NODEJS_22_X,
      logGroup: bundLambdaLogGroup,
      bundling: {
        format: OutputFormat.ESM,
        minify: true
      }
    });


  }
}
