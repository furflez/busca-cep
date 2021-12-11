import { v4 } from 'uuid';

export class User {
  public readonly id: string;

  public email: string;

  public password: string;

  constructor(proprieties: Omit<User, 'id'>, id?: string) {
    Object.assign(this, proprieties);

    if (!id) {
      this.id = v4();
    }
  }
}
