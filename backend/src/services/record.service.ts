import recordModel from '../models/record.model'

class RecordService {
    async updateRecord(data: any) {
        return recordModel.updateRecord({ ...data })
    }

    async getRecord(userId: string) {

        return recordModel.findRecord(userId)
    }
}

export default new RecordService()