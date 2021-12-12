import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export class ValidateParams {
  private validationResult = validationResult;

  constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    const errors = this.validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    next();
  }
}
