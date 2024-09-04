import app from "../app"
import appointmentModel from "../models/appointment.model"

class AppointmentService {
    async createAppointment(data: any) {

        return appointmentModel.createAppointment(data)
    }
    
    async getAppointment(id: string) {

        return appointmentModel.findAppointment(id)
    }

    async getAllAppointments() {

        return appointmentModel.findAllAppointments()
    }

    async getDoctorAppointments(doctorId: string) {

        return appointmentModel.findAllAppointments(doctorId)
    }
}

export default new AppointmentService()