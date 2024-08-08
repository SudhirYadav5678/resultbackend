import { Router } from "express";
import { addMarks } from "../controller/marks.controller.js";
import { auth } from '../middleware/loginAuth.js'
import { schoolauth } from "../middleware/schoolAuth.js";

const router = Router();
router.route('/addMarks').post(auth, schoolauth, addMarks)

export default router