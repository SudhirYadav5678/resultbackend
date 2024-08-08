import { Marks } from '../models/marks.model.js'

const addMarks = async function (req, res) {
    const user = req.user._id
    console.log(user);

    const { studentId, studentName, studentEmail, attendanceMarks, projectReviewMarks, assessmentMarks, projectSubmissionMarks, LinkedInPostMarks } = await req.body
    console.log(studentId, studentName, studentEmail, attendanceMarks, projectReviewMarks, assessmentMarks, projectSubmissionMarks, LinkedInPostMarks);

    const marks = await Marks.findOne({ studentId })

    if (marks) {
        return res.status(409).json({
            success: false,
            message: "Student id is exist"
        })
    }

    const addMarksInUser = await Marks.create({

        studentId, studentName, studentEmail,
        marks:
            { attendanceMarks, projectReviewMarks, assessmentMarks, projectSubmissionMarks, LinkedInPostMarks },
        user
    })
    return res.status(200).json({
        addMarksInUser: addMarksInUser._id,
        success: true,
        message: "Marks  added successfully"
    })
}


const updateMarks = async function () {

}
export { addMarks, updateMarks }