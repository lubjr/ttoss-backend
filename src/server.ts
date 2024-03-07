import express from 'express'
import router from '../routes/routersdynamo'

import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(router)

app.get('/', async (req, res) => {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)

  res.send({ hello: 'world' })
})

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
