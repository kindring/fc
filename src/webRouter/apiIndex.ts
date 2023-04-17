// const router = require('express').Router();
import {Router} from "express"
import fs from "./fs"
import qqHook from "./qqHook";
import pcControl from "./pcControl";
const router = Router();
router.use("/fs",fs);
router.use("/iq",qqHook);
router.use("/pcc",pcControl);
export default router;
