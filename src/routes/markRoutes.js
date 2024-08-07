import { Router } from "express";
import { addMarks } from "../controller/marks.controller.js";

const router = Router();
router.route('/addMarks').post(addMarks)

export default router