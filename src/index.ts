import cors from "cors";
import {Request, Response} from "express";
import {bloggersRoute} from "./Routes/bloggers-route";
import {postsRoute} from "./Routes/posts-route";
import {testingRoute} from "./Routes/testing-route";
import {usersRoute} from "./Routes/usersRoute";
import {authRoute} from "./Routes/auth-route";
import {settings} from "./settings/settings";
import {commentsRoute} from "./Routes/comments-route";
import {emailRouter} from "./Routes/email-router";
import * as dotenv from 'dotenv';
import {runDb} from "./Repositories/db";


dotenv.config()
const express = require('express')
export const app = express()
const port = settings.MONGO_URI
const cookieParser = require("cookie-parser");

app.use(cors())
app.use(cookieParser());
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error('Url isn\'t find');
}

app.use('/blogs', bloggersRoute)
app.use('/posts', postsRoute)
app.use('/users', usersRoute)
app.use('/testing', testingRoute)
app.use('/auth', authRoute)
app.use('/comments', commentsRoute)
app.use('/email', emailRouter)


const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()