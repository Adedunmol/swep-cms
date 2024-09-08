import express from 'express';
import DoctorController from '../controllers/doctor.controller';
import validateResource from '../middlewares/validate-resource';
import { createDoctorSchema, updateDoctorSchema } from '../schema/doctor.schema';

const router = express.Router();

router.get('/', DoctorController.getAllDoctors);
router.get('/:id', DoctorController.getDoctorById);
router.post('/', validateResource(createDoctorSchema), DoctorController.createDoctor);
router.patch('/:id', validateResource(updateDoctorSchema), DoctorController.updateDoctor);
router.delete('/:id', DoctorController.deleteDoctor);

export default router;