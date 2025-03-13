"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
exports.saveUsers = saveUsers;
const fs_1 = __importDefault(require("fs"));
const users = JSON.parse(fs_1.default.readFileSync("users.json", "utf-8"));
exports.users = users;
function saveUsers() {
    fs_1.default.writeFileSync("users.json", JSON.stringify(users));
}
