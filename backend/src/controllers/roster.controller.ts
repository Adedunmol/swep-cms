import { Request, Response } from 'express';
import Roster from '../models/roster.model';
import { UpdateRosterInput } from '../schema/roster.schema';

class RosterController {
    async createRoster(req: Request, res: Response) {
        try {
            const roster = await Roster.createRoster(req.body);
            res.status(201).json(roster);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to create roster' });
        }
    }

    async getRosterByDate(req: Request, res: Response) {
        try {
            const { date } = req.params;
            const roster = await Roster.fetchScheduledDoctors(date);
            res.json({ status: 'success', data: roster });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to retrieve roster' });
        }
    }

    async updateRoster(req: Request<UpdateRosterInput['params'], {}, UpdateRosterInput['body']>, res: Response) {
        try {
            if (Object.keys(req.body).length == 0) return res.sendStatus(200)
            const { id } = req.params;
            const updatedRoster = await Roster.updateRoster(id, req.body);
            if (updatedRoster) {
                res.json(updatedRoster);
            } else {
                res.status(404).json({ error: 'Roster not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update roster' });
        }
    }

    async deleteRoster(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedCount = await Roster.deleteRoster(id);
            if (deletedCount > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Roster not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete roster' });
        }
    }
}

export default new RosterController();