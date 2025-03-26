import { ApiError } from "../utils/api/response/apiError.js"
import { verifyToken } from "../utils/token/token.js"
import { ACCESS_TOKEN_SECRET } from "../constants/dotenv.constants.js"

const authCheck = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            let token = req.headers?.authorization
            if (!token) throw new ApiError(401, "Unauthorized")

            let formatToken = token.split(" ")[1]

            let decoded = await verifyToken(formatToken, ACCESS_TOKEN_SECRET)
            if (!decoded) throw new ApiError(403, "Access forbidden")

            if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
                throw new ApiError(403, "Insufficient permissions")
            }

            req.headers.id = decoded?.id
            req.headers.email = decoded?.email
            req.headers.role = decoded?.role

            next()

        } catch (error) {
            next(error)
        }
    }
}

export default authCheck