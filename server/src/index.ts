import { ChatServer } from './chatServer'

process.env.PORT = process.argv[2]

const app = new ChatServer().getApp()
export { app }
