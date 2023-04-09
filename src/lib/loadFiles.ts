import * as fs from 'fs';
import {readdir} from 'node:fs/promises';
import * as path from 'path';
import {fileType, FsFile} from '../types/IFileTypes'
import logger from '../lib/logger'

async function loadDirs(filePath:string):Promise<FsFile[]>{
    let fsFiles: FsFile[] = [];
    try{
        const files = await readdir(filePath);
        for (const file of files){
            console.log(file);
            let newFileItem:FsFile;
            const filepath = path.join(filePath, file);
            const stats = fs.statSync(filepath);
            const isFile = stats.isFile();// 是否为文件
            // const isDir = stats.isDirectory(); // 是否为文件夹
            newFileItem.name = file;
            newFileItem.type = isFile?fileType.file:fileType.dir;
            newFileItem.cloudMatch = false;
            newFileItem.path = filepath;
            fsFiles.push(newFileItem);
        }
        return fsFiles;
    }catch (e) {
        logger.error(`读取目录${filePath}失败,msg:${e.message}`,e)
        return null;
    }
}
