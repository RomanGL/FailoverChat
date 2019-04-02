import { Message } from './model'

export class ChatHistory {
  public static readonly DEFAULT_THRESHOLD: number = 100
  private history: Message[] = []

  constructor(
    private readonly threshold: number = ChatHistory.DEFAULT_THRESHOLD
  ) {}

  public add(m: Message): void {
    this.history.push(m)
    this.truncateHistory()
  }

  public getHistory(): Message[] {
    return this.history
  }

  public mergeHistory(newHistory: Message[]): void {
    this.history = this.history
      .concat(newHistory)
      .filter((item, index, self) => {
        const i = self.findIndex(m => {
          return item.id === m.id
        })
        return index === i
      })
      .sort(ChatHistory.compareMessages)

    this.truncateHistory()
  }

  private truncateHistory(): void {
    if (this.history.length > this.threshold) {
      this.history = this.history.slice(this.history.length - this.threshold)
    }
  }

  private static compareMessages(a: Message, b: Message) {
    return a.compareTo(b)
  }
}
