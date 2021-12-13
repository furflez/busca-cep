import { MockTokenRepository } from '@repositories/implementation/MockTokenRepository';
import { GenerateTokenUseCase } from './GenerateTokenUseCase';

describe('GenerateToken', () => {
  const mockTokenRepository = new MockTokenRepository();
  const generateTokenUseCase = new GenerateTokenUseCase(mockTokenRepository);

  it('Should generate a valid token when passing a valid user to GenerateTokenUseCase.execute()', async () => {
    expect(typeof (await generateTokenUseCase.execute({ id: '1111-2222-333' }))).toBe('string');
  });
});
