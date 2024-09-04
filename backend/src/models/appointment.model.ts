import db from "../database";

interface CreateAppointment {
    doctorId: string
    email: string
    phoneNumber: string
    availableDay: string
    availableMonth: string
    reason: string
    userId: string
}

class Appointment {
    async createAppointment(data: CreateAppointment) {
        const [appointment] = await db('appointments')
            .returning(['id', 'doctor_id', 'email', 'phone_number', 'available_day', 'available_month'])
            .insert({
            doctor_id: data.doctorId,
            email: data.email,
            phone_number: data.phoneNumber,
            available_day: data.availableDay,
            available_month: data.availableMonth,
            reason: data.reason,
            user_id: data.userId
        })

        const updatedAppointment: any = appointment

        return { ...updatedAppointment }
    }

    async findAppointment(id: string) {
        const appointment = await db('appointments').where({ id })

        return appointment[0]
    }

    async findAllAppointments() {
        const appointment = await db('appointments').where({ attended_to: false }).orderBy('created_at', 'asc')

        return appointment
    }
}

export default new Appointment()