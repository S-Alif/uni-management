import { v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY_API, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../../constants/dotenv.constants.js'
import { ApiError } from '../api/response/apiError.js'


cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API,
    api_secret: CLOUDINARY_API_SECRET,
})

// upload a media
const uploadMedia = async (file) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const uploader = cloudinary.uploader.upload_stream({
                resource_type: file.mimetype.startsWith("image") ? "image" : "video",
                transformation: {
                    quality: "auto:low"
                },
            }, (err, res) => {
                if (err) reject(err)
                resolve(res.secure_url)
            })
            uploader.write(file?.data)
            uploader.end()
        })
        return result
    } catch (error) {
        console.log(error)
        throw new ApiError(400, 'Failed to upload media')
    }
}

// remove a media
const removeMedia = async (fileUrl) => {
    try {
        const publicId = fileUrl.split("upload/")[1].split("/")[1].split(".")[0]
        await cloudinary.uploader.destroy(publicId)
        return true
    } catch (error) {
        console.log(error)
        throw new ApiError(400, 'Failed to remove media')
    }
}

export {
    uploadMedia,
    removeMedia
}