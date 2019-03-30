export class ServerInfo {
  constructor(public url: string, public port: number) {}

  public getUrl(): string {
    return `${this.url}:${this.port}/server`
  }

  public equalsTo(other: ServerInfo): boolean {
    return this.url === other.url && this.port === other.port
  }
}
