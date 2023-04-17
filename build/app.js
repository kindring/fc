"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var loadConfig_1 = require("./until/loadConfig");
var logger_1 = __importDefault(require("./lib/logger"));
var morganMiddleware_1 = __importDefault(require("./middleware/morganMiddleware"));
var apiIndex_1 = __importDefault(require("./webRouter/apiIndex"));
main();
function main() {
    var serverConfig = (0, loadConfig_1.loadServerConfig)('./config/Server.json');
    if (serverConfig === null) {
        logger_1.default.error("无法加载服务器配置文件");
        throw new Error("无法加载服务器配置文件");
    }
    var app = (0, express_1.default)();
    app.use(morganMiddleware_1.default);
    app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
    app.use(body_parser_1.default.json({ limit: '10mb' }));
    app.get('/', function (req, res, next) {
        res.send('Hello this website is a FC');
    });
    app.use('/api', apiIndex_1.default);
    app.use(function (req, res) {
        res.sendStatus(404);
        // res.send("404");
    });
    app.listen(serverConfig.webPort, function () {
        logger_1.default.info("web\u670D\u52A1\u4EE5\u542F\u52A8,\u76D1\u542C\u7AEF\u53E3\u4E3A: 0.0.0.0:".concat(serverConfig.webPort));
        // console.log(`Example app listening on port ${serverConfig.webPort}!`);
    });
}
//# sourceMappingURL=app.js.map