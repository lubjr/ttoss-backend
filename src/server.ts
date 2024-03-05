import express from 'express'
import AWS from 'aws-sdk'
import { awsConfig } from '../config/credentials'

const app = express()

const table = 'Videos'
AWS.config.update(awsConfig)
const dynamodb = new AWS.DynamoDB.DocumentClient()

app.get('/', async () => {
  return { hello: 'world' }
})

app.post('/videos', async (req, res) => {
  const { pk, sk, url } = req.query
  const params = {
    TableName: table,
    Item: {
      pk,
      sk,
      url,
    },
  }
  try {
    await dynamodb.put(params).promise()
    res.status(200).send('Video added')
  } catch (err) {
    res.status(400).send('Error adding video')
  }
})

app.get('/videos', async (req, res) => {
  try {
    const params = {
      TableName: table,
    }
    const data = await dynamodb.scan(params).promise()
    res.status(200).send(data.Items)
  } catch (err) {
    console.error('Error retrieving videos:', err)
    res.status(500).send('Error retrieving videos')
  }
})

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
