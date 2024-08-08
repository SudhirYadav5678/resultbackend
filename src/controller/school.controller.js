import { School } from "../models/school.model.js";

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

export { schoolRegister }