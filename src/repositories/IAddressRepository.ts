/* eslint-disable no-unused-vars */

import { Address } from '@entities/Address';

export interface IAddressRepository {
  findAddressByZipcode(zipcode: string): Promise<Address>;
}
