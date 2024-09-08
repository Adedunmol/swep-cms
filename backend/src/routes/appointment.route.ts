import { Router } from 'express';
import validateResource from '../middlewares/validate-resource';
import { createAppointmentSchema, getAppointmentSchema } from '../schema/appointment.schema';
import { createAppointmentController, getAllAppointmentsController, getAppointmentController, getDoctorAppointmentsController } from '../controllers/appointment.controller';
import { verifyRole } from '../middlewares/verify-role';
import AppointmentController from '../controllers/appointment.controller';

const router = Router()

router.route('/').post(validateResource(createAppointmentSchema), createAppointmentController)
router.route('/').get(verifyRole(['doctor', 'staff']), getAllAppointmentsController)
router.route('/doctor-appointments').get(verifyRole(['doctor']), getDoctorAppointmentsController)
router.route('/:id').get(verifyRole(['doctor', 'staff']), validateResource(getAppointmentSchema), getAppointmentController)

router.post('/', AppointmentController.bookAppointment);
router.get('/available', AppointmentController.getAvailableTimeSlots);


export default router