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
    const serverUrl = server.getUrl() + '/server'
    const socket = socketIoClient(serverUrl)

    socket.on('connect', () => {
      console.log('Connected to server %s', serverUrl)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server %s', serverUrl)
    })

    socket.on('message', (m: Message) => {
      console.log(
        `${serverUrl}: Message sent: {id: ${m.id}, from: ${m.user.name}}`
      )

      this.chatHistory.add(m)
      this.onNewMessage(m)
    })

    socket.on('history', (history: Message[]) => {
      console.log(
        `${serverUrl} sent history: ${history.length} messages received`
      )
    })
  }
}
