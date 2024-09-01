import db from "../database";

interface CreateEmergency {
    name: string
    address: string
    problem: string
    firstAid?: boolean
    onlineMed?: boolean
    ambulance?: boolean
    priority?: number
}

type priority = 1 | 2 | 3

class Emergency {
    async createEmergency(data: CreateEmergency) {
        const [id] = await db('emergencies').insert({
            ...data,
            first_aid: data.firstAid,
            online_med: data.onlineMed,
            priority: +data.priority!!
        }).returning('id')

        return { emergencyId: id }
    }

    async findEmergency(id: string) {
        const emergency = await db('emergencies').where({ id })

        return emergency[0]
    }

    async findAllEmergencies() {
        const emergency = await db('emergencies').where({}).orderBy('created_at', 'desc').orderBy('priority', 'desc')

        return emergency
    }

    async updateEmergency(id: string, data: priority) {
        const updatedEmergency = await db('emergencies').returning(['id', 'name', 'priority']).where({ id }).update('priority', 'desc')

        return updatedEmergency
    }
}

export default new Emergency()