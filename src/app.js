import express, { json, urlencoded } from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'



dotenv.config({
    path: './.env'
})

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, Credential: true }))
app.use(json({ limit: "100kb" }))
app.use(cookieparser())
app.use(urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))


//router
app.use("/api/v1/users", userRoutes)

export { app }

