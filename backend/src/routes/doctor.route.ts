import express from 'express';
import DoctorController from '../controllers/doctor.controller';
import validateResource from '../middlewares/validate-resource';
import verifyJWT from '../middlewares/verify-jwt';
import { createDoctorSchema, loginDoctorSchema, updateDoctorSchema } from '../schema/doctor.schema';
import { verifyRole } from '../middlewares/verify-role';
import { getDoctorAppointmentsController } from '../controllers/appointment.controller';


const router = express.Router();

router.get('/least-appointed', DoctorController.getLeastAppointedDoctors)
router.get('/doctor-appointments', verifyJWT, verifyRole(['doctor']), getDoctorAppointmentsController)


router.get('/', DoctorController.getAllDoctors);
router.get('/:id', DoctorController.getDoctorById);
router.post('/', validateResource(createDoctorSchema), DoctorController.createDoctor);
router.patch('/:id', validateResource(updateDoctorSchema), DoctorController.updateDoctor);
router.delete('/:id', DoctorController.deleteDoctor);

router.post('/login', validateResource(loginDoctorSchema), DoctorController.loginDoctor)

export default router;