import db from "../database";

interface CreateAppointment {
    doctorId: string
    date: Date
    startTime: string
    endTime: string
    userId: string
}

class Appointment {
    async createAppointment(data: CreateAppointment) {
        const [appointment] = await db('appointments')
            .returning(['id', 'doctor_id', 'email', 'phone_number', 'available_day', 'available_month'])
            .insert({
            doctor_id: data.doctorId,
            date: data.date,
            start_time: data.startTime,
            end_time: data.endTime,
            user_id: data.userId
        })

        const updatedAppointment: any = appointment

        return { ...updatedAppointment }
    }

    async findAppointment(id: string) {
        const appointment = await db('appointments').where({ id })

        return appointment[0]
    }

    async findAllAppointments(doctorId?: string) {
        let appointment: any[]

        if (!doctorId) {
            appointment = await db('appointments').where({ attended_to: false }).orderBy('created_at', 'asc')
        } else {
            appointment = await db('appointments').where({ attended_to: false }).andWhere({ doctor_id: doctorId }).orderBy('created_at', 'asc')
        }

        return appointment
    }

    async fetchOverlaps(doctorId: number, date: string, startTime: string, endTime: string) {
        const appointments = await db('appointments')
                                    .where('doctorId', doctorId)
                                    .where('date', date)
                                    .where(function () {
                                    this.where('startTime', '<', endTime).andWhere('endTime', '>', startTime);
                                });

        return appointments
    }
}

export default new Appointment()