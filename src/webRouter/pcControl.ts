import {Router} from "express"
import logger from "../lib/logger"
import errCode from "../types/IErrorCode";
import {loadCustomConfig} from "../until/loadConfig";
import {openPc} from "../lib/wol";


const router = Router();
const customConfig = loadCustomConfig("./config/Custom.json");
router.get('/openMain',(req, res)=> {
    if (!customConfig) {
        res.json({
            code:2,
            msg:'loading fail'
        });
        return;
    }
    logger.info(customConfig);
    openPc(customConfig.mainPc.mac);
    res.json({
        code:0,
        msg:'ok'
    });
})

export default router;
