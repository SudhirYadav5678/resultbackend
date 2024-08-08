import mongoose, { Schema } from "mongoose"

const marksSchema = new Schema({
    student: {
        studentId: { type: Number, required: [true, "Student id is required"], unique: true },
        studentName: { type: String, required: true },
        studentEmail: { type: String, required: true, unique: true },
    },

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
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },

}, { timestamps: true })

export const Marks = mongoose.model("Marks", marksSchema);