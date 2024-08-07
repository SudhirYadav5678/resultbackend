import { Marks } from '../models/result.model.js'

const addMarks = async function (req, res) {
    const { studentId, attendanceMarks, projectReviewMarks, assessmentMarks, projectSubmissionMarks, LinkedInPostMarks } = await req.body
    const user = await Marks.findOne({ studentId })
    if (user) {
        return res.status(409).json({
            success: false,
            message: "Student id is exist"
        })
    }

    const addMarksInUser = await Marks.create({
        studentId,
        marks:
            { attendanceMarks, projectReviewMarks, assessmentMarks, projectSubmissionMarks, LinkedInPostMarks }
    })
    return res.status(200).json({
        addMarksInUser: addMarksInUser._id,
        success: true,
        message: "Marks  added successfully"
    })
}

export { addMarks }