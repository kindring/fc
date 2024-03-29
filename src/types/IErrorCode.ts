
/**
 * 与外部系统交互时的错误类型定义
 */

export declare const SUCCESS: {
    code:0,
    msg:"ok",
    logType: "info",
    logTip: "调用成功"
}
export declare const Err_Missing_Param:  {
    code:1,
    msg:"missing_param",
    logType: "info",
    logTip: "缺少必须参数"
}
export declare const Error_Param:  {
    code:2,
    msg:"input error param",
    logType: "warn",
    logTip: "错误的输入参数"
}
export declare const Permission_Error:  {
    code:3,
    msg:"Permission error disallow access ",
    logType: "warn",
    logTip: "无法访问该资源,权限错误"
}

export declare const Not_Found:  {
    code:4,
    msg:"not found data",
    logType: "warn",
    logTip: "无法找到对应资源"
}

export declare const Server_Error:  {
    code:5,
    msg:"server error",
    logType: "error",
    logTip: "服务异常"
}

export  default {
    SUCCESS,
    Server_Error,
    Not_Found,
    Permission_Error,
    Error_Param,
    Err_Missing_Param
}
