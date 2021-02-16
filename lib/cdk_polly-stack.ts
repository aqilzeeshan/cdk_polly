import * as cdk from '@aws-cdk/core';
import lambda = require('@aws-cdk/aws-lambda');
import apigw = require('@aws-cdk/aws-apigatewayv2');
import integrations = require('@aws-cdk/aws-apigatewayv2-integrations');
import iam = require('@aws-cdk/aws-iam');

export class CdkPollyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda Function that takes in text and returns a polly voice synthesis
    const pollyLambda = new lambda.Function(this, 'PollyHandler', {
      code: lambda.Code.fromAsset('lambda-fns'),
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'polly.handler'
    });
    
    // https://docs.aws.amazon.com/polly/latest/dg/api-permissions-reference.html
    // https://docs.aws.amazon.com/translate/latest/dg/translate-api-permissions-ref.html
    const pollyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      resources: ['*'],
      actions: [
        "translate:TranslateText",
        "polly:SynthesizeSpeech"
      ],
    });
    pollyLambda.addToRolePolicy(pollyStatement);

    // defines an API Gateway Http API resource backed by our "pollyLambda" function.
    let api = new apigw.HttpApi(this, 'Endpoint', {
      corsPreflight: {
        allowHeaders: ['*'],
        allowMethods: [apigw.HttpMethod.GET, apigw.HttpMethod.HEAD, apigw.HttpMethod.OPTIONS, apigw.HttpMethod.POST],
        allowOrigins: ['*'],
        maxAge: cdk.Duration.days(10),
      },
      defaultIntegration: new integrations.LambdaProxyIntegration({
        handler: pollyLambda
      })
    });

   new cdk.CfnOutput(this, 'HTTP API Url', {
     value: api.url ?? 'Something went wrong with the deploy'
   });
  }
}
