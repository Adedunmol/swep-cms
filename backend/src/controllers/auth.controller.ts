import { Response, Request } from 'express'
import { createUserService, validatePassword } from '../service/auth.service'
import { CreateUserInput, LoginUserInput } from '../schema/auth.schema'
import jwt from 'jsonwebtoken'

export const createUserController = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {

        const userData = await createUserService(req.body)

        return res.status(201).json({ status: 'success', message: '',  data: { ...userData } })
    } catch (err: any) {

        if (err && err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ status: 'error', message: 'duplicate value entered', data: null })
        }
        return res.status(400).json({ status: 'error', message: 'error creating user', data: null })
    }
}

const ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000

export const loginController = async (req: Request<{}, {}, LoginUserInput['body']>, res: Response) => {
    const { username, password } = req.body;

    const user = await validatePassword({ username, password })

    if (user) {

        const accessToken = jwt.sign(
            {
                UserInfo: {
                    // id: user.id,
                }
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '15m' }
        )

        return res.status(200).json({ status: 'success', message: '', data: { accessToken, expiresIn: ACCESS_TOKEN_EXPIRATION }})
    }

    return res.status(401).json({ status: 'error', message: 'Invalid credentials', data: null })
}