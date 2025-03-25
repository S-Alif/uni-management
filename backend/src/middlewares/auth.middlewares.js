import { ApiError } from "../utils/api/response/apiError.js"

const authCheck = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            let token = req.headers?.authorization
            if (!token) throw new ApiError(401, "Unauthorized")

            let formatToken = token.split(" ")[1]

            let decoded = await verifyToken(formatToken)
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