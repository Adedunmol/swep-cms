import { Router } from 'express';
import { createUserController, getAllDoctorsController, loginController } from '../controllers/user.controller';
import validateResource from '../middlewares/validate-resource';
import { createUserSchema, loginUserSchema } from '../schema/user.schema';
import { getRecordSchema, updateRecordSchema } from '../schema/record.schema';
import { getRecordController, updateRecordController } from '../controllers/record.controller';
import verifyJWT from '../middlewares/verify-jwt';
import AppointmentController from '../controllers/appointment.controller';


const router = Router()

router.route('/students/register').post(validateResource(createUserSchema), createUserController)
// router.route('/staff/register').post(validateResource(createUserSchema), createUserController)
router.route('/login').post(validateResource(loginUserSchema), loginController)
// router.route('/doctors').get(getAllDoctorsController)
router.route('/records').patch(verifyJWT, validateResource(updateRecordSchema), updateRecordController)
router.route('/records').get(verifyJWT, validateResource(getRecordSchema), getRecordController)
router.get('/user-appointments', verifyJWT, AppointmentController.getUserAppointments)


export default router