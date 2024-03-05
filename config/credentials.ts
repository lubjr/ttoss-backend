export interface AwsConfig {
  region: string
  endpoint: string
  accessKeyId: string
  secretAccessKey: string
}

export const awsConfig: AwsConfig = {
  region: 'us-east-1',
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
  accessKeyId: 'AKIAWGFPMNYCB7M6FEWF',
  secretAccessKey: '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',
}
