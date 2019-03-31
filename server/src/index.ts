import { ChatServer } from './chatServer'

process.env.PORT = process.argv[2]

const chatServer = new ChatServer()
const app = chatServer.getApp()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/history', (req, res) => {
  const history = chatServer.getHistory()
  res.json(history)
})

export { app }
