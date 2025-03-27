import { v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY_API, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../../constants/dotenv.constants'


cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API,
    api_secret: CLOUDINARY_API_SECRET,
})

// upload a media
const uploadMedia = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            resource_type: file?.mimetype.startswith("image") ? "image" : "video",
            transformation: {
                quality: "auto:low"
            }
        })
        return result.secure_url
    } catch (error) {
        throw new Error('Failed to upload media')
    }
}

// remove a media
const removeMedia = async (fileUrl) => {
    try {
        const publicId = fileUrl.split("upload/")[1].split("/")[1]
        await cloudinary.uploader.destroy(publicId)
        return true
    } catch (error) {
        throw new Error('Failed to remove media')
    }
}

export {
    uploadMedia,
    removeMedia
}