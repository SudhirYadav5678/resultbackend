
import jwt from 'jsonwebtoken'
import { School } from "../models/school.model.js";

export const schoolauth = async function (req, res, next) {
    try {
        const schoolToken = await req.cookies?.schoolToken || req.header("Authorization")?.replace("Bearer ", "")
        //console.log("schoolToken", schoolToken);

        if (!schoolToken) {
            return res.status(400).json({
                success: false,
                message: "School Token is not get"
            })
        }
        const verify = jwt.verify(schoolToken, process.env.SECRET_KEY)
        if (!verify) {
            return res.status(400).json({
                success: false,
                message: "School Token is not matched"
            })
        }
        const school = await School.findById(verify?._id).select("-schoolTokens")
        if (!school) {

            throw new ApiError(401, "Invalid School Access Token")
        }

        req.school = school;
        next()
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "School Token is not matched"
        })
    }
}