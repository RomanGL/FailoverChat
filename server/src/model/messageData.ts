import UserData from './userData'

export interface MessageData {
  user: UserData
  content: string
  id: number
}

export default MessageData
