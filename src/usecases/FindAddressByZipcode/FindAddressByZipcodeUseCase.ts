import { Address } from '@entities/Address';
import { IAddressRepository } from '@repositories/IAddressRepository';
import { IFindAddressByZipcodeDTO } from './IFindAddressByZipcodeDTO';

export class FindAddressByZipcodeUseCase {
  constructor(
        private addressRepository: IAddressRepository,
  ) { }

  async execute(address: IFindAddressByZipcodeDTO): Promise<Address> {
    return this.addressRepository.findAddressByZipcode(address.zipcode);
  }
}
