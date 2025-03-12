import { Express } from "express";
import {saveUsers, users} from "./db";

function register(app: Express) {
    app.get("/register", async (req, res) => {
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

            users.push({
                wallet: req.query.wallet as string,
                token: token
            });

            saveUsers();

            res.json({ "token": token });
        } catch (e: any) {
            res.status(400).json({ message: e.message });
        }
    });

    app.get("/wallet", async (req, res) => {
        try {
            if (!req.query.token) {
                res.status(400).json({ message: "Token parameter required!" });
                return;
            }
            for (const user of users) {
                if (user.token !== req.query.token) continue;
                res.json({ "wallet": user.wallet });
                return;
            }
            res.status(404).json({ message: "Token not found!" });
        } catch (e: any) {
            res.status(400).json({ message: e.message });
        }
    });

    app.post("/save-wallet", async (req, res) => {
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

            for (const user of users) {
                if (user.token !== token) continue;
                user.wallet = wallet;
                saveUsers();
                res.status(200).json({ message: "Wallet saved successfully!" });
                return;
            }

            res.status(404).json({ message: "Token not found!" });
        } catch (e: any) {
            res.status(400).json({ message: e.message });
        }
    });
}

export default register;
