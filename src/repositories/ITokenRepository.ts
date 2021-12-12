import { User } from '@entities/User';
/* eslint-disable no-unused-vars */

export interface ITokenRepository {
  generateToken(userId:string): Promise<string>;

  validateToken(token:string): Promise<Boolean>;
}
