import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import register from './endpoints';

const app = express();

// Enable CORS for all origins
app.use(cors());

// use json for post body
app.use(express.json());

const privateKey = fs.readFileSync('/etc/letsencrypt/live/clc.ix.tc/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/clc.ix.tc/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

register(app);

https.createServer(credentials, app).listen(3000, () => {
    console.log(`Server running on https://clc.ix.tc:3000`);
});
