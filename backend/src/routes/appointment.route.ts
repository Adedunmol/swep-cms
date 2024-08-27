import { Router } from 'express';
import validateResource from '../middlewares/validate-resource';
import { createAppointmentSchema, getAppointmentSchema } from '../schema/appointment.schema';
import { createAppointmentController, getAllAppointmentsController, getAppointmentController } from '../controllers/appointment.controller';

const router = Router()

router.route('/').post(validateResource(createAppointmentSchema), createAppointmentController)
router.route('/').get(getAppointmentController)
router.route('/{id}').get(validateResource(getAppointmentSchema), getAllAppointmentsController)

export default router