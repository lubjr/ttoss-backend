import express from 'express'
import dynamoRouter from './routes/routersdynamo'
import prismaRouter from './routes/routerprisma'
import cors from 'cors'

const app = express()

app.use(
  cors({
    origin: true,
  }),
)
app.use(express.json())
app.use(dynamoRouter)
app.use(prismaRouter)

app.get('/', async (req, res) => {
  res.send({ hello: 'world' })
})

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
