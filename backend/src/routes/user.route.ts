import { Router } from 'express';
import { createUserController, getAllDoctorsController, loginController } from '../controllers/user.controller';
import validateResource from '../middlewares/validate-resource';
import { createUserSchema, loginUserSchema } from '../schema/user.schema';

const router = Router()

router.route('/students/register').post(validateResource(createUserSchema), createUserController)
router.route('/staff/register').post(validateResource(createUserSchema), createUserController)
router.route('/login').post(validateResource(loginUserSchema), loginController)
router.route('/doctors').get(getAllDoctorsController)

export default router