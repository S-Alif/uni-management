import { FILE_HOST, FILE_UPLOAD_PASS } from "../../constants/dotenv.constants.js"
import { ApiError } from "../api/response/apiError.js"
import axios from "axios"
import FormData from "form-data"

const fileUpload = async (file) => {
    try {
        if (!file) throw new ApiError(400, "file is required")

        const formData = new FormData()
        formData.append("file", file.data, {
            filename: file.name || "upload.jpg",
            contentType: file.type,
        })

        const result = await axios.post(
            `${FILE_HOST}/uploads`,
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${FILE_UPLOAD_PASS}`
                }
            }
        )
        const fileEntry = result.data?.fileEntry
        console.log(fileEntry)
        if (!fileEntry) throw new ApiError(500, "file upload failed")
        const createShareAbleLink = await axios.post(
            `${FILE_HOST}/file-entries/${fileEntry?.id}/shareable-link`,
            {},
            {
                headers: {
                    "Authorization": `Bearer ${FILE_UPLOAD_PASS}`
                }
            }
        )
        return {
            url: `${FILE_HOST}/file-entries/${fileEntry?.id}?shareable_link=${createShareAbleLink.data?.link?.id}&password=null&thumbnail=`,
            fileId: fileEntry?.id
        }
    } catch (error) {
        console.log(error)
        throw new ApiError(500, "file upload failed")
    }
}

// file remove
const fileRemove = async (entryId, linkId) => {
    try{
        const result = await axios.post(
            `${FILE_HOST}/file-entries/delete`,
            {
                entryIds: [
                    entryId
                ],
                deleteForever: true
            },
            {
                headers: {
                    "Authorization": `Bearer ${FILE_UPLOAD_PASS}`
                }
            }
        )
        console.log(result.data)
        console.log(result.data?.pagination)
        return true
    }
    catch(error){
        console.log("error from file-remove: \n"+error)
        throw new ApiError(500, "file remove failed")
    }
}

export {
    fileUpload,
    fileRemove
}