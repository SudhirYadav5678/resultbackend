import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email most be unique"],
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "Password  is required"],
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    refreshToken: {
        type: String
    },
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Marks"
    }]

}, { timestamps: true })


//password encrypeted.
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema);