import emergencyModel from "../models/emergency.model"

class EmergencyService {
    async createEmergency(data: any) {

        return emergencyModel.createEmergency(data)
    }
    
    async getEmergency(id: string) {

        return emergencyModel.findEmergency(id)
    }

    async getAllEmergencies() {

        return emergencyModel.findAllEmergencies()
    }
}

export default new EmergencyService()