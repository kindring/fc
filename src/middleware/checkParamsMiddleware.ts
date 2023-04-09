
import {IHttpParam, paramSource} from "../types/IHttpParam";
import {Err_Missing_Param} from "../types/IErrorCode";
import logger from "../lib/logger";

export function createCheckHandle(paramRules?:IHttpParam[]){
    return (req,res,next)=>{
        if(!paramRules){
            return next();
        }
        req.params = {};
        for (const paramRule of paramRules) {
            let val:any;
            if(paramRule.source === paramSource.query){
                val = req.query[paramRule.key];
            }else if(paramRule.source === paramSource.body){
                val = req.body[paramRule.key];
            }
            // 判断是否为必须值
            if(paramRule.required){
                // 判断是否有值
                if(val==="" || val===null || val===undefined ){
                    logger.info("default required?")
                    res.json(Err_Missing_Param);
                    return logger.warn(Err_Missing_Param.logTip)
                }
            }
            // 是否有默认值
            if(paramRule.default){
                if(val==="" || val===null || val===undefined){
                    val = paramRule.default;
                    // continue;
                }
            }
            // req.params[paramRule.key] = val;
            if(paramRule.source === paramSource.query){
                req.query[paramRule.key] = val;
            }else if(paramRule.source === paramSource.body){
                req.body[paramRule.key] = val;
            }
        }
        next();
    }

}


