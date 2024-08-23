import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Home page!" });
})

app.use('/api/v1/auth', authRouter)

export default app;