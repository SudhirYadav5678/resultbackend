import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { uploadOnCloudinary } from "../utiles/cloudinary.js"
import jwt from "jsonwebtoken"

//token for login and logout


const registerUser = async function (req, res) {
    const { userName, email, password, role } = await req.body
    //console.log(userName, email, password);
    if (
        [email, userName, password, role].some((field) => field?.trim() === "")
    ) {
        throw new Error(400, "All fields are required")
    }

    //existing check
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new Error(409, "User with email already exists")
    }
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
        password,
        avatar: avatar.url,
        role
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
                success: false,
                message: "User does not exist"
            }
        )
    }
    const correctPassword = await user.isPasswordCorrect(password)
    if (!correctPassword) {
        return res.status(201).json(
            {
                success: false,
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

const updateUser = async function (req, res) {
    const { userName, email, password, avatar, role } = await req.body
    const userId = req.user; // middleware authentication
    console.log(userId);

    let user = await User.findById(userId);
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User does not found"
        })
    }
    if (userName) { user.userName = userName }
    if (email) { user.email = email }
    if (password) { user.password = password }
    if (role) { user.role = role }
    if (avatar) {
        const avatarLocalPath = req.files?.avatar[0]?.path;
        if (!avatarLocalPath) {
            throw new Error(400, "Avatar file is path is missing")
        }
        //uploade on cloudinary
        const avatar = await uploadOnCloudinary(avatarLocalPath)
    }

    await user.updateOne({
        userName: user.userName,
        email: user.email,
        password: user.password,
        avatar: avatar?.url,
        role: user.role
    })
    return res.status(200).cookie("tokens", user.refreshToken).json({
        user: user.refreshToken,
        success: true,
        message: "Update successfully"
    })
}

const deleteUser = async function (req, res) {
    const user = await User.findById(req.user._id)
    //console.log(user);
    if (!user) {
        console.log("user do not found");
    }

    const deleteUser = await user.deleteOne({ user: user._id })
    console.log(deleteUser);

    return res.status(200).cookie("token", "").json({
        success: true,
        message: "User deleted"
    })
}

export { registerUser, logInUser, logoutUser, updateUser, deleteUser }



//const logInUser = async function (req, res) {
//     const { email, password } = await req.body;
//     console.log(email, password);

//     if (
//         [email, password].some((field) => field?.trim() === "")
//     ) { console.log("all field required"); }

//     const user = await User.findOne({ email })
//     console.log(user);

//     if (!user) {
//         return res.status(409).json(
//             {
//                 success: false,
//                 message: "User does not exist"
//             }
//         )
//     }
//     const correctPassword = await bcrypt.compare(password, user.password)
//     console.log(correctPassword);

//     if (!correctPassword) {
//         return res.status(201).json(
//             {
//                 success: false,
//                 message: "Password is incorrect"
//             }
//         )
//     }

//     const tokens = jwt.sign({
//         _id: user._id,
//         email: user.email,
//     }, process.env.SECRET_KEY, { expiresIn: "2d" })
//     await user.updateOne({ refreshToken: tokens });

//     const options = {
//         httpOnly: true,
//         secure: true
//     }
//     return res.status(201).cookie("tokens", tokens, options).json(
//         {
//             user: tokens,
//             success: true,
//             message: "User login"
//         }
//     )


// }