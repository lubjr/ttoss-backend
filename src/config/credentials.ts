import { config } from 'dotenv'

config()

const acess = process.env.accessKeyId || ''
const secret = process.env.secretAccessKey || ''
const region = process.env.region || ''
const endpoint = process.env.endpoint || ''

export interface AwsConfig {
  region: string
  endpoint: string
  accessKeyId: string
  secretAccessKey: string
}

export const awsConfig: AwsConfig = {
  region,
  endpoint,
  accessKeyId: acess,
  secretAccessKey: secret,
}
