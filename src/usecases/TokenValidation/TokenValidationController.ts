import { Request, Response, NextFunction } from 'express';
import { TokenValidationUseCase } from './TokenValidationUseCase';

export class TokenValidationController {
  constructor(private tokenValidationUseCase: TokenValidationUseCase) { }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { token } = request.headers;
    try {
      if (typeof token === 'string') {
        const valid = await this.tokenValidationUseCase.execute({ token });
        if (valid) {
          return next();
        }
      }

      return response.status(401).json(
        {
          errors: [
            {
              msg: 'not authorized',
            },
          ],
        },
      );
    } catch (error:any) {
      return response.status(401).json(
        {
          errors: [
            {
              msg: error.message || 'Unexpected error.',
            },
          ],
        },
      );
    }
  }
}
