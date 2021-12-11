import { findAddressByZipcodeController } from '@usecases/FindAddressByZipcode';
import { Router } from 'express';

const router = Router();

router.get('/address/:zipcode', (request, response) => findAddressByZipcodeController.handle(request, response));

export { router };
