import { Router } from 'express';
import validateResource from '../middlewares/validate-resource';
import { createAppointmentSchema, getAppointmentSchema } from '../schema/appointment.schema';

const router = Router()

router.route('/').post(validateResource(createAppointmentSchema))
router.route('/').get()
router.route('/{id}').get(validateResource(getAppointmentSchema))

export default router