export class Address {
  public zipcode: string;

  public street: string;

  public neighborhood: string;

  public city: string;

  public state: string;

  constructor(properties: Address) {
    Object.assign(this, properties);
  }
}
