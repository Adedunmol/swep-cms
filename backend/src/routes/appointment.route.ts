import { Router } from 'express';
import validateResource from '../middlewares/validate-resource';
import { createAppointmentSchema, getAppointmentSchema } from '../schema/appointment.schema';
import { createAppointmentController, getAllAppointmentsController, getAppointmentController } from '../controllers/appointment.controller';
import { verifyRole } from '../middlewares/verify-role';

const router = Router()

router.route('/').post(validateResource(createAppointmentSchema), createAppointmentController)
router.route('/').get(verifyRole(['doctor', 'staff']), getAllAppointmentsController)
router.route('/:id').get(verifyRole(['doctor', 'staff']), validateResource(getAppointmentSchema), getAppointmentController)

export default router