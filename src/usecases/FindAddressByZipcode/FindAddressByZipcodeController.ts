import { Request, Response } from 'express';
import { FindAddressByZipcodeUseCase } from './FindAddressByZipcodeUseCase';

export class FindAddressByZipcodeController {
  constructor(private findAddressByZipcodeUseCase: FindAddressByZipcodeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { zipcode } = request.params;
    try {
      const address = await this.findAddressByZipcodeUseCase.execute({ zipcode });

      return response.status(200).json(address);
    } catch (error:any) {
      return response.status(400).json({
        message: error.msg || 'Unexpected error.',
      });
    }
  }
}
