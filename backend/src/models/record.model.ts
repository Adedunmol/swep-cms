import db from "../database";

interface UpdateRecord {
    age?: number
    bloodType?: string
    genotype?: string
    criticalIllness?: string,
    physicalDisabilities?: string
    emergencyPhoneNumber?: string
    substanceUse?: string
    userId: string
}

class Record {
    async createRecord(userId: string) {
        const [record] = await db('records')
        .returning('*')
        .insert({
            user_id: userId
        })
    }

    async updateRecord(data: UpdateRecord) {
        const record: any = await db('records')
            .returning('*')
            .where('user_id', data.userId )
            .update({
                age: data.age,
                blood_type: data.bloodType,
                genotype: data.genotype,
                critical_illness: data.criticalIllness,
                physical_disabilities: data.physicalDisabilities,
                emergency_phone_number: data.emergencyPhoneNumber,
                substance_use: data.substanceUse
            })

        const updatedRecord: any = record[0]

        return { ...updatedRecord }
    }

    async findRecord(userId: string) {
        const record = await db('records').where({ user_id: userId })

        return record[0]
    }
}

export default new Record()