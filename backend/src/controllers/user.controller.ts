import { Response, Request } from 'express'
import userService from '../services/user.service'
import { CreateUserInput, LoginUserInput, createUserSchema } from '../schema/user.schema'
import jwt from 'jsonwebtoken'

export const createUserController = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const result = createUserSchema.parse({ body: req.body })

        // const role = result.body.email.includes('student') ? 'student' : result.body.role

        const role = 'patient'
        const userData = await userService.createUser({ ...result.body, role })

        return res.status(201).json({ status: 'success', message: '',  data: { ...userData } })
    } catch (err: any) {
        console.log(err)

        if (err && err.code === '23505') {
            return res.status(409).json({ status: 'error', message: 'duplicate value entered', data: null })
        }
        return res.status(400).json({ status: 'error', message: 'error creating user', data: err.issues })
    }
}

const ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000

export const loginController = async (req: Request<{}, {}, LoginUserInput['body']>, res: Response) => {
    const { email, password } = req.body;

    const user = await userService.validatePassword({ email, password })

    if (user) {

        const accessToken = jwt.sign(
            {
                UserInfo: {
                    id: user.id,
                    role: user.role,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name
                }
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            // { expiresIn: '15m' }
        )

        return res.status(200).json({ status: 'success', message: '', data: { accessToken, expiresIn: ACCESS_TOKEN_EXPIRATION }})
    }

    return res.status(401).json({ status: 'error', message: 'Invalid credentials', data: null })
}

export const getAllDoctorsController = async (req: Request, res: Response) => {
    try {
        const doctors = await userService.getAllDoctors()

        return res.status(200).json({ status: 'success', message: 'doctors retrieved successfully', data: { doctors } })
    } catch (err: any) {
        console.log(err)
        return res.status(500).json({ status: 'error', message: 'internal server error', data: null })
    }
}
