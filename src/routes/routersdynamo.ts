import express from 'express'
import AWS from 'aws-sdk'
import { awsConfig } from '../config/credentials'

const dynamoRouter = express.Router()
const table = 'Videos'
AWS.config.update(awsConfig)
const dynamodb = new AWS.DynamoDB.DocumentClient()

// All list
dynamoRouter.get('/videos/list', async (req, res) => {
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

// Adding a new video
dynamoRouter.post('/videos/add', async (req, res) => {
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

// dynamoRouter.delete (update)
dynamoRouter.post('/videos/delete', async (req, res) => {
  const { pk, sk } = req.query
  const params = {
    TableName: table,
    Key: {
      pk,
      sk,
    },
  }
  try {
    await dynamodb.delete(params).promise()
    res.status(200).send({ message: 'Video has been deleted' })
  } catch (err) {
    console.error('Error deleting videos:', err)
    res.status(500).send({ message: 'Error deleting video' })
  }
})

// dynamoRouter.put (update)
dynamoRouter.post('/videos/update', async (req, res) => {
  const { pk, sk, rating } = req.query
  const params = {
    TableName: table,
    Key: {
      pk,
      sk,
    },
    UpdateExpression: 'set rating = :rating',
    ExpressionAttributeValues: {
      ':rating': rating,
    },
    ReturnValues: 'UPDATED_NEW',
  }

  try {
    const data = await dynamodb.update(params).promise()
    res.status(200).send(data)
  } catch (err) {
    console.error('Error updating videos:', err)
    res.status(500).send({ message: 'Error updating video' })
  }
})

// Search by primary key
dynamoRouter.post('/videos/get', async (req, res) => {
  const { pk } = req.query
  try {
    const params = {
      TableName: table,
      FilterExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': pk,
      },
    }
    const data = await dynamodb.scan(params).promise()
    if (data && data.Items) {
      res.status(200).send(data.Items)
      return
    }
    res.status(500).send({ message: 'Error getting video' })
  } catch (err) {
    console.error('Error getting videos:', err)
    res.status(500).send({ message: 'Error getting video' })
  }
})

export default dynamoRouter
