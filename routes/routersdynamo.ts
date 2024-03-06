import express from 'express'
import AWS from 'aws-sdk'
import { awsConfig } from '../config/credentials'

const router = express.Router()
const table = 'Videos'
AWS.config.update(awsConfig)
const dynamodb = new AWS.DynamoDB.DocumentClient()

router.post('/videos/add', async (req, res) => {
  const { pk, sk, title, url, src, rating } = req.query
  const params = {
    TableName: table,
    Item: {
      pk,
      sk,
      title,
      url,
      src,
      rating,
    },
  }
  try {
    await dynamodb.put(params).promise()
    res.status(200).send({ message: 'Video added successfully' })
  } catch (err) {
    res.status(400).send({ message: 'Error adding video' })
  }
})

router.get('/videos/list', async (req, res) => {
  try {
    const params = {
      TableName: table,
    }
    const data = await dynamodb.scan(params).promise()
    res.status(200).send(data.Items)
  } catch (err) {
    console.error('Error list videos:', err)
    res.status(500).send({ message: 'Error retrieving videos' })
  }
})

export default router
