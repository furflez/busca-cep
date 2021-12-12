import { Request, Response } from 'express';
import { User } from '@entities/User';
import { GenerateTokenUseCase } from './GenerateTokenUseCase';

export class GenerateTokenController {
  constructor(private generateTokenUseCase: GenerateTokenUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user = new User({ email, password });

    try {
      const token = await this.generateTokenUseCase.execute(user);

      return response.status(200).json({ token });
    } catch (error: any) {
      return response.status(400).json({
        errors: [
          {
            msg: error.msg || 'Unexpected error.',
          },
        ],
      });
    }
  }
}
