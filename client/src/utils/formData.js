
// make form data
const formData = (value) => {
    const formData = new FormData()

    Object.keys(value).forEach((key) => {
        if (value[key] instanceof File || value[key] != "") {
            if (value[key] instanceof File) {
                formData.append("file", value[key])
            }
            else {
                formData.append(key, value[key])
            }
        }
    })

    return formData
}

export {formData}