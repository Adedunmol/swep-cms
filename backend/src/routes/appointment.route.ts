import { Router } from 'express';
import validateResource from '../middlewares/validate-resource';
import { createAppointmentSchema, getAppointmentSchema } from '../schema/appointment.schema';
import { createAppointmentController, getAllAppointmentsController, getAppointmentController, getDoctorAppointmentsController } from '../controllers/appointment.controller';
import { verifyRole } from '../middlewares/verify-role';
import AppointmentController from '../controllers/appointment.controller';
import { validateAppointmentInput } from '../utils/validation-middleware';
import verifyJWT from '../middlewares/verify-jwt';

const router = Router()

router.get('/doctor-appointments', verifyJWT, verifyRole(['doctor']), getDoctorAppointmentsController)

router.get('/:id', validateResource(getAppointmentSchema), AppointmentController.getAppointment)
// router.route('/').post(validateResource(createAppointmentSchema), createAppointmentController)
// router.route('/').get(verifyRole(['doctor', 'staff']), getAllAppointmentsController)

router.post('/', validateAppointmentInput, AppointmentController.bookAppointment);
router.get('/available', AppointmentController.getAvailableTimeSlots);

export default router