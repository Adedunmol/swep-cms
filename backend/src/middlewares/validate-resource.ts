import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validateResource = (schema: AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body
            })
            next()
        }catch (err: any) {
            return res.status(400).send(err.issues)
        }
    
    }
}

export default validateResource