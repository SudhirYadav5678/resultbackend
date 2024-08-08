import { Router } from "express";
import { addMarks } from "../controller/marks.controller.js";
import { auth } from '../middleware/loginAuth.js'

const router = Router();
router.route('/addMarks').post(auth, addMarks)

export default router