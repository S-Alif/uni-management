export class apiError extends Error {
    constructor(
        statusCode,
        data = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(data)
        this.code = statusCode
        this.data = data
        this.success = "failed"

        if (process.env.NODE_ENV !== "production") {
            this.errors = errors
        }

        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}