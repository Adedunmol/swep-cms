import db from "../database";

interface CreateEmergency {
    name: string
    address: string
    problem: string
    firstAid?: boolean
    onlineMed?: boolean
    ambulance?: boolean
    priority?: string
    userId: number
}

type priority = 1 | 2 | 3

class Emergency {
    async createEmergency(data: CreateEmergency) {
        const [emergency] = await db('emergencies').returning(['id', 'user_id', 'name', 'problem', 'priority']).insert({
            name: data.name,
            address: data.address,
            ambulance: data.ambulance,
            problem: data.problem,
            first_aid: data.firstAid,
            online_med: data.onlineMed,
            priority: +data.priority!!,
            user_id: +data.userId
        })

        const updatedEmergency: any = emergency

        return { ...updatedEmergency }
    }

    async findEmergency(id: string) {
        const emergency = await db('emergencies').where({ id })

        return emergency[0]
    }

    async findAllEmergencies() {
        const emergency = await db('emergencies').where({ attended_to: false }).orderBy('created_at', 'asc').orderBy('priority', 'desc')

        return emergency
    }

    async updateEmergency(id: string, data: priority) {
        const updatedEmergency = await db('emergencies').returning(['id', 'name', 'priority', 'problem']).where({ id }).update('priority', +data)

        return updatedEmergency
    }
}

export default new Emergency()