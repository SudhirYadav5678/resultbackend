import { Router } from "express";
import { logInUser, logoutUser, registerUser, updateUser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js"
import { auth } from "../middleware/loginAuth.js"

const router = Router();
router.route('/register').post(upload.fields([{
    name: "avatar",
    maxCount: 1
}]), registerUser)

router.route('/login').post(logInUser)
router.route('/logout').get(auth, logoutUser)
router.route('/update').post(upload.fields([{
    name: "avatar",
    maxCount: 1
}]), auth, updateUser)

export default router