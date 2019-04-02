import express from 'express'
import { createServer, Server } from 'http'
import socketIo, { Socket } from 'socket.io'

import { Message, MessageData, ServerInfo, UserData, User } from './model'
import { ServersListener } from './serversListener'
import { ChatHistory } from './chatHistory'
import Hash from './model/common/hash'
import MessageAction from './model/messageAction'

export class ChatServer {
  public static readonly DEFAULT_PORT: number = 4000

  private app: express.Application
  private server: Server
  private io: SocketIO.Server
  private serversListener: ServersListener
  private serverInfo: ServerInfo
  private chatHistory: ChatHistory
  private onlineUsers: Hash<UserData> = {}

  constructor() {
    this.config()

    this.app = express()
    this.server = createServer(this.app)
    this.io = socketIo(this.server)

    this.chatHistory = new ChatHistory()
    this.serversListener = new ServersListener(
      this.serverInfo,
      this.chatHistory,
      this.broadcastMessage
    )

    this.serversListener.listen()
    this.listen()
  }

  public getHistory(): Message[] {
    return this.chatHistory.getHistory()
  }

  public getApp(): express.Application {
    return this.app
  }

  private config(): void {
    const port = parseInt(process.env.PORT) || ChatServer.DEFAULT_PORT
    this.serverInfo = new ServerInfo('http://localhost', port)
  }

  private listen(): void {
    this.server.listen(this.serverInfo.port, () => {
      console.log('Running server on port %s', this.serverInfo.port)
    })

    const serverSocket = this.io.of('server')
    const clientSocket = this.io.of('client')

    clientSocket.on('connect', (socket: Socket) => {
      console.log('Connected client: %s', socket.id)

      socket.on('message', (data: MessageData) => {
        console.log(`Message sent: {id: ${data.id}, from: ${data.user.name}}`)
        this.onlineUsers[socket.id] = data.user
        this.chatHistory.add(Message.fromData(data))

        socket.broadcast.emit('message', data)
        serverSocket.emit('message', data)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected: %s', socket.id)

        const leftUser = this.onlineUsers[socket.id]
        delete this.onlineUsers[socket.id]

        const msg = new Message(
          User.fromData(leftUser),
          null,
          Date.now(),
          MessageAction.LEFT
        )

        this.chatHistory.add(msg)
        clientSocket.emit('message', msg)
        serverSocket.emit('message', msg)
      })
    })

    serverSocket.on('connect', (socket: Socket) => {
      console.log(`Connected server. Sending history...`)
      socket.emit('history', this.chatHistory.getHistory())
    })

    serverSocket.on('disconnect', () => {
      console.log('Server disconnected')
    })
  }

  private broadcastMessage = (data: MessageData): void => {
    this.io.of('client').emit('message', data)
  }
}
