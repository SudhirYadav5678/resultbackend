import { Router } from "express";
import { schoolRegister, schoolLogin } from "../controller/school.controller.js";
import { auth } from '../middleware/loginAuth.js'
import { upload } from "../middleware/multer.js"

const router = Router();
router.route('/school').post(auth, upload.fields([{
    name: "logo",
    maxCount: 1
}]), schoolRegister)
router.route('/school/login').post(schoolLogin)

export default router