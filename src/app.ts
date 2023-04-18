import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser';
import {loadServerConfig} from './until/loadConfig'
import logger from "./lib/logger"
import morganMiddleware from './middleware/morganMiddleware'

import apiIndex from "./webRouter/apiIndex";
main();
function main():void{
    let serverConfig = loadServerConfig('./config/Server.json')
    if(serverConfig === null){
        logger.error("无法加载服务器配置文件");
        throw new Error("无法加载服务器配置文件");
    }
    const app:Application = express();
    app.use(morganMiddleware);
    app.use('/static',express.static('./public/'));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    app.use(bodyParser.json({ limit: '10mb' }));
    app.get('/', (req:Request, res:Response, next:NextFunction) => {
        res.send('Hello this website is a FC');
    });
    app.use('/api',apiIndex);
    app.use((req,res)=>{
        res.sendStatus(404);
        // res.send("404");
    })
    app.listen(serverConfig.webPort, function(){
        logger.info(`web服务以启动,监听端口为: 0.0.0.0:${serverConfig.webPort}`)
        // console.log(`Example app listening on port ${serverConfig.webPort}!`);
    });
}
