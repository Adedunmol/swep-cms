import express from 'express';
import DoctorController from '../controllers/doctor.controller';
import validateResource from '../middlewares/validate-resource';
import { createDoctorSchema, loginDoctorSchema, updateDoctorSchema } from '../schema/doctor.schema';

const router = express.Router();

router.get('/least-appointed', DoctorController.getLeastAppointedDoctors)


router.get('/', DoctorController.getAllDoctors);
router.get('/:id', DoctorController.getDoctorById);
router.post('/', validateResource(createDoctorSchema), DoctorController.createDoctor);
router.patch('/:id', validateResource(updateDoctorSchema), DoctorController.updateDoctor);
router.delete('/:id', DoctorController.deleteDoctor);

router.post('/login', validateResource(loginDoctorSchema), DoctorController.loginDoctor)

export default router;