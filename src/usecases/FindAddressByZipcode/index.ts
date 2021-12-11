import { FindAddressByZipcodeController } from '@usecases/FindAddressByZipcode/FindAddressByZipcodeController';
import { MockAddressRepository } from '@repositories/implementation/MockAddressRepository';
import { FindAddressByZipcodeUseCase } from './FindAddressByZipcodeUseCase';

const mockAddressRepository = new MockAddressRepository();

const findAddressByZipcodeUseCase = new FindAddressByZipcodeUseCase(mockAddressRepository);

const findAddressByZipcodeController = new FindAddressByZipcodeController(findAddressByZipcodeUseCase);

export { findAddressByZipcodeController };
