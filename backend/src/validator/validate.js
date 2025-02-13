const isValidData = (validatorMthod, data) => {
    if (data == null || data == undefined) return false
    const validateData = validatorMthod.validate(data)
    if (validateData?.error) return false
    return true
}

export default isValidData