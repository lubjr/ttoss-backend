import { config } from 'dotenv'

config()

const acess = process.env.accessKeyId || ''
const secret = process.env.secretAccessKey || ''

export interface AwsConfig {
  region: string
  endpoint: string
  accessKeyId: string
  secretAccessKey: string
}

export const awsConfig: AwsConfig = {
  region: 'us-east-1',
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
  accessKeyId: acess,
  secretAccessKey: secret,
}
