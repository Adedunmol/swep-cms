import express from 'express';
import RosterController from '../controllers/roster.controller';
import { validateRosterInput } from '../utils/validation-middleware';
import validateResource from '../middlewares/validate-resource';
import { updateRosterSchema } from '../schema/roster.schema';

const router = express.Router();

router.post('/', validateRosterInput, RosterController.createRoster);
router.get('/:date', RosterController.getRosterByDate);
router.patch('/:id', validateResource(updateRosterSchema), RosterController.updateRoster);
router.delete('/:id', RosterController.deleteRoster);

export default router;