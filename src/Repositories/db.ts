import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

// Connection URL
const url = process.env.MONGO_URI;

if (!url) {
    throw new Error('❗ Url doesn\'t found')
}

export const runDb = async () => {
    try {
        await mongoose.connect(url);
        console.log('✅ Connected successfully to server');
    } catch (e) {
        console.log('❗ Don\'t connected successfully to server');

    }
};