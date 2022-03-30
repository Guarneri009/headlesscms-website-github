import { Duration, Stack, StackProps } from 'aws-cdk-lib'
// import * as sns from 'aws-cdk-lib/aws-sns';
// import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import { Construct } from 'constructs'

export class HeadlesscmsWebStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const projectName = 'headless-cms2'
    const Stage = 'dev'
    const distFolder = '../src/system/dist'
    const version = 'v1'
    const indexPage = 'index.html'
    const responsePagePath = `/${version}/${indexPage}`

    const bucket = new s3.Bucket(this, `${projectName}-website-bucket`, {
      bucketName: `${projectName}-website2-${Stage}-${this.account}`,
      versioned: false,
    })

    const oia = new cloudfront.OriginAccessIdentity(
      this,
      `${projectName}-CFOAC-${Stage}`,
      {
        comment: `${projectName}-web-CFOAC-${Stage}`,
      }
    )
    bucket.grantRead(oia)

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      `${projectName}-distribution`,
      {
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
              originAccessIdentity: oia,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
              },
              {
                pathPattern: `/${version}/*`,
                maxTtl: Duration.seconds(0),
                minTtl: Duration.seconds(0),
                defaultTtl: Duration.seconds(0),
              },
            ],
          },
        ],
        errorConfigurations: [
          {
            errorCode: 400,
            errorCachingMinTtl: 10,
            responseCode: 200,
            responsePagePath: responsePagePath,
          },
          {
            errorCode: 403,
            errorCachingMinTtl: 10,
            responseCode: 200,
            responsePagePath: responsePagePath,
          },
          {
            errorCode: 404,
            errorCachingMinTtl: 10,
            responseCode: 200,
            responsePagePath: responsePagePath,
          },
        ],
      }
    )

    new s3deploy.BucketDeployment(this, `${projectName}-s3deployment`, {
      sources: [s3deploy.Source.asset(distFolder)],
      destinationBucket: bucket,
      distribution,
      destinationKeyPrefix: 'v1', // 先頭に`/`を付けると空の名前の親フォルダがS3にできるので、設定しないように注意してください。
      distributionPaths: [`/${version}/*`],
    })
  }
}
