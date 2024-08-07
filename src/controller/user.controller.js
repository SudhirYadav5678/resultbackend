import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { uploadOnCloudinary } from "../utiles/cloudinary.js"
import jwt from "jsonwebtoken"

//token for login and logout


const registerUser = async function (req, res) {
    //console.log("hello");

    const { userName, email, password } = await req.body
    //console.log(userName, email, password);

    if (
        [email, userName, password].some((field) => field?.trim() === "")
    ) {
        throw new Error(400, "All fields are required")
    }

    //existing check
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new Error(409, "User with email already exists")
    }

    //password bcrypt
    const hashPassword = await bcrypt.hash(password, 10);

    //avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
        throw new Error(400, "Avatar file is path is missing")
    }
    //uploade on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)


    const user = await User.create({
        userName,
        email,
        password: hashPassword,
        avatar: avatar.url,
    })
    return res.status(201).json(
        {
            success: true,
            message: "User Register"
        }
    )
}


const logInUser = async function (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(201).json(
            {
                success: true,
                message: "User does not exist"
            }
        )
    }
    const correctPassword = await user.isPasswordCorrect(password)
    if (!correctPassword) {
        return res.status(201).json(
            {
                success: true,
                message: "Password is incorrect"
            }
        )
    }

    const tokens = jwt.sign({
        _id: user._id,
        email: user.email,
    }, process.env.SECRET_KEY, { expiresIn: "2d" })
    await user.updateOne({ refreshToken: tokens });

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(201).cookie("tokens", tokens, options).json(
        {
            user: tokens,
            success: true,
            message: "User login"
        }
    )


}

const logoutUser = async (req, res) => {
    try {
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200).cookie("tokens", "", options).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export { registerUser, logInUser, logoutUser }