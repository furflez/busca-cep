import { Response } from 'express';
import { Address } from '@entities/Address';
import { IAddressRepository } from '@repositories/IAddressRepository';
import { ResponseError } from '../../errors/ResponseError';
import { IFindAddressByZipcodeDTO } from './IFindAddressByZipcodeDTO';

export class FindAddressByZipcodeUseCase {
  constructor(
        private addressRepository: IAddressRepository,
  ) { }

  async execute(addressDTO: IFindAddressByZipcodeDTO): Promise<Address> {
    const zipcode = addressDTO.zipcode.padEnd(8, '0');
    if (zipcode !== '00000000' && addressDTO.zipcode.length <= 8) {
      const address = await this.addressRepository.findAddressByZipcode(zipcode);
      if (address) return address;
      return this.execute({ zipcode: addressDTO.zipcode.substring(0, addressDTO.zipcode.length - 1) });
    }

    throw new ResponseError('Invalid zipcode.');
  }
}
