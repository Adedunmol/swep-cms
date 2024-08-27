import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedData {
    username: string
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ status: "fail", message: "No token" });
    
    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: any, decoded: any) => {
        if (err) return res.status(401).json({ status: 'error', message: 'You are sending a bad token', data: null })
        let decodedData = decoded as any

        const dataObj = {
            id: decodedData.UserInfo.id,
        }

        // @ts-ignore
        req.user = dataObj
        
        next()
    })
}

export default verifyJWT;