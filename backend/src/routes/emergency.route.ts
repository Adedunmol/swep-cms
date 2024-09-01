import { Router } from 'express';
import validateResource from '../middlewares/validate-resource';
import { createEmergencySchema, getEmergencySchema } from '../schema/emergency.schema';
import { createEmergencyController, getAllEmergenciesController, getEmergencyController, updateEmergencyController } from '../controllers/emergency.controller';
import { verifyRole } from '../middlewares/verify-role';

const router = Router()

router.route('/').post(validateResource(createEmergencySchema), createEmergencyController)
router.route('/').get(verifyRole(['doctor', 'staff']), getAllEmergenciesController)
router.route('/{id}').get(verifyRole(['doctor', 'staff']), validateResource(getEmergencySchema), getEmergencyController).patch(verifyRole(['doctor','staff']), updateEmergencyController)

export default router