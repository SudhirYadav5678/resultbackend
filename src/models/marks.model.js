import mongoose, { Schema } from "mongoose"

const marksSchema = new Schema({
    studentId: { type: Number, required: [true, "Student id is required"], unique: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true, unique: true },
    marks: {
        attendanceMarks: { type: Number },
        projectReviewMarks: { type: Number },
        assessmentMarks: { type: Number },
        projectSubmissionMarks: { type: Number },
        LinkedInPostMarks: { type: Number },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shool: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
    },

}, { timestamps: true })

export const Marks = mongoose.model("Marks", marksSchema);