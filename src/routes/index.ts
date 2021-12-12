import { generateTokenController } from '@usecases/GenerateToken';
import { body } from 'express-validator';
import { Router, Request } from 'express';
import { ValidateParams } from '@middlewares/ValidateParams';
import { tokenValidationController } from '@usecases/TokenValidation';
import { tokenizedRoutes } from './tokenizedRoutes';

const router = Router();

const validateParams = new ValidateParams();

router.post(
  '/authentication',
  body('email').isEmail().withMessage('email field must be a valid e-mail'),
  body('password').isLength({ min: 5 }).withMessage('password field must have at least 5 digits'),
  (request:Request, response, next) => validateParams.handle(request, response, next),
  (request, response) => generateTokenController.handle(request, response),
);

router.use('/', (request, response, next) => tokenValidationController.handle(request, response, next), tokenizedRoutes);

export { router };
