"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
function register(app) {
    app.get("/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.query.wallet) {
                res.status(400).json({ message: "Wallet parameter required!" });
                return;
            }
            let token = '';
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            for (let i = 0; i < 10; i++) {
                token += alphabet[Math.floor(Math.random() * alphabet.length)];
            }
            db_1.users.push({
                wallet: req.query.wallet,
                token: token
            });
            (0, db_1.saveUsers)();
            res.json({ "token": token });
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    }));
    app.get("/wallet", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.query.token) {
                res.status(400).json({ message: "Token parameter required!" });
                return;
            }
            for (const user of db_1.users) {
                if (user.token !== req.query.token)
                    continue;
                res.json({ "wallet": user.wallet });
                return;
            }
            res.status(404).json({ message: "Token not found!" });
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    }));
    app.post("/save-wallet", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { token, wallet } = req.body;
            if (!token) {
                res.status(400).json({ message: "Token parameter required!" });
                return;
            }
            if (!wallet) {
                res.status(400).json({ message: "Wallet parameter required!" });
                return;
            }
            for (const user of db_1.users) {
                if (user.token !== token)
                    continue;
                user.wallet = wallet;
                (0, db_1.saveUsers)();
                res.status(200).json({ message: "Wallet saved successfully!" });
                return;
            }
            res.status(404).json({ message: "Token not found!" });
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    }));
}
exports.default = register;
