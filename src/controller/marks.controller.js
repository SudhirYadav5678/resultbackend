import { Marks } from '../models/marks.model.js'
import csv from 'csvtojson'

const addMarks = async function (req, res) {
    const user = req.user._id
    console.log(user);

    const schoolToken = req.school._id
    console.log(schoolToken);


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
        student: { studentId, studentName, studentEmail },
        marks:
            { attendanceMarks, projectReviewMarks, assessmentMarks, projectSubmissionMarks, LinkedInPostMarks },
        user,
        school: schoolToken
    })
    return res.status(200).json({
        addMarksInUser: addMarksInUser._id,
        success: true,
        message: "Marks  added successfully"
    })
}


const addMarkCSV = async function (req, res) {
    const user = req.user._id
    const school = req.school._id


    const csvFiles = req.files?.csvFiles[0]?.path;
    if (!csvFiles) {
        throw new Error("CSV file is missing.")
    }

    try {
        const userData = []
        csv()
            .fromFile(csvFiles)
            .then(async (responce) => {
                for (var i = 0; i < res.length; i++) { }
                userData.push({
                    studentId: responce[i].studentId,
                    studentName: responce[i].studentName,
                    studentEmail: responce[i].studentEmail,
                    attendanceMarks: responce[i].attendanceMarks,
                    projectReviewMarks: responce[i].projectReviewMarks,
                    assessmentMarks: responce[i].assessmentMarks,
                    projectSubmissionMarks: responce[i].projectSubmissionMarks,
                    LinkedInPostMarks: responce[i].LinkedInPostMarks,
                    user: user,
                    school: school
                })
                console.log(userData);

                await Marks.insertMany(userData);
            })
        return res.status(200).json({
            success: false,
            message: " update marks through CSV"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Filed to update marks through CSV"
        })
    }

}

const updateMarks = async function () {

}
export { addMarks, addMarkCSV, updateMarks }