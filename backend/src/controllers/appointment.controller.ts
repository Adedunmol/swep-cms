import { Request, Response } from "express";
import { CreateAppointmentInput, GetAppointmentInput } from "../schema/appointment.schema";
import appointmentService from "../services/appointment.service";
import Appointment from '../models/appointment.model';
import Doctor from '../models/doctor.model';
import EmailService from '../services/email.service';
// import SMSService from '../services/sms.service';
import PDFService from '../services/pdf.service';
import Roster from "../models/roster.model";
import { shifts } from "../utils/shifts";

type Shifts = 'morning' | 'afternoon' | 'evening'

class AppointmentController {
    async bookAppointment(req: Request, res: Response) {
        try {
            const { userId, date, reason, shift } = req.body;

            const doctors = await Doctor.findDoctorsWithLeastAppointments(shift, date)
            // const doctors = await Roster.fetchShiftScheduledDoctors(date, shift)
            console.log("doctors: ", doctors)
            const leastAppointedDoctor = doctors[0]

            // Check if the doctor is available (scheduled and not blocked)
            // const isAvailable = await AppointmentController.checkAvailability(doctorId, date, startTime, endTime);

            for (const slot of shifts[shift as Shifts]) {
                console.log("slot: ", slot)
                const isAvailable = await AppointmentController.checkAvailability(leastAppointedDoctor.id as number, date, slot.start, slot.end);
                console.log("isAvailable: ", isAvailable)
                if (isAvailable) {
                    // Create appointment
                    const appointment = await Appointment.createAppointment({
                        userId,
                        // doctorId,
                        doctorId: leastAppointedDoctor.id as string,
                        date,
                        startTime: slot.start,
                        endTime: slot.end,
                        reason,
                        shift
                    });

                    // Send notifications
                    // const doctor = await Doctor.findDoctor(doctorId);
                    const doctor = await Doctor.findDoctor(leastAppointedDoctor.id as string);
                    if (!doctor) {
                        return res.status(400).json({ error: 'doctor not found' });
                    }
                    await EmailService.sendAppointmentNotification(doctor.email, appointment);
                    // await SMSService.sendAppointmentNotification(doctor.phoneNumber, appointment);

                    // Generate and send PDF
                    const pdf = await PDFService.generateAppointmentPDF(appointment);
                    await EmailService.sendAppointmentPDF(doctor.email, pdf);
                    // TODO: Send PDF to user's email as well

                    return res.status(201).json({ status: 'success', data: appointment });
                }
            }
            return res.status(400).json({ error: 'Time slot not available or no doctor scheduled on roster' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to book appointment' });
        }
    }

    async getUserAppointments(req: Request, res: Response) {
        try {
            //@ts-ignore
            if (!req.user.id) return res.sendStatus(401)
            
            //@ts-ignore
            const appointments = await Appointment.findUserAppointments(req.user.id)

            return res.status(200).json({ status: 'success', data: appointments })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to retrieve appointments' });
        }
    }

    async getAppointment(req: Request, res: Response) {
        try {
            const { id: appointmentId } = req.params
            if (!appointmentId) return res.status(400).json({ status: 'error', message: 'appointmentId is required' })
            //@ts-ignore
            const appointment = await Appointment.findAppointment(appointmentId)

            if (!appointment) return res.status(404).json({ status: 'error', message: 'no appointment with this id' })

            return res.status(200).json({ status: 'success', data: appointment })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to retrieve appointments' });
        }
    }

    async getAvailableTimeSlots(req: Request, res: Response) {
        try {
            const { date } = req.query;
            const availableSlots = await AppointmentController.findAvailableTimeSlots(date as string);
            res.json(availableSlots);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to retrieve available time slots' });
        }
    }

    private static async checkAvailability(doctorId: number, date: string, startTime: string, endTime: string): Promise<boolean> {
        // Check if doctor is scheduled for the given date
        const roster = await Roster.findScheduledDoctorForDate(doctorId, date);
        console.log("roster: ", roster)
        if (!roster) {
            return false;
        }

        // Check if there are any overlapping appointments
        const overlappingAppointments = await Appointment.fetchOverlaps(doctorId, date, startTime, endTime)

        console.log("overlaps: ", overlappingAppointments)
        return overlappingAppointments?.length === 0;
    }

    private static async findAvailableTimeSlots(date: string) {
        // Get all doctors scheduled for the given date
        const scheduledDoctors = await Roster.fetchScheduledDoctors(date);

        const availableSlots = [];

        for (const roster of scheduledDoctors) {
            const doctorId = roster.doctor_id;
            const shift = roster.shift;

            // Define time slots based on shift
            const timeSlots = AppointmentController.getTimeSlotsForShift(shift);
            for (const slot of timeSlots) {
                const isAvailable = await AppointmentController.checkAvailability(doctorId, date, slot.start, slot.end);
                if (isAvailable) {
                    availableSlots.push({
                        doctorId,
                        date,
                        startTime: slot.start,
                        endTime: slot.end,
                    });
                }
            }
        }

        return availableSlots;
    }

    private static getTimeSlotsForShift(shift: string) {
        // Define time slots for each shift (adjust as needed)
        const slots = {
            morning: [
                { start: '08:00', end: '09:00' },
                { start: '09:00', end: '10:00' },
                { start: '10:00', end: '11:00' },
                { start: '11:00', end: '12:00' },
            ],
            afternoon: [
                { start: '13:00', end: '14:00' },
                { start: '11:00', end: '15:00' },
                { start: '15:00', end: '16:00' },
                { start: '16:00', end: '17:00' },
            ],
            night: [
                { start: '19:00', end: '20:00' },
                { start: '20:00', end: '21:00' },
                { start: '21:00', end: '22:00' },
                { start: '22:00', end: '23:00' },
            ],
        };

        return slots[shift as keyof typeof slots] || [];
    }
}

export default new AppointmentController();

export const createAppointmentController = async (req: Request<{}, {}, CreateAppointmentInput["body"]>, res: Response) => {
    try {
        // @ts-ignore
        const appointment = await appointmentService.createAppointment({ ...req.body, userId: req.user.id})

        return res.status(201).json({ status: 'success', message: 'appointment created successfully', data: { ...appointment } })
    } catch(err: any) {
        console.log(err)
        return res.status(400).json({ status: 'error', message: 'error creating appointment', data: null })
    }
}

export const getAppointmentController = async (req: Request<GetAppointmentInput["params"]>, res: Response) => {
    try {
        const appointment = await appointmentService.getAppointment(req.params.id)

        return res.status(201).json({ status: 'success', message: 'emergency retrieved successfully', data: { ...appointment } })
    } catch(err: any) {
        console.log(err)
        return res.status(400).json({ status: 'error', message: 'error retrieving appointment', data: null })
    }
}

export const getAllAppointmentsController = async (req: Request, res: Response) => {
    try {
        const appointments = await appointmentService.getAllAppointments()

        return res.status(200).json({ status: 'success', message: 'appointments retrieved successfully', data: appointments })
    } catch(err: any) {
        return res.status(400).json({ status: 'error', message: 'error retrieving appointments', data: null })
    }
}

export const getDoctorAppointmentsController = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const appointments = await appointmentService.getAllAppointments(req.user.id)

        return res.status(200).json({ status: 'success', message: 'appointments retrieved successfully', data: appointments })
    } catch(err: any) {
        console.log(err)
        return res.status(400).json({ status: 'error', message: 'error retrieving appointments', data: null })
    }
}