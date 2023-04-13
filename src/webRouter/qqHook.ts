import {Router} from "express"

import logger from "../lib/logger"
import errCode from "../types/IErrorCode";
import {createCheckHandle} from "../middleware/checkParamsMiddleware"
import {loadFileConfig} from "../until/loadConfig";
import {GeneralPost, GeneralMessagePost, GeneralMetaPost, GeneralNoticePost} from "../types/goQQ/GeneralPostType";
import {ReceiveOfflineFileModType} from "../types/goQQ/Mod"
const router = Router();

router.use('/b',((req, res) => {
    // 1. 事件类型处理
    // 2. 执行不同函数
    const data: GeneralPost = req.body;
    switch (data.post_type){
        case "message":
            const message: GeneralMessagePost = data as any;

            if (message.message_type === 'private') {
                // bindFriendMessageReply(CqWebsocket, message as FriendMessageType);
                // friendMessageHandler(message as any);
                logger.info(`收到用户${message.user_id}信息${message.message}`);
            } else if (message.message_type === 'group') {
                logger.info(`收到群聊${message.user_id}信息${message.message}`);
                // bindGroupMessageReply(CqWebsocket, message as GroupMessageType);
                // groupMessageHandler(message as any);
            }
            break
        case "meta_event":
            // logger.info(`收到群聊${message.user_id}信息${message.message}`);
            const GeneralMeta: GeneralMetaPost = data as any;
            logger.info(GeneralMeta);
            logger.info(`收到元数据,含义${GeneralMeta.post_MetaEvent_Type==='heartbeat'?'心跳':'生命周期'}`)
            break
        case "notice":
            const noticeData: GeneralNoticePost = data as any;

            logger.info(noticeData);
            if(noticeData.notice_type === 'offline_file'){
                // const offline: ReceiveOfflineFileType = noticeData
                const receiveOfflineMods: ReceiveOfflineFileModType[] = [];
                // logger.info(`收到用户${noticeData.user_id}的离线文件`)
                receiveOfflineMods.forEach((item : ReceiveOfflineFileModType)=>{
                    logger.info(`离线文件: ${item.name}`)
                    logger.info(item);
                })

            }
            break
        case "request":
            break
    }
    // switch (jsonData.Post_Type) {
    //
    // }
    res.json(errCode.SUCCESS);
}));

router.use('*',((req, res) => {
    logger.info(req.query);
    logger.info(req.body);
    res.json(errCode.SUCCESS);
}));
export default router;
