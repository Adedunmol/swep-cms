import db from "../database";

interface CreateUser {
    email: string
    firstName: string
    lastName: string
    password: string
    role: string
    // phoneNumber: string
}

class User {
    async createUser(data: CreateUser) {
        const [user] = await db('users').returning(['id', 'first_name', 'last_name', 'email']).insert({
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            password: data.password,
            role: data.role
        })

        const updatedUser: any = user

        return { ...updatedUser }
    }

    async findUser(email: string) {
        const user = await db('users').where({ email })

        return user[0]
    }
}

export default new User()