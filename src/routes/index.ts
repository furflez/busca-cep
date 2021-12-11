import { findAddressByZipcodeController } from '@usecases/FindAddressByZipcode';
import { generateTokenController } from '@usecases/GenerateToken';
import { body, validationResult } from 'express-validator';
import { Router } from 'express';

const router = Router();

router.get('/address/:zipcode', (request, response) => findAddressByZipcodeController.handle(request, response));
router.post('/authentication', (request, response) => generateTokenController.handle(request, response));

export { router };
