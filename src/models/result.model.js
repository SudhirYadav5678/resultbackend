import mongoose, { Schema } from "mongoose"

const resultSchema = new Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    marks: {
        attendanceMarks: { type: Number },
        projectReviewMarks: { type: Number },
        assessmentMarks: { type: Number },
        projectSubmissionMarks: { type: Number },
        LinkedInPostMarks: { type: Number },
    }

}, { timestamps: true })

export const Marks = mongoose.model("Marks", resultSchema);