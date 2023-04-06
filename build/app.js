"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loadConfig_1 = require("./until/loadConfig");
var serverConfig = (0, loadConfig_1.loadServerConfig)('./config/Server.json');
if (serverConfig === null) {
    console.log('无法找到路径');
}
else {
}
var app = (0, express_1.default)();
app.get('/', function (req, res, next) {
    res.send('Hello World!');
});
app.listen(serverConfig.webPort, function () {
    console.log("Example app listening on port ".concat(serverConfig.webPort, "!"));
});
//# sourceMappingURL=app.js.map