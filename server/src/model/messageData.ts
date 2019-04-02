import UserData from './userData'
import MessageAction from './messageAction'

export interface MessageData {
  user: UserData
  content: string
  action?: MessageAction
  id: number
}

export default MessageData
