import { Router } from "express";
import { addMarkCSV, addMarks, deleteMarks, getMarks, singleUpdateMarks } from "../controller/marks.controller.js";
import { auth } from '../middleware/loginAuth.js'
import { schoolauth } from "../middleware/schoolAuth.js";
import { upload } from "../middleware/multer.js";

const router = Router();
router.route('/mark').post(auth, schoolauth, addMarks)

router.route('/addMarksCSV').post(auth, schoolauth, upload.fields([{
    name: 'csvFiles',
    maxCount: 1
}]), addMarkCSV)

router.route('/singleUpdateMarks').put(auth, schoolauth, singleUpdateMarks)
router.route('/deleteMarks').post(auth, schoolauth, deleteMarks)
router.route('/getMarks').post(auth, getMarks)


export default router