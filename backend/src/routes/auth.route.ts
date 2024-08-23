import { Router } from 'express';
import { createUserController, loginController } from '../controllers/auth.controller';
import validateResource from '../middlewares/validate-resource';
import { createUserSchema, loginUserSchema } from '../schema/auth.schema';

const router = Router()

router.route('/register').post(validateResource(createUserSchema), createUserController)
router.route('/login').post(validateResource(loginUserSchema), loginController)

export default router