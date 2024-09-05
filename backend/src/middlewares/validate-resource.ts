import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validateResource = (schema: AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            })
            next()
        }catch (err: any) {
            return res.status(400).json({ status: "error", message: "invalid schema", data: { ...err.issues[0] } })
        }
    
    }
}

export default validateResource