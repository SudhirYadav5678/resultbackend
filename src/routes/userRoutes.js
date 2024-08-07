import { Router } from "express";
import { logInUser, logoutUser, registerUser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js"
import { auth } from "../middleware/loginAuth.js"

const router = Router();
router.route('/register').post(upload.fields([{
    name: "avatar",
    maxCount: 1
}]), registerUser)

router.route('/login').post(logInUser)
router.route('/logout').get(auth, logoutUser)

export default router