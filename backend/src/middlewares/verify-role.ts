import { Request, Response, NextFunction } from "express";

type Roles = 'student' | 'doctor' | 'staff'

export const verifyRole = (roles: Roles[]) => {
    
    return (req: Request, res: Response, next: NextFunction) => {

        // @ts-ignore
        if (!roles.includes(req.user.role)) return res.status(403).json({ status: 'error', message: 'You are not authorized to access this route', data: null })
        next()
    }
}