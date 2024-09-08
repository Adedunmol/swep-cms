import db from "../database";

interface CreateDoctor {
    name: string
    email: string
    phoneNumber: string
    password?: string
}

class Doctor{
    async createDoctor(data: CreateDoctor) {
        const [doctor] = await db('doctors')
            .returning(['id', 'name', 'email', 'phone_number'])
            .insert({
            email: data.email,
            phone_number: data.phoneNumber,
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
}

export default new Doctor()