export class Address {
  public street: string;

  public neighborhood: string;

  public city: string;

  public state: string;

  constructor(properties: Address) {
    Object.assign(this, properties);
  }
}
