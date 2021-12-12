import { User } from '@entities/User';
import { ITokenRepository } from '@repositories/ITokenRepository';
import { ITokenValidationDTO } from './ITokenValidationDTO';

export class TokenValidationUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(tokenDTO: ITokenValidationDTO): Promise<Boolean> {
    return this.tokenRepository.validateToken(tokenDTO.token);
  }
}
