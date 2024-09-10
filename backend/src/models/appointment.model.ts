import db from "../database";

interface CreateAppointment {
    doctorId: string
    date: Date
    startTime: string
    endTime: string
    userId: string
    reason: string
    shift: string
}

class Appointment {
    async createAppointment(data: CreateAppointment) {
        const [appointment] = await db('appointments')
            .returning('*')
            .insert({
            doctor_id: data.doctorId,
            date: data.date,
            start_time: data.startTime,
            end_time: data.endTime,
            user_id: data.userId,
            reason: data.reason,
            shift: data.shift
        })

        const updatedAppointment: any = appointment

        return { ...updatedAppointment }
    }

    async findAppointment(appointmentId: string) {
        const appointment = await db('appointments')
                                    .select('records.*', 'appointments.*')
                                    .join('records', 'appointments.user_id', '=', 'records.user_id')
                                    .where('appointments.id', appointmentId)
                                    .join('users', 'users.id', '=', 'records.user_id')
                                    .select('users.email AS patient_email', 'users.first_name AS patient_first_name', 'users.last_name AS patient_last_name')

        return appointment[0]
    }

    async findUserAppointments(userId: string) {
        const appointments = await db('appointments')
                                    .select('appointments.*', 'users.email AS patient_email', 'users.first_name AS patient_first_name', 'users.last_name AS patient_last_name')
                                    .join('users', 'users.id', '=', 'appointments.user_id')
                                    .where('user_id', userId)
                                    .andWhere('appointments.created_at', '>=', new Date())
                                    .orderBy('appointments.created_at', 'asc')

        return appointments
    }

    async findAllAppointments(doctorId?: string) {
        let appointment: any[]

        if (!doctorId) {
            appointment = await db('appointments').where({}).orderBy('created_at', 'asc')
        } else {
            appointment = await db('appointments').where({}).andWhere({ doctor_id: doctorId }).orderBy('created_at', 'asc')
        }

        return appointment
    }

    async fetchOverlaps(doctorId: number, date: string, startTime: string, endTime: string) {
        const appointments = await db('appointments')
                                    .where('doctor_id', doctorId)
                                    .where('date', date)
                                    .where(function () {
                                    this.where('start_time', '<', endTime).andWhere('end_time', '>', startTime);
                                });

        return appointments
    }
}

export default new Appointment()