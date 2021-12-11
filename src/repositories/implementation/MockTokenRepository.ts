import { User } from '@entities/User';
import { ITokenRepository } from '@repositories/ITokenRepository';
import { sign } from 'jsonwebtoken';

export class MockTokenRepository implements ITokenRepository {
  private signToken = sign;

  async generateToken(userId: string): Promise<string> {
    return this.signToken({ id: userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  }
}
