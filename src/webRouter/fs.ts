// const router = require('express').Router();
import path from "path"
import {Router} from "express"

import {createCheckHandle} from "../middleware/checkParamsMiddleware"
import {loadFileConfig} from "../until/loadConfig";
import logger from "../lib/logger"
import errCode from "../types/IErrorCode";
import {paramSource} from "../types/IHttpParam";
import  loadFile from "../lib/loadFiles"
const fileConfig = loadFileConfig("./config/file.json");

const router = Router();
router.get("/readdir",
    createCheckHandle(
        [{
            key: "path",
            default: "/",
            source: paramSource.query
        }]
    ),
    async (req,res)=>{
    if(fileConfig === undefined){
        logger.info("未成功加载配置文件");
        return res.json(errCode.Server_Error)
    }
    try{
        let queryPath:string = req.query.path as string;
        logger.info(queryPath);
        let filePath = path.join(fileConfig.baseFile,queryPath);
        logger.info(filePath);
        let [err,results] = await loadFile.loadDirs(filePath);
        if(err){
            res.json(errCode.Server_Error);
            return
        }
       logger.info(results)
        res.json(results);
    }catch (e) {
        logger.error(e)
        res.json(errCode.Not_Found);
    }
});
export default router;
