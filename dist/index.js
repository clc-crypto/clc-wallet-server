"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const cors_1 = __importDefault(require("cors"));
const endpoints_1 = __importDefault(require("./endpoints"));
const app = (0, express_1.default)();
// Enable CORS for all origins
app.use((0, cors_1.default)());
// use json for post body
app.use(express_1.default.json());
const privateKey = fs_1.default.readFileSync('/etc/letsencrypt/live/clc.ix.tc/privkey.pem', 'utf8');
const certificate = fs_1.default.readFileSync('/etc/letsencrypt/live/clc.ix.tc/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
(0, endpoints_1.default)(app);
https_1.default.createServer(credentials, app).listen(3000, () => {
    console.log(`Server running on https://clc.ix.tc:3000`);
});
