import { Request, Response, NextFunction } from 'express';
import { isValidDate, isValidTime } from './date-util';

export function validateAppointmentInput(req: Request, res: Response, next: NextFunction) {
    const { userId, doctorId, date, startTime, endTime } = req.body;

    if (!userId || !doctorId || !date || !startTime || !endTime) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    if (!isValidTime(startTime) || !isValidTime(endTime)) {
        return res.status(400).json({ error: 'Invalid time format' });
    }

    next();
}

export function validateRosterInput(req: Request, res: Response, next: NextFunction) {
    const { doctorId, date, shift } = req.body;

    if (!doctorId || !date || !shift) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    if (!['morning', 'afternoon', 'night'].includes(shift)) {
        return res.status(400).json({ error: 'Invalid shift value' });
    }

    next();
}