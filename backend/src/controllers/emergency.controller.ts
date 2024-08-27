import { Request, Response } from "express";
import { CreateEmergencyInput, GetEmergencyInput } from "../schema/emergency.schema";
import emergencyService from "../services/emergency.service";

export const createEmergencyController = async (req: Request<{}, {}, CreateEmergencyInput["body"]>, res: Response) => {
    try {
        //@ts-ignore
        const emergency = await emergencyService.createEmergency({ ...req.body, userId: req.user.id })

        return res.status(201).json({ status: 'success', message: 'emergency created successfully', data: { emergency } })
    } catch {
        return res.status(400).json({ status: 'error', message: 'error creating emergency', data: null })
    }
}

export const getEmergencyController = async (req: Request<GetEmergencyInput["params"]>, res: Response) => {
    try {
        const emergency = await emergencyService.getEmergency(req.params.id)

        return res.status(201).json({ status: 'success', message: 'emergency retrieved successfully', data: { emergency } })
    } catch {
        return res.status(400).json({ status: 'error', message: 'error getting emergencies', data: null })
    }
}

export const getAllEmergenciesController = async (req: Request, res: Response) => {
    try {
        const emergencies = await emergencyService.getAllEmergencies()

        return res.status(200).json({ status: 'success', message: 'emergencies retrieved successfully', data: { emergencies } })
    } catch {
        return res.status(400).json({ status: 'error', message: 'error getting emergencies', data: null })
    }
}