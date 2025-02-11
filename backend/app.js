import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import hpp from "hpp"
import ExpressMongoSanitize from "express-mongo-sanitize"

const app = express()

app.use(express.json({ limit: "6mb" }))
app.use(express.urlencoded({ extended: true, limit: "6mb" }))

// security
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(helmet())
app.use(hpp())
app.use(ExpressMongoSanitize())
app.use(cookieParser())

export default app