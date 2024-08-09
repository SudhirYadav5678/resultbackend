import { Router } from "express";
import { addMarkCSV, addMarks } from "../controller/marks.controller.js";
import { auth } from '../middleware/loginAuth.js'
import { schoolauth } from "../middleware/schoolAuth.js";
import { upload } from "../middleware/multer.js";

const router = Router();
router.route('/addMarks').post(auth, schoolauth, addMarks)

router.route('/addMarksCSV').post(auth, schoolauth, upload.fields([{
    name: 'csvFiles',
    maxCount: 1
}]), addMarkCSV)


export default router