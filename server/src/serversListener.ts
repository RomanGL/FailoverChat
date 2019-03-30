import { Message, ServerInfo } from './model'
import { ChatHistory } from './chatHistory'
import { Socket } from 'socket.io'
import socketIoClient from 'socket.io-client'

export type NewMessageCallback = (m: Message) => void

export class ServersListener {
  private static readonly SERVERS: ServerInfo[] = [
    new ServerInfo('http://localhost', 4000),
    new ServerInfo('http://localhost', 4001),
    new ServerInfo('http://localhost', 4002),
  ]

  constructor(
    private currentServer: ServerInfo,
    private chatHistory: ChatHistory,
    private onNewMessage: NewMessageCallback
  ) {}

  public listen(): void {
    ServersListener.SERVERS.filter(
      s => !s.equalsTo(this.currentServer)
    ).forEach(s => this.connect.call(this, s))
  }

  private connect(server: ServerInfo): void {
    const socket = socketIoClient(server.getUrl())

    socket.on('connect', () => {
      console.log('Connected to server %s', server.getUrl())
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server %s', server.getUrl())
    })

    socket.on('message', (m: Message) => {
      console.log(`${server.getUrl()}: ${JSON.stringify(m)}`)
      this.chatHistory.add(m)
      this.onNewMessage(m)
    })
  }
}
