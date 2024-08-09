import { Router } from "express";
import { addMarkCSV, addMarks, deleteMarks, singleUpdateMarks } from "../controller/marks.controller.js";
import { auth } from '../middleware/loginAuth.js'
import { schoolauth } from "../middleware/schoolAuth.js";
import { upload } from "../middleware/multer.js";

const router = Router();
router.route('/addMarks').post(auth, schoolauth, addMarks)

router.route('/addMarksCSV').post(auth, schoolauth, upload.fields([{
    name: 'csvFiles',
    maxCount: 1
}]), addMarkCSV)

router.route('/singleUpdateMarks').put(auth, schoolauth, singleUpdateMarks)
router.route('/deleteMarks').post(auth, schoolauth, deleteMarks)


export default router