import mongoose, { Schema } from "mongoose";

const schoolSchema = new Schema({
    schoolName: { type: String, required: true, unique: true },
    schoolEmail: { type: String, required: true, unique: true },
    schoolPhone: { type: String, unique: true },
    schoolAdd: { type: String },
    logo: { type: String, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mark: { type: mongoose.Schema.Types.ObjectId, ref: 'Marks' },

}, { timestamps: true });

export const School = mongoose.model("School", schoolSchema)