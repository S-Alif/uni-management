export class apiResponse {
    constructor(statusCode, data) {
        this.code = statusCode
        this.status = statusCode < 400 ? "success" : "failed"
        this.data = data
    }
}