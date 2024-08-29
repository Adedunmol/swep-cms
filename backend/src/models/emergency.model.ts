import db from "../database/database";

interface CreateEmergency {
    name: string
    address: string
    problem: string
    firstAid?: boolean
    onlineMed?: boolean
    ambulance?: boolean
}

class Emergency {
    async createEmergency(data: CreateEmergency) {
        const [id] = await db('emergencies').insert({
            ...data
        }).returning('id')

        return { emergencyId: id }
    }

    async findEmergency(id: string) {
        const emergency = await db('emergencies').where({ id })

        return emergency[0]
    }

    async findAllEmergencies() {
        const emergency = await db('emergencies').where({})

        return emergency
    }
}

export default new Emergency()