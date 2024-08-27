import { Router } from 'express';
import validateResource from '../middlewares/validate-resource';
import { createEmergencySchema, getEmergencySchema } from '../schema/emergency.schema';
import { createEmergencyController, getAllEmergenciesController, getEmergencyController } from '../controllers/emergency.controller';

const router = Router()

router.route('/').post(validateResource(createEmergencySchema), createEmergencyController)
router.route('/').get(getAllEmergenciesController)
router.route('/{id}').get(validateResource(getEmergencySchema), getEmergencyController)

export default router