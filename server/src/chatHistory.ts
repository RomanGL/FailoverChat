import { Message } from './model'

export class ChatHistory {
  private history: Message[] = []

  constructor(private threshold: number = 20) {}

  public add(m: Message): void {
    this.history.push(m)
    this.truncateHistory()
  }

  public getHistory(): Message[] {
    return this.history
  }

  private truncateHistory(): void {
    if (this.history.length > this.threshold) {
      this.history = this.history.slice(this.history.length - this.threshold)
    }
  }
}
