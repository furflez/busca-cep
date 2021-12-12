import { MockTokenRepository } from '@repositories/implementation/MockTokenRepository';
import { TokenValidationController } from './TokenValidationController';
import { TokenValidationUseCase } from './TokenValidationUseCase';

const mockTokenRepository = new MockTokenRepository();
const tokenValidationUseCase = new TokenValidationUseCase(mockTokenRepository);
const tokenValidationController = new TokenValidationController(tokenValidationUseCase);

export { tokenValidationController };
