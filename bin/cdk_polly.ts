#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkPollyStack } from '../lib/cdk_polly-stack';

const app = new cdk.App();
new CdkPollyStack(app, 'CdkPollyStack');
