import app from "./app.js"
import { PORT } from "./src/constants/dotenv.constants.js"
import connectDB from "./src/config/db.config.js"


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server running on port " + PORT)
        })
    })
    .catch(error => {
        console.log("Mongodb connection failed !! ", error)
    })
