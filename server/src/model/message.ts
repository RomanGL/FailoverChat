import { User } from './user'
import { Equatable } from './common/equatable'
import { Comparable } from './common/comparable'
import { MessageData } from './messageData'

export class Message
  implements MessageData, Equatable<Message>, Comparable<Message> {
  constructor(public user: User, public content: string, public id: number) {}

  public compareTo(other: Message): number {
    if (this.id === other.id) {
      return 0
    } else {
      return this.id > other.id ? 1 : -1
    }
  }

  public equals(other: Message): boolean {
    return this.id === other.id
  }

  public static fromData(data: MessageData): Message {
    return new Message(User.fromData(data.user), data.content, data.id)
  }
}
