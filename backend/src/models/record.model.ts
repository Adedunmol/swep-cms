import db from "../database";

interface UpdateRecord {
    age?: number
    bloodType?: string
    genotype?: string
    password?: string
}

class Record {
    async updateRecord(data: UpdateRecord) {
        const [record] = await db('records')
            .returning('*')
            .insert({
            age: data.age,
            blood_type: data.bloodType,
            genotype: data.genotype,
        })

        const updatedRecord: any = record

        return { ...updatedRecord }
    }

    async findRecord(userId: string) {
        const record = await db('records').where({ user_id: userId })

        return record[0]
    }
}

export default new Record()