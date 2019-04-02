import UserData from './userData'

export class User implements UserData {
  constructor(public name: string) {}

  public static fromData(data: UserData): User {
    return new User(data.name)
  }
}
