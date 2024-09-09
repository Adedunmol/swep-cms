import { Request, Response } from 'express';
import Doctor from '../models/doctor.model';
import { CreateDoctorInput, UpdateDoctorInput } from '../schema/doctor.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import doctorService from '../services/doctor.service';

const ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000

class DoctorController {
    async loginDoctor(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await doctorService.validatePassword({ email, password })

            if (user) {

            const accessToken = jwt.sign({
                UserInfo: {
                    id: user.id,
                    role: user.role,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name
                }
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            )

            return res.status(200).json({ status: 'success', message: '', data: { accessToken, expiresIn: ACCESS_TOKEN_EXPIRATION }})
        }

            return res.status(401).json({ status: 'error', message: 'Invalid credentials', data: null })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: "failed to login doctor" })
        }
    }

    async getAllDoctors(req: Request, res: Response) {
        try {
            const doctors = await Doctor.findAllDoctors();
            res.json({ status: 'success', data: doctors });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve doctors' });
        }
    }

    async getDoctorById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const doctor = await Doctor.findDoctor(id);
            if (doctor) {
                res.json({ status: 'success', data: doctor });
            } else {
                res.status(404).json({ error: 'Doctor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve doctor' });
        }
    }

    async createDoctor(req: Request<{}, {}, CreateDoctorInput['body']>, res: Response) {
        try {
            
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            
            const doctor = await Doctor.createDoctor({ name: req.body.name, email: req.body.email, officeNumber: req.body.officeNumber, password });
            res.status(201).json({ status: 'success', data: doctor });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create doctor' });
        }
    }

    async updateDoctor(req: Request<UpdateDoctorInput['params'], {}, UpdateDoctorInput['body']>, res: Response) {
        try {
            const { id } = req.params;
            console.log("id: ", id)
            const updatedDoctor = await Doctor.updateDoctor(id, req.body);
            console.log("doctor: ", updatedDoctor)
            if (updatedDoctor) {
                res.json({ status: "success", data: updatedDoctor });
            } else {
                res.status(404).json({ error: 'Doctor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update doctor' });
        }
    }

    async deleteDoctor(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedCount = await Doctor.deleteDoctor(id);
            if (deletedCount > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Doctor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete doctor' });
        }
    }
}

export default new DoctorController();