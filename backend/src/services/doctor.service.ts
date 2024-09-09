import bcrypt from 'bcrypt'
import userModel from '../models/user.model'
import doctorModel from '../models/doctor.model'

class DoctorService {
    
    async validatePassword({ password, email }: { email: string, password: string }) {
        const user = await doctorModel.findDoctorWithEmail(email)
    
        if (!user) return false
        
        const match = await bcrypt.compare(password, user.password) // user.comparePassword(password)
    
        if (!match) return false
            
        return user
    }

}

export default new DoctorService()