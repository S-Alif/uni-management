import dotenv from "dotenv"
dotenv.config()

// databse constants
const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

// cloudinary constants
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API = process.env.CLOUDINARY_API
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

// supabase constants
const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL
const SUPABASE_PROJECT_API_KEY = process.env.SUPABASE_PROJECT_API_KEY

// token constants
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const PORT = process.env.PORT
const CORS_ORIGIN = process.env.CORS_ORIGIN


export {
    DB_URL,
    DB_NAME,
    DB_USER,
    DB_PASS,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API,
    CLOUDINARY_API_SECRET,
    SUPABASE_PROJECT_URL,
    SUPABASE_PROJECT_API_KEY,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    PORT,
    CORS_ORIGIN
}