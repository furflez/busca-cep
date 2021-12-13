import { Address } from '@entities/Address';
import { MockAddressRepository } from '@repositories/implementation/MockAddressRepository';
import { FindAddressByZipcodeController } from '@usecases/FindAddressByZipcode/FindAddressByZipcodeController';
import { ResponseError } from '../../errors/ResponseError';
import { FindAddressByZipcodeUseCase } from './FindAddressByZipcodeUseCase';

describe('FindAddressByZipcode', () => {
  const mockAddressRepository = new MockAddressRepository();
  const findAddressByZipcodeUseCase = new FindAddressByZipcodeUseCase(mockAddressRepository);

  it('should return a valid address object when passing a valid zipcode to FindAddressByZipcodeUseCase.execute()', async () => {
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

  it('should return Invalid zipcode when passing a invalid zipcode to FindAddressByZipcodeUseCase.execute()', async () => {
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

  it('should return Invalid zipcode with more than 8 digits in FindAddressByZipcodeUseCase.execute()', async () => {
    const zipcode = '11111222333222';
    const expectedError = new ResponseError('Invalid zipcode.');
    let thrownError;
    try {
      await findAddressByZipcodeUseCase.execute({ zipcode });
    } catch (error) {
      thrownError = error;
    }
    expect(thrownError).toEqual(expectedError);
  });

  it('should return "Rua bola 3" in street field when passing to FindAddressByZipcodeUseCase.execute() a not existing zipcode in mock addresses but exists an approximation', async () => {
    const zipcode = '88599999';
    const address = await findAddressByZipcodeUseCase.execute({ zipcode });
    expect(address).toHaveProperty('street', 'Rua bola 3');
  });
});
