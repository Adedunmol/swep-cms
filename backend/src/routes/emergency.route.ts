import { Router } from 'express';
import validateResource from '../middlewares/validate-resource';
import { createEmergencySchema, getEmergencySchema } from '../schema/emergency.schema';

const router = Router()

router.route('/').post(validateResource(createEmergencySchema))
router.route('/').get()
router.route('/{id}').get(validateResource(getEmergencySchema))

export default router