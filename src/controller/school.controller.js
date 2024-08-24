import { School } from "../models/school.model.js";
import jwt from 'jsonwebtoken'
import { uploadOnCloudinary } from "../utiles/cloudinary.js"

const schoolRegister = async function (req, res) {
    try {
        const user = req.user._id;

        const { schoolName, schoolEmail, schoolPhone, logo, schoolAdd } = await req.body
        //console.log({ schoolName, schoolEmail, schoolPhone, logo, schoolAdd });

        if (
            [schoolName, schoolEmail, schoolPhone].some((field) => field?.trim() === "")
        ) {
            console.log("All fields are required");
        }

        const existedSchool = await School.findOne({ schoolEmail });
        if (existedSchool) {
            return res.status(409).json({
                success: false,
                message: "School aready existed"
            })
        }
        //avatar
        const logoLocalPath = req.files?.logo?.[0]?.path;
        if (!logoLocalPath) {
            throw new Error(400, "Logo file is path is missing")
        }
        //uploade on cloudinary
        const logoSchool = await uploadOnCloudinary(logoLocalPath)
        //console.log(logoSchool);


        const school = await School.create({
            schoolName, schoolEmail, schoolPhone, schoolAdd, logo: logoSchool.url,
            user: user,
        })

        return res.status(200).json({
            success: true,
            message: "School registerd"
        })
    } catch (error) {
        return res.status(409).json({
            success: false,
            message: "School registerd failed!!!"
        })
    }
}

const schoolLogin = async function (req, res) {
    try {
        const { schoolEmail } = await req.body
        if (!schoolEmail) {
            console.log("School id is requird");
        }

        const school = await School.findOne({ schoolEmail })
        if (!school) {
            return res.status(409).json({
                success: false,
                message: "School is not found"
            })
        }

        const schoolToken = jwt.sign({
            _id: school._id,
            schoolEmail: school.schoolEmail
        }, process.env.SECRET_KEY, { expiresIn: "2d" })
        await school.updateOne({ schoolTokens: schoolToken });

        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(201).cookie("schoolToken", schoolToken, options).json(
            {
                schoolToken: schoolToken, //user
                success: true,
                message: "School login"
            }
        )
    } catch (error) {
        return res.status(400).json(
            {
                success: false,
                message: "School login fail!!!"
            }
        )
    }
}



export { schoolRegister, schoolLogin }