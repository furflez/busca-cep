import { User } from '@entities/User';
import { ITokenRepository } from '@repositories/ITokenRepository';
import { mockUsers } from '@mocks/mockUser.json';
import { sign, verify } from 'jsonwebtoken';

export class MockTokenRepository implements ITokenRepository {
  private mockUsers: User[] = mockUsers;

  private signToken = sign;

  private verifyToken = verify;

  async generateToken(userId: string): Promise<string> {
    return this.signToken({ id: userId }, process.env.TOKEN_SECRET || 'testSecretKey', { expiresIn: '1h' });
  }

  async validateToken(token: string): Promise<Boolean> {
    const tokenDecoded = this.verifyToken(token, process.env.TOKEN_SECRET || 'testSecretKey');
    if (tokenDecoded) {
      return true;
    }
    return false;
  }
}
