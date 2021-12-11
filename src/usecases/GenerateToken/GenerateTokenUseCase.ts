import { ITokenRepository } from '@repositories/ITokenRepository';
import { IGenerateTokenDTO } from './IGenerateTokenDTO';

export class GenerateTokenUseCase {
  constructor(private tokenRepository:ITokenRepository) {

  }

  async execute(user: IGenerateTokenDTO):Promise<string> {
    return this.tokenRepository.generateToken(user.id);
  }
}
