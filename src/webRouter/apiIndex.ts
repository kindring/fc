// const router = require('express').Router();
import {Router} from "express"
import fs from "./fs"
const router = Router();
router.use("/fs",fs);
export default router;
