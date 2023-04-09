import {readdir,stat} from 'node:fs/promises';
import * as path from 'path';
import {fileType, FsFile} from '../types/IFileTypes'
import logger from '../lib/logger'
import {awaitWrap} from '../until/promiseHandle'
async function loadDirs(dirPath:string):Promise<(Error | FsFile[])[]>{
    let fsFiles: FsFile[] = [];
    let err,files,stats;
    try{
        // logger.info(filePath)
        [err,files] = await awaitWrap(readdir(dirPath));
        if(err){
            // logger.error(`读取目录${dirPath}失败,msg:${e.message}`,e)
            return [err,null];
        }
        // logger.info(files)
        for (const file of files){
            let newFileItem:FsFile;
            const _filepath = path.join(dirPath, file);
            newFileItem = {
                cloudMatch: false,
                name: file,
                path: _filepath,
                type: undefined
            };
            [err,stats] = await awaitWrap(stat(_filepath));
            if(err){
                // 无法读取文件状态
                logger.error(`无法获取文件信息${_filepath}失败,msg:${err.message}`,err);
                newFileItem.loadInfo = false;
                newFileItem.errTips = err.message;
                newFileItem.type = fileType.notRead;
            }else{
                const isFile = stats.isFile();// 是否为文件
                // const isDir = stats.isDirectory(); // 是否为文件夹
                newFileItem.type =  isFile?fileType.file:fileType.dir;
                // logger.info(newFileItem);
            }
            fsFiles.push(newFileItem);
        }
        return [null,fsFiles];
    }catch (e) {
        logger.error(`读取目录${dirPath}失败,msg:${e.message}`,e)
        return [e,null];
    }
}

export default {
    loadDirs
}
