import Axios from "../config/axios"
import { AuthState } from "../stores/useAuthStore"

export const login = async (
    { email, password }: { email: string, password: string },
    authenticate: AuthState["authenticate"]
) => {
    try {
        const response = await Axios.post('/users/login', { email, password })
        console.log(response.data.data.accessToken, 'seee')
        authenticate(response.data.data.accessToken)
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export const signup = async (
    { lastName, firstName, email, password, passwordConfirmation, role }: { lastName: string, firstName: string, email: string, password: string, passwordConfirmation: string, role: string }
) => {
    try {
        await Axios.post(role == 'student' ? '/users/students/register' : '/users/staffs/register', { email, lastName, firstName, password, passwordConfirmation })
    } catch (error: any) {
        console.log(error, 'see')
        throw new Error(error)
    }
}