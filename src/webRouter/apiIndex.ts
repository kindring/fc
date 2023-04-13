// const router = require('express').Router();
import {Router} from "express"
import fs from "./fs"
import qqHook from "./qqHook";
const router = Router();
router.use("/fs",fs);
router.use("/iq",qqHook);
export default router;
