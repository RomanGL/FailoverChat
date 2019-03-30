import express from 'express'
import { createServer, Server } from 'http'
import socketIo, { Socket } from 'socket.io'

import { Message, ServerInfo } from './model'
import { ServersListener } from './serversListener'
import { ChatHistory } from './chatHistory'

export class ChatServer {
  public static readonly DEFAULT_PORT: number = 4000

  private app: express.Application
  private server: Server
  private io: SocketIO.Server
  private serversListener: ServersListener
  private serverInfo: ServerInfo
  private chatHistory: ChatHistory

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

    this.io.on('connect', (socket: Socket) => {
      console.log('Connected client on port %s', this.serverInfo.port)

      socket.on('message', (m: Message) => {
        this.chatHistory.add(m)
        console.log('[server](message): %s', JSON.stringify(m))

        socket.broadcast.emit('message', m)
        serverSocket.emit('message', m)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })

    serverSocket.on('connect', (socket: Socket) => {
      console.log(`Server connected to the instance`)
    })
  }

  private broadcastMessage = (m: Message): void => {
    this.io.emit('message', m)
  }
}
