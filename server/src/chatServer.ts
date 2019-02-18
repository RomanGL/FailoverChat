import express from 'express'
import { createServer, Server } from 'http'
import socketIo, { Socket } from 'socket.io'

import { Message } from './model'

export class ChatServer {
  public static readonly PORT: number = 3000

  private app: express.Application
  private server: Server
  private io: SocketIO.Server
  private port: string | number

  constructor() {
    this.config()

    this.app = express()
    this.server = createServer(this.app)
    this.io = socketIo(this.server)

    this.listen()
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port)
    })

    this.io.on('connect', (socket: Socket) => {
      console.log('Connected client on port %s', this.port)

      socket.on('message', (m: Message) => {
        console.log('[server](message): %s', JSON.stringify(m))
        this.io.emit('message', m)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  }

  public getApp(): express.Application {
    return this.app
  }
}
