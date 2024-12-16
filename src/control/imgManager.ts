import path from "path";
import logger from "../lib/logger";
import * as fs from "fs";
import {loadCustomConfig} from "../until/loadConfig";

export enum MvMode{
    move,
    copy
}
export interface MvOptions{
    checkPath:string,
    targetPath:string,
    extName: string,
    mvMode: MvMode,
    // 检查子文件夹
    checkSubDir: boolean,
    minRating: number,// 最小评级
}

interface FileCount {
    child: string[], // 文件名
    rating: number, // 文件评级
}



const customConfig = loadCustomConfig("config/Custom.json");

export function showDirs ():string[]{
    if (!customConfig){
        return [];
    }
    let imagePath = customConfig.imgDir;
    let dirs = fs.readdirSync(imagePath);
    return dirs;
}

/**
 * <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 7.0-c000 1.000000, 0000/00/00-00:00:00        ">
 *  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
 *   <rdf:Description rdf:about=""
 *     xmlns:xmp="http://ns.adobe.com/xap/1.0/"
 *     xmlns:tiff="http://ns.adobe.com/tiff/1.0/"
 *     xmlns:exif="http://ns.adobe.com/exif/1.0/"
 *     xmlns:aux="http://ns.adobe.com/exif/1.0/aux/"
 *     xmlns:exifEX="http://cipa.jp/exif/1.0/"
 *     xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
 *     xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/"
 *     xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#"
 *     xmlns:dc="http://purl.org/dc/elements/1.1/"
 *     xmlns:crd="http://ns.adobe.com/camera-raw-defaults/1.0/"
 *    xmp:Rating="4"
 *    xmp:CreatorTool="ILCE-7C v2.00"
 *    xmp:ModifyDate="2024-12-15T14:17:28.732+08:00"
 *    xmp:CreateDate="2024-12-15T14:17:28.732+08:00"
 * @param filePath
 */
function _parseXmpFile(filePath: string): number
{
    // 读取xmp文件 获取 Rating
    let xmpFile = fs.readFileSync(filePath)
    let rating: number = 0;
    // logger.info(xmpFile.toString());
    xmpFile.toString().split('\n').forEach(line => {
        // 判断xmp:Rating是否存在
        if (line.includes('xmp:Rating')){
            // 获取xmp:Rating的值
            rating = parseInt(line.split('"')[1]);
            // logger.info(`filepath: ${filePath} rating: ${rating}`);
        }
    })
    return rating
}


function getImgRating(filePath: string): number
{
    let rating: number = 0;
    // 获取文件后缀
    let ext = path.extname(filePath);
    console.log(ext);
    switch (ext) {
        case '.xmp':
            rating = _parseXmpFile(filePath);
            break;
        default:
            logger.info("this file not support");
            break;
    }
    return rating;
}

export function mvImgFile(mvOptions: MvOptions): number
{
    if (!customConfig){
        return -1;
    }
    console.log(mvOptions);
    let imagePath = customConfig.imgDir;
    let baseDirPath = path.join(imagePath, mvOptions.checkPath);
    let targetDirPath = path.join(imagePath, mvOptions.targetPath);
    let files = fs.readdirSync(baseDirPath);
    let len = files.length;
    let fileNameCount: {[key: string]:FileCount} = {};
    let movedTotal = 0;
    // 获取文件评分
    for (let i = 0; i < len; i++)
    {
        let dir = files[i];
        let baseName = path.basename(dir);
        // 获取文件名 无后缀
        baseName = baseName.split('.')[0];
        let dirPath = path.join(baseDirPath, dir);
        if (!fileNameCount[baseName]){
            fileNameCount[baseName] = {
                child: [],
                rating: -1
            };
        }
        fileNameCount[baseName].child.push(dir)
        // 添加至其中
        if (mvOptions.checkSubDir && fs.statSync(dirPath).isDirectory()) {
            // 添加至dirs后方
            files.push(...fs.readdirSync(dirPath));
            len += files.length;
        }
        // 判断文件后缀是否为mvOptions.extName
        if (mvOptions.extName !== undefined && !dir.endsWith(mvOptions.extName)) {
            continue;
        }
        // 获取文件评分
        let rating = getImgRating(dirPath);
        // logger.info(`${baseName} 评分为 ${rating}`);

        if (rating >= mvOptions.minRating) {
            fileNameCount[baseName].rating = rating;
        }
    }

    // 评分筛选
    // let passFile: FileCount[] = [];
    // for (let key in fileNameCount) {
    //     if (fileNameCount[key].rating >= mvOptions.minRating) {
    //         passFile.push(fileNameCount[key]);
    //     }
    // }
    // 创建目标文件夹
    if (!fs.existsSync(targetDirPath)) {
        fs.mkdirSync(targetDirPath);
    }
    for (let key in fileNameCount) {
        if (fileNameCount[key].rating < mvOptions.minRating)
        {
            continue;
        }
        movedTotal ++;
        let passFile = fileNameCount[key];
        let tmpFn = fs.copyFileSync;
        if (mvOptions.mvMode === MvMode.move)
        {
            tmpFn = fs.renameSync;
        }
        else {
            tmpFn = fs.copyFileSync;
        }
        console.log(passFile)
        logger.info(`移动文件 file ${key}`);

        for (let j = 0; j < passFile.child.length; j++)
        {
            logger.info(`正在转移文件 ${passFile.child[j]}`)

            tmpFn(path.join(baseDirPath, passFile.child[j]), path.join(targetDirPath, passFile.child[j]))
        }
    }
    return movedTotal;
}
