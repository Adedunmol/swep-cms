import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route"
import emergencyRouter from "./routes/emergency.route"
import appointmentRouter from "./routes/appointment.route"
import verifyJWT from "./middlewares/verify-jwt"

const app = express()

const API_VERSION = '/api/v1'

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Home page!" })
})

app.use(`${API_VERSION}/users`, userRouter)

app.use(verifyJWT)
app.use(`${API_VERSION}/appointments`, appointmentRouter)
app.use(`${API_VERSION}/emergencies`, emergencyRouter)

export default app