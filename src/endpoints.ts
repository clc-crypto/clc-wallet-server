import { Express } from "express";
import {saveUsers, users} from "./db";

type Report = {
    speed: number;
    mined: number;
    best: string;
    timeStamp: number;
};

const reports: Record<string, Report> = {};

export default function register(app: Express) {
    app.post("/register", async (req, res) => {
        try {
            const { wallet } = req.body;

            if (!wallet) {
                res.status(400).json({ message: "Wallet body parameter required!" });
                return;
            }

            let token = '';
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

            for (let i = 0; i < 15; i++) {
                token += alphabet[Math.floor(Math.random() * alphabet.length)];
            }

            users.push({
                wallet: wallet as string,
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

    app.get("/report", (req, res) => {
        try {
            if (!req.query.user) {
                res.status(400).json({ message: "User parameter required!" });
                return;
            }

            if (!req.query.speed) {
                res.status(400).json({ message: "Speed parameter required!" });
                return;
            }

            if (!req.query.mined) {
                res.status(400).json({ mined: "Speed parameter required!" });
                return;
            }

            if (!req.query.best) {
                res.status(400).json({ message: "Best parameter required!" });
                return;
            }

            reports[req.query.user as string] = {
                speed: parseInt(req.query.speed as string),
                best: req.query.best as string,
                mined: parseInt(req.query.mined as string),
                timeStamp: Date.now()
            };

            res.json({ message: "Success!" });
        } catch (e: any) {
            res.status(400).json({ message: e.message });
        }
    });

    app.get("/report-get", (req, res) => {
        try {
            if (!req.query.user) {
                res.status(400).json({ message: "User parameter required!" });
                return;
            }

            res.status(404).json(reports[req.query.user as string]);
        } catch (e: any) {
            res.status(400).json({ message: e.message });
        }
    });
}