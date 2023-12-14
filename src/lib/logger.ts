import winston from 'winston'
import dailyRotateFile from 'winston-daily-rotate-file'
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}


const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors)



// 计算日志文件时间 YYYY-MM-DD
function computeTimestamp() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${month}-${day}`;
}

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const dailyRotateFileOption = {
    format: winston.format.uncolorize(),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '30d',
}
const transports = [
    new winston.transports.Console(),
    new dailyRotateFile({
        ...dailyRotateFileOption,
        filename: `logs/%DATE%-error.log`,
        level: 'error'
    }),
    new dailyRotateFile({
        ...dailyRotateFileOption,
        filename: `logs/%DATE%-all.log`,
    })

]

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

export default Logger
