import db from "../database/database";

interface CreateAppointment {
    doctorId: string
    email: string
    phoneNumber: string
    availableDay: string
    availableMonth: string
    reason: string
}

class Appointment {
    async createAppointment(data: CreateAppointment) {
        const [id] = await db('appointment').insert({
            ...data
        }).returning('id')

        return { appointmentId: id }
    }

    async findAppointment(id: string) {
        const appointment = await db('appointment').where({ id })

        return appointment[0]
    }

    async findAllAppointments() {
        const appointment = await db('appointment').where({})

        return appointment
    }
}

export default new Appointment()