// const router = require('express').Router();
import {Router} from "express"
import fs from "./fs"
import qqHook from "./qqHook";
import pcControl from "./pcControl";
import imgControl from "./imgControl";
const router = Router();
router.use("/fs",fs);
router.use("/iq",qqHook);
router.use("/pcc",pcControl);
router.use("/img", imgControl);

export default router;
