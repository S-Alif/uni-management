import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../constants/dotenv.constants.js"
import usersModels from "../../models/users.models.js"
import controllerHandler from "../../utils/controller-handler/controllerHandler.js"
import { generateToken, verifyToken } from "../../utils/token/token.js"
import authService from "./auth.service.js"

const authController = {

    // login all user
    login: controllerHandler(async (req, res) => {
        const result = await authService.login(req)
        const accessToken = generateToken({
            id: result._id,
            email: result.email,
            role: result.role
        }, ACCESS_TOKEN_SECRET, "5m")
        const refreshToken = generateToken({_id: result?._id}, REFRESH_TOKEN_SECRET, "7d")

        const data = {...result}
        delete data["pass"]

        res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "None", secure: true })
        res.status(200).json({data, accessToken })
    }),

    // register admin
    register: controllerHandler(authService.register),

    // refres token rotation
    refreshToken: controllerHandler(async (req, res) => {
        const refreshToken = req.cookies?.refreshToken
        if (!refreshToken) {
            res.clearCookie("refreshToken", { httpOnly: true, sameSite: "None", secure: true })
            throw new ApiError(401, "Unauthorized")
        }        

        const user = await usersModels.findOne({ refreshTokens: refreshToken }).exec()

        // reuse detection
        if (!user) {
            const decodeRefreshToken = verifyToken(refreshToken, REFRESH_TOKEN_SECRET)
            if(!decodeRefreshToken) throw new ApiError(403, "Forbidden")
            const refreshTokenHasBeenStolen = await usersModels.findOne({_id: decodeRefreshToken?.id}).exec()
            if(refreshTokenHasBeenStolen){
                refreshTokenHasBeenStolen.refreshTokens = []
                await refreshTokenHasBeenStolen.save()
            }
            throw new ApiError(403, "Forbidden")
        }
        
        const newRefreshTokens = user.refreshTokens.filter(token => token !== refreshToken)
        const decodeRefreshTokenIfUserIsFound = verifyToken(refreshToken, REFRESH_TOKEN_SECRET)
        if(!decodeRefreshTokenIfUserIsFound) {
            user.refreshTokens = newRefreshTokens
            await user.save()
            throw new ApiError(403, "Forbidden")
        }

        // valid refresh token
        const accessToken = generateToken({id: user?._id, email: user?.email, role: user?.role}, ACCESS_TOKEN_SECRET, "5m")
        const generatedNewRefreshToken = generateToken({id: user?._id}, REFRESH_TOKEN_SECRET, "3d")
        user.refreshTokens = [...newRefreshTokens, generatedNewRefreshToken]

        res.cookie("refreshToken", generatedNewRefreshToken, {httpOnly: true, sameSite: "None", secure: true})

        res.status(200).json({accessToken})
    }),

    sendOtp: controllerHandler(authService.sendOtp),
    verifyOtp: controllerHandler(authService.verifyOtp),
    resetPassword: controllerHandler(authService.resetPassword)
}

export default authController