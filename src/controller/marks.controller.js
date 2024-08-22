import { Marks } from '../models/marks.model.js'
import csv from 'csvtojson'

const addMarks = async function (req, res) {
    try {
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
            studentId, studentName, studentEmail,
            attendanceMarks, projectReviewMarks, assessmentMarks, projectSubmissionMarks, LinkedInPostMarks,
            user,
            school: schoolToken
        })
        return res.status(200).json({
            addMarksInUser: addMarksInUser._id,
            success: true,
            message: "Marks  added successfully"
        })
    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            message: "Marks  add fail"
        })
    }
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

const singleUpdateMarks = async function (req, res) {
    const user = req.user._id
    console.log(user);

    const school = req.school._id
    console.log(school);
    const { studentId, studentName, studentEmail, attendanceMarks, projectReviewMarks, assessmentMarks, projectSubmissionMarks, LinkedInPostMarks } = await req.body;

    let marks = await Marks.findOne({ studentEmail })
    if (!marks) {
        return res.status(400).json({
            success: false,
            message: "User does not found"
        })
    }
    if (studentId) { marks.studentId = studentId }
    if (studentName) { marks.studentName = studentName }
    if (studentEmail) { marks.studentEmail = studentEmail }
    if (attendanceMarks) { marks.attendanceMarks = attendanceMarks }
    if (projectReviewMarks) { marks.projectReviewMarks = projectReviewMarks }
    if (assessmentMarks) { marks.assessmentMarks = assessmentMarks }
    if (projectSubmissionMarks) { marks.projectSubmissionMarks = projectSubmissionMarks }
    if (LinkedInPostMarks) { marks.LinkedInPostMarks = LinkedInPostMarks }

    await marks.updateOne({
        studentId: marks.studentId,
        studentName: marks.studentName,
        attendanceMarks: marks.attendanceMarks,
        projectReviewMarks: marks.projectReviewMarks,
        assessmentMarks: marks.assessmentMarks,
        projectSubmissionMarks: marks.projectSubmissionMarks,
        LinkedInPostMarks: marks.LinkedInPostMarks
    })
    return res.status(200).json({
        success: true,
        message: "Update successfully"
    })
}

const deleteMarks = async function (req, res) {
    const user = req.user._id
    const school = req.school._id

    const { studentId, studentEmail } = await req.body

    const marksDelete = await Marks.findOne({
        studentEmail, studentId
    })
    console.log(marksDelete);

    if (!marksDelete) {
        return res.status(409).json({
            success: false,
            message: "User not found"
        })
    }

    await Marks.deleteOne({
        studentEmail,
        studentId
    });
    return res.status(200).json({
        success: true,
        message: "User deleted"
    })

}
export { addMarks, addMarkCSV, singleUpdateMarks, deleteMarks }