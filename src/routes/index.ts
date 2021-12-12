import { findAddressByZipcodeController } from '@usecases/FindAddressByZipcode';
import { generateTokenController } from '@usecases/GenerateToken';
import { body, header, param } from 'express-validator';
import { Router, Request } from 'express';
import { ValidateParams } from '../middlewares/ValidateParams';

const router = Router();

const validateParams = new ValidateParams();

router.get(
  '/address/:zipcode',
  header('token').isJWT().withMessage('header token must be a valid json web token'),
  param('zipcode')
    .isNumeric().withMessage('zipcode param must be only numbers')
    .isLength({ min: 8, max: 8 })
    .withMessage('zipcode param must have 8 digits long'),
  (request:Request, response, next) => validateParams.handle(request, response, next),
  (request, response) => findAddressByZipcodeController.handle(request, response),
);

router.post(
  '/authentication',
  body('email').isEmail().withMessage('email field must be a valid e-mail'),
  body('password').isLength({ min: 5 }).withMessage('password field must have at least 5 digits'),
  (request:Request, response, next) => validateParams.handle(request, response, next),
  (request, response) => generateTokenController.handle(request, response),
);

export { router };
