import emergencyModel from "../models/emergency.model"

class EmergencyService {
    async createEmergency(data: any) {

        return emergencyModel.createEmergency(data)
    }
    
    async getEmergency(id: string) {

        return emergencyModel.findEmergency(id)
    }
    
    async updateEmergency(id: string, data: any) {

        const emergency = await emergencyModel.findEmergency(id)

        if (!emergency) throw new Error("no emergeny found with this id")

        return await emergencyModel.updateEmergency(id, data)        
    }

    async getAllEmergencies() {

        return emergencyModel.findAllEmergencies()
    }
}

export default new EmergencyService()