import { Request, Response } from "express";
import { CreateAppointmentInput, GetAppointmentInput } from "../schema/appointment.schema";
import appointmentService from "../services/appointment.service";

export const createAppointmentController = async (req: Request<{}, {}, CreateAppointmentInput["body"]>, res: Response) => {
    try {
        const appointment = await appointmentService.createAppointment(req.body)

        return res.status(201).json({ status: 'success', message: 'appointment created successfully', data: { appointment } })
    } catch {
        return res.status(400).json({ status: 'error', message: 'error creating appointment', data: null })
    }
}

export const getAppointmentController = async (req: Request<GetAppointmentInput["params"]>, res: Response) => {
    try {
        const appointment = await appointmentService.getAppointment(req.params.id)

        return res.status(201).json({ status: 'success', message: 'emergency retrieved successfully', data: { appointment } })
    } catch {
        return res.status(400).json({ status: 'error', message: 'error retrieving appointment', data: null })
    }
}

export const getAllAppointmentsController = async (req: Request, res: Response) => {
    try {
        const appointments = await appointmentService.getAllAppointments()

        return res.status(200).json({ status: 'success', message: 'emergencies retrieved successfully', data: { appointments } })
    } catch {
        return res.status(400).json({ status: 'error', message: 'error retrieving appointments', data: null })
    }
}