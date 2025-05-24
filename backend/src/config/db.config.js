import mongoose from "mongoose"
import { DB_NAME, DB_PASS, DB_URL, DB_USER } from "../constants/dotenv.constants.js"

const connectDB = async () => {
    try {
        const result = await mongoose.connect(
            `${DB_URL}/${DB_NAME}`,
            {
                autoIndex: true,
                user: DB_USER,
                pass: DB_PASS
            }
        )
        console.log("MongoDB Connected...\nhost : ", result.connection.host)
    } catch (error) {
        console.error(`Error connecting to MongoDB: \n${error}`)
    }
}

export default connectDB