import { Address } from '@entities/Address';
import { MockAddressRepository } from '@repositories/implementation/MockAddressRepository';
import { FindAddressByZipcodeController } from '@usecases/FindAddressByZipcode/FindAddressByZipcodeController';
import { ResponseError } from '../../errors/ResponseError';
import { FindAddressByZipcodeUseCase } from './FindAddressByZipcodeUseCase';

describe('FindAddressByZipcode test functions', () => {
  const mockAddressRepository = new MockAddressRepository();
  const findAddressByZipcodeUseCase = new FindAddressByZipcodeUseCase(mockAddressRepository);

  it('Should return a valid address object', async () => {
    const zipcode = '88501440';

    expect(await findAddressByZipcodeUseCase.execute({ zipcode })).toStrictEqual(
      {
        zipcode: '88501440',
        street: 'Rua bola 1',
        neighborhood: 'Centro',
        city: 'Lages',
        state: 'Santa Catarina',
      },
    );
  });

  it('Should return Invalid zipcode', async () => {
    const zipcode = '11111222';
    const expectedError = new ResponseError('Invalid zipcode.');
    let thrownError;
    try {
      await findAddressByZipcodeUseCase.execute({ zipcode });
    } catch (error) {
      thrownError = error;
    }
    expect(thrownError).toEqual(expectedError);
  });

  it('Should return "Rua bola 3" in street field', async () => {
    const zipcode = '88599999';
    const address = await findAddressByZipcodeUseCase.execute({ zipcode });
    expect(address).toHaveProperty('street', 'Rua bola 3');
  });
});
