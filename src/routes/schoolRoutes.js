import { Router } from "express";
import { schoolRegister, schoolLogin } from "../controller/school.controller.js";
import { auth } from '../middleware/loginAuth.js'

const router = Router();
router.route('/school').post(auth, schoolRegister)
router.route('/school/login').post(schoolLogin)

export default router