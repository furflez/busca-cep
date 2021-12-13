import { findAddressByZipcodeController } from '@usecases/FindAddressByZipcode';
import { Request, Router } from 'express';
import { header, param } from 'express-validator';
import { ValidateParams } from '@middlewares/ValidateParams';

const tokenizedRoutes = Router();

const validateParams = new ValidateParams();

tokenizedRoutes.get(
  '/address/:zipcode',
  header('token').isJWT().withMessage('header token must be a valid json web token'),
  param('zipcode')
    .isNumeric().withMessage('zipcode param must be only numbers')
    .isLength({ min: 8, max: 8 })
    .withMessage('zipcode param must have 8 numeric digits'),
  (request:Request, response, next) => validateParams.handle(request, response, next),
  (request, response) => findAddressByZipcodeController.handle(request, response),
);

tokenizedRoutes.get(
  '/healthcheck',
  (_request, response) => {
    response.status(200).json(
      {
        msg: 'Ok',
        uptime: process.uptime(),
        startedAt: new Date(Date.now() - process.uptime() * 1000),
        date: new Date(),
      },
    );
  },
);

export { tokenizedRoutes };
