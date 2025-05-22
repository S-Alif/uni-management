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

// fil upload constants
const FILE_UPLOAD_PASS = process.env.FILE_UPLOAD_PASS
const FILE_HOST = process.env.FILE_HOST

// token constants
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const PORT = process.env.PORT
const CORS_ORIGIN = process.env.CORS_ORIGIN
const NODE_ENV = process.env.NODE_ENV

const MAIL_URL = process.env.MAIL_URL
const MAIL_PASS = process.env.MAIL_PASS
const MAIL = process.env.MAIL
const MAIL_HOST = process.env.MAIL_HOST
const MAIL_PORT = process.env.MAIL_PORT


export {
    DB_URL,
    DB_NAME,
    DB_USER,
    DB_PASS,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API,
    CLOUDINARY_API_SECRET,
    FILE_UPLOAD_PASS,
    FILE_HOST,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    PORT,
    CORS_ORIGIN,
    MAIL_URL,
    MAIL_PASS,
    MAIL,
    MAIL_HOST,
    MAIL_PORT,
    NODE_ENV
}