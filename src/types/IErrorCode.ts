
/**
 * 与外部系统交互时的错误类型定义
 */

declare const SUCCESS:  {
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
declare const Error_Param:  {
    code:2,
    msg:"input error param",
    logType: "warn",
    logTip: "错误的输入参数"
}
declare const Permission_Error:  {
    code:3,
    msg:"Permission error disallow access ",
    logType: "warn",
    logTip: "无法访问该资源,权限错误"
}

declare const Not_Found:  {
    code:4,
    msg:"not found data",
    logType: "warn",
    logTip: "无法找到对应资源"
}

declare const Server_Error:  {
    code:5,
    msg:"server error",
    logType: "error",
    logTip: "服务异常"
}
export const enum IErrorCode{
    SUCCESS = SUCCESS,
    Err_Missing_Param = Err_Missing_Param,
    Error_Param = Error_Param,
    Permission_Error = Permission_Error,
    Not_Found = Not_Found,
    Server_Error = Server_Error,
}
