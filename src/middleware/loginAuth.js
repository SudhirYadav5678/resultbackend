import { logInUser } from "../controller/user.controller.js";
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";

export const auth = async function (req, res, next) {
    try {
        const token = await req.cookies?.tokens || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is not get"
            })
        }
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        if (!verify) {
            return res.status(400).json({
                success: false,
                message: "Token is not matched"
            })
        }
        const user = await User.findById(verify?._id).select("-password -refreshToken")
        if (!user) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Token is not matched"
        })
    }
}