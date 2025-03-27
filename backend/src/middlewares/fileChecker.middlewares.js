import { ApiError } from "../utils/api/response/apiError.js";

const fileCheck = (allowedTypes = [], fileLimit = 0) => {
    return async (req, res, next) => {
        try {
            let files = req?.files

            if(!files) {
                if(fileLimit === 0) return next()
                throw new ApiError(400, "No files uploaded")
            }

            const sizeLimit = 10 * 1024 * 1024

            const uploadingFiles = Object.values(files).flat()

            if (fileLimit > 0 && uploadingFiles.length > fileLimit) throw new ApiError(400, `Cannot upload more than ${fileLimit} files`)

            uploadingFiles.flatMap(file => {
                if (!allowedTypes.includes(file?.mimetype)) {
                    throw new ApiError(400, "Invalid file type")
                }
                else {
                    if (file.size > sizeLimit) {
                        throw new ApiError(400, `File size should be less than ${sizeLimit / (1024 * 1024)} MB`)
                    }
                }
            })

            next()

        } catch (error) {
            next(error)
        }
    }
}

export default fileCheck