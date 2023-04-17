import * as fs from 'fs';

interface ServerConf{
    webPort: number,
}
export function loadServerConfig(configPath:string):ServerConf{
    if (fs.existsSync(configPath)) //判断是否存在此文件
    {
        //读取文件内容，并转化为Json对象
        return JSON.parse(fs.readFileSync(configPath, "utf8"));
    }else{
        // 无法找到该路径文件
        return null;
    }
}

interface FileConf{
    baseFile: string
}
export function loadFileConfig(configPath:string):FileConf{
    if (fs.existsSync(configPath)) //判断是否存在此文件
    {
        //读取文件内容，并转化为Json对象
        return JSON.parse(fs.readFileSync(configPath, "utf8"));
    }else{
        // 无法找到该路径文件
        return null;
    }
}

interface CustomConf{
    mainPc: {
        mac: string
    }
}
export function loadCustomConfig(configPath:string):CustomConf{
    if (fs.existsSync(configPath)) //判断是否存在此文件
    {
        //读取文件内容，并转化为Json对象
        return JSON.parse(fs.readFileSync(configPath, "utf8"));
    }else{
        // 无法找到该路径文件
        return null;
    }
}
