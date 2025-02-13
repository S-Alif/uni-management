import jwt from "jsonwebtoken"

// generate token
const generateToken = (data, TOKEN_SECRET, expiresIn) => {
    const token = jwt.sign(data, TOKEN_SECRET, { expiresIn: expiresIn })
    return token
}

// verify token
const verifyToken = (token, TOKEN_SECRET) => {
    try {
        const data = jwt.verify(token, TOKEN_SECRET, (err, result) => {
            if (err) return null
            return result
        })
        return data
    } catch (error) {
        return null
    }
}

export {
    generateToken,
    verifyToken
}