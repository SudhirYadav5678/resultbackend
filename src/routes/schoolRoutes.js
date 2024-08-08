import { Router } from "express";
import { schoolRegister } from "../controller/school.controller.js";
import { auth } from '../middleware/loginAuth.js'

const router = Router();
router.route('/school').post(auth, schoolRegister)

export default router