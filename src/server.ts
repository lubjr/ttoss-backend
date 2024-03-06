import express from 'express'
import router from '../routes/routersdynamo'

const app = express()

app.use(express.json())
app.use(router)

app.get('/', async () => {
  return { hello: 'world' }
})

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
