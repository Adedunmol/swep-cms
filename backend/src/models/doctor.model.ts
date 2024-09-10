import db from "../database";

interface CreateDoctor {
    name: string
    email: string
    officeNumber: string
    password?: string
}

class Doctor{
    async createDoctor(data: CreateDoctor) {
        const [doctor] = await db('doctors')
            .returning('*')
            .insert({
            email: data.email,
            office_number: data.officeNumber,
            name: data.name,
            password: data.password
        })

        const updatedDoctor: any = doctor

        return { ...updatedDoctor }
    }

    async findDoctor(id: string) {
        const doctor = await db('doctors').where({ id })

        return doctor[0]
    }

    async findDoctorWithEmail(email: string) {
        const doctor = await db('doctors').where({ email })

        return doctor[0]
    }

    async findAllDoctors() {
        let doctors: any[]

        doctors = await db('doctors').where({})

        return doctors
    }

    async deleteDoctor(id: string) {
        const doctor = await db('doctors').where({ id }).del()

        return doctor
    }

    async updateDoctor(id: string, data: any) {
        const [doctor] = await db('doctors').where({ id }).update({ ...data }).returning(['id', 'name', 'email'])

        return doctor
    }

    async findDoctorsWithLeastAppointments(shift: 'morning' | 'afternoon' | 'evening', date: string) {
        const doctors = await db('doctors').select('doctors.id', 'doctors.email', 'doctors.name')
                                        .leftJoin('appointments', 'doctors.id', '=', 'appointments.doctor_id')
                                        .where('doctors.role', 'doctor')
                                        .groupBy('doctors.id')
                                        .count('appointments.doctor_id as appointment_count')
                                        .orderBy('appointment_count', 'asc')
                                        .join('rosters', 'rosters.doctor_id', '=', 'doctors.id')
                                        .where('rosters.date', date)
                                        .andWhere('rosters.shift', shift)

//         const doctors = await db('doctors')
//   .select('doctors.id', 'doctors.email', 'doctors.name')
//   .leftJoin('appointments', function () {
//     this.on('doctors.id', '=', 'appointments.doctor_id')
//     //   .andOn('appointments.date', '=', date)
//     //   .andOn('appointments.shift', '=', shift);
//   })
//   .leftJoin('rosters', function () {
//     this.on('doctors.id', '=', 'rosters.doctor_id')
//   })
//   .where('rosters.date', '=', date)
//   .where('doctors.role', 'doctor')
//   .andWhere('rosters.shift', '=', shift)
//   .groupBy('doctors.id')
//   .count('appointments.doctor_id as appointment_count')
//   .orderBy('appointment_count', 'asc');

        return doctors
    }
}

export default new Doctor()