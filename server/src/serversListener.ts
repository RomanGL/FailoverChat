import { Message, MessageData, ServerInfo } from './model'
import { ChatHistory } from './chatHistory'
import socketIoClient from 'socket.io-client'

export type NewMessageCallback = (m: MessageData) => void

export class ServersListener {
  private static readonly SERVERS: ServerInfo[] = [
    new ServerInfo('http://localhost', 4000),
    new ServerInfo('http://localhost', 4001),
    new ServerInfo('http://localhost', 4002),
  ]

  constructor(
    private readonly currentServer: ServerInfo,
    private readonly chatHistory: ChatHistory,
    private readonly onNewMessage: NewMessageCallback
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

    socket.on('message', (data: MessageData) => {
      console.log(
        `${serverUrl}: Message sent: {id: ${data.id}, from: ${data.user.name}}`
      )

      this.chatHistory.add(Message.fromData(data))
      this.onNewMessage(data)
    })

    socket.on('history', (historyData: MessageData[]) => {
      console.log(
        `${serverUrl} sent history: ${historyData.length} messages received`
      )

      this.chatHistory.mergeHistory(
        historyData.map(data => Message.fromData(data))
      )
    })
  }
}
