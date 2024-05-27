// config.js
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5555;
export const mongoDBURL = process.env.MONGODB_URL;
export const secret = process.env.SECRET;
export const baseURL = process.env.BASEURL;
export const clientID = process.env.CLIENTID;
export const issuer = process.env.ISSUER;

