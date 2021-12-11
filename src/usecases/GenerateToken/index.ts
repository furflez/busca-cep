import { MockTokenRepository } from '@repositories/implementation/MockTokenRepository';
import { GenerateTokenUseCase } from './GenerateTokenUseCase';
import { GenerateTokenController } from './GenerateTokenController';

const mockTokenRepository = new MockTokenRepository();
const generateTokenUseCase = new GenerateTokenUseCase(mockTokenRepository);
const generateTokenController = new GenerateTokenController(generateTokenUseCase);

export { generateTokenController };
