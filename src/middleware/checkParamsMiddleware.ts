import Logger from "../lib/logger";
import {IHttpParam, paramSource} from "../types/IHttpParam";
import {IErrorCode,Err_Missing_Param} from "../types/IErrorCode";
import * as ErrorCode  from "../types/IErrorCode";

function createCheckHandle(paramRules?:IHttpParam[]){
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
                if(val==="" || val===null || val===undefined || val===[] || val==={}){
                    res.json(Err_Missing_Param);
                    return Logger.warn(Err_Missing_Param.logTip)
                }
                // 取值
                req.params[paramRule.key] = val;
            }
            // 是否有默认值
            if(paramRule.default){

            }

        }
        next(req,res);
    }

}


