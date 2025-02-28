import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import hpp from "hpp"
import ExpressMongoSanitize from "express-mongo-sanitize"
import { CORS_ORIGIN } from "./src/constants/dotenv.constants.js"
import routes from "./src/routes/routes.js"

const app = express()

app.use(express.json({ limit: "6mb" }))
app.use(express.urlencoded({ extended: true, limit: "6mb" }))

// security
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))
app.use(helmet())
app.use(hpp())
app.use(ExpressMongoSanitize())
app.use(cookieParser())

app.use("/api/v1", routes)

export default app