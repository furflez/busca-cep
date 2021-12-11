import { Address } from '@entities/Address';
import { IAddressRepository } from '@repositories/IAddressRepository';
import { mockAddressesJson } from '../../mocks/mockAddresses.json';

export class MockAddressRepository implements IAddressRepository {
  private mockAddresses: Address[] = mockAddressesJson;

  async findAddressByZipcode(zipcode: string): Promise<Address> {
    const address = this.mockAddresses.find((tempAddress) => tempAddress.zipcode === zipcode);
    return address!;
  }
}
