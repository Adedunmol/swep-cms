import bcrypt from 'bcrypt'
import userModel from '../models/user.model'
import recordModel from '../models/record.model'

class UserService {
    async createUser(data: any) {
        const { email, firstName, lastName, password, role } = data
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await userModel.createUser({ email, firstName, lastName, role, password: hashedPassword })

        await recordModel.createRecord(user.id)

        return user
    }
    
    async validatePassword({ password, email }: { email: string, password: string }) {
        const user = await userModel.findUser(email)
    
        if (!user) return false
        
        const match = await bcrypt.compare(password, user.password) // user.comparePassword(password)
    
        if (!match) return false
            
        return user
    }

    async getAllDoctors() {

        return userModel.findDoctors()
    }
}

export default new UserService()