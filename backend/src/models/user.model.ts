import db from "../database/database";

interface CreateUser {
    email: string
    username: string
    password: string
}

class User {
    async createUser(data: CreateUser) {
        const [id] = await db('user').insert({
            ...data
        }).returning('id')

        return { userId: id }
    }

    async findUser(email: string) {
        const user = await db('user').where({ email })

        return user[0]
    }
}

export default new User()