import mongoose, { Schema } from "mongoose"

const resultSchema = new Schema({
    marks: {
        studentId: { type: Number },
        attendanceMarks: { type: Number },
        projectReviewMarks: { type: Number },
        assessmentMarks: { type: Number },
        projectSubmissionMarks: { type: Number },
        LinkedInPostMarks: { type: Number },
    }

}, { timestamps: true })

export const Results = mongoose.model("Results", resultSchema);