import express, { json, urlencoded } from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import markRoutes from './routes/markRoutes.js'
import schoolRoutes from './routes/schoolRoutes.js'
import bodyParser from "body-parser"




dotenv.config({
    path: './.env'
})

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,

}))

app.use(json({ limit: "100kb" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieparser())
app.use(urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static('public'))


//router
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/marks", markRoutes)
app.use('/api/v1/admin', schoolRoutes)

export { app }

