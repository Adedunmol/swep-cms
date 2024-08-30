import db from "../database/database";

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
        const [id] = await db('users').insert({
            ...data
        }).returning('id')

        return { userId: id }
    }

    async findUser(email: string) {
        const user = await db('users').where({ email })

        return user[0]
    }
}

export default new User()