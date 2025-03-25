import { NODE_ENV } from "../constants/dotenv.constants.js"
import { ApiError } from "../utils/api/response/apiError.js"
import { ApiResponse } from "../utils/api/response/apiResponse.js"

const errorMiddleware = (error, req, res, next) => {
  let { code, message, errors, stack } = error

  if (!(error instanceof ApiError)) {
    code = 500
    message = "Something went wrong"
  }

  // Send error response to the user
  res.status(code).json({
    ...new ApiResponse(code, {}, message),
    ...(NODE_ENV == "development" && {stack})
  })
}

export default errorMiddleware