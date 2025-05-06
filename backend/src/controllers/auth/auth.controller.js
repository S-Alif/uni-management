import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../constants/dotenv.constants.js"
import usersModels from "../../models/users.models.js"
import { ApiResponse } from "../../utils/api/response/apiResponse.js"
import { ApiError } from "../../utils/api/response/apiError.js"
import controllerHandler from "../../utils/controller-handler/controllerHandler.js"
import { generateToken, verifyToken } from "../../utils/token/token.js"
import authService from "./auth.service.js"
import asyncHandler from "../../utils/controller-handler/asyncHandler.js"

const authController = {

    // login all user
    login: asyncHandler(async (req, res) => {
        const refreshTokenFromCookie = req.cookies?.refreshToken
        const result = await authService.login(req)
        const accessToken = generateToken({
            id: result._id,
            email: result.email,
            role: result.role
        }, ACCESS_TOKEN_SECRET, "1m")
        const refreshToken = generateToken({id: result?._id}, REFRESH_TOKEN_SECRET, "7d")

        let user = await usersModels.findOne({ _id: result?._id }).exec()

        let newRefreshTokens = []
        if(refreshTokenFromCookie){
            newRefreshTokens = user.refreshTokens.filter(token => token != refreshTokenFromCookie)
            res.clearCookie("refreshToken", {httpOnly: true, sameSite: "None", secure: true})
        }

        user.refreshTokens = [...newRefreshTokens, refreshToken]
        await user.save()

        const data = {...result?._doc}
        delete data["pass"]
        delete data["refreshTokens"]

        res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: Date.now() + (7 * 24 * 60 * 60 * 1000) })
        res.status(200).json(new ApiResponse(200, {user: data, accessToken}, "Login success"))
    }),

    // register admin
    register: controllerHandler(authService.register),

    // refres token rotation
    refreshToken: asyncHandler(async (req, res) => {
        const refreshToken = req.cookies?.refreshToken
        console.log("refresh token", refreshToken)
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
        if(user?._id?.toString() != decodeRefreshTokenIfUserIsFound?.id) {
            throw new ApiError(403, "Forbidden")
        }

        // valid refresh token
        const accessToken = generateToken({id: user?._id, email: user?.email, role: user?.role}, ACCESS_TOKEN_SECRET, "1m")
        const generatedNewRefreshToken = generateToken({id: user?._id}, REFRESH_TOKEN_SECRET, "3d")
        user.refreshTokens = [...newRefreshTokens, generatedNewRefreshToken]
        await user.save()

        console.log("new refresh token", generatedNewRefreshToken)
        console.log("new access token", accessToken)

        res.status(200).cookie("refreshToken", generatedNewRefreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }).json({accessToken})
    }),

    sendOtp: controllerHandler(authService.sendOtp),
    verifyOtp: controllerHandler(authService.verifyOtp),
    resetPassword: controllerHandler(authService.resetPassword),
    
    logout: controllerHandler(async (req, res) => {
        const refreshToken = req.cookies?.refreshToken
        if (!refreshToken) return new ApiResponse(204, "No content")
        
        const user = await usersModels.findOne({ refreshTokens: refreshToken }).exec()
        if (!user) return new ApiResponse(204, "No content")
        
        user.refreshTokens = []
        await user.save()
        res.clearCookie("refreshToken", { httpOnly: true, sameSite: "None", secure: true })
        return new ApiResponse(200, "Logged out successfully")
    })
}

export default authController