import { School } from "../models/school.model.js";
import jwt from 'jsonwebtoken'

const schoolRegister = async function (req, res) {
    const user = req.user._id;

    const { schoolName, schoolEmail, schoolPhone, logo, schoolAdd } = await req.body
    if (
        [schoolName, schoolEmail, schoolPhone].some((field) => field?.trim() === "")
    ) {
        console.log("All fields are required");
    }

    const existedSchool = await School.findOne({ schoolEmail });
    if (existedSchool) {
        return res.state(409).jsson({
            success: false,
            message: "School aready existed"
        })
    }

    const school = await School.create({
        schoolName, schoolEmail, schoolPhone, logo, schoolAdd,
        user: user,
    })

    return res.status(200).json({
        success: true,
        message: "School registerd"
    })
}

const schoolLogin = async function (req, res) {
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
            user: schoolToken,
            success: true,
            message: "School login"
        }
    )
}

export { schoolRegister, schoolLogin }