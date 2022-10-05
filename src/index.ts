import cors from "cors";
import {Request, Response} from "express";
import {bloggersRoute} from "./Routes/bloggers-route";
import bodyParser from "body-parser";
import {postsRoute} from "./Routes/posts-route";
import {testingRoute} from "./Routes/testing-route";
import mongoose from "mongoose";
import {usersRoute} from "./Routes/usersRoute";
import {authRoute} from "./Routes/auth-route";
import {settings} from "./settings/settings";
import {commentsRoute} from "./Routes/comments-route";

const express = require('express')
const app = express()
const port = settings.MONGO_URI

app.use(cors())
app.use(bodyParser())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

const mongoUri = 'mongodb+srv://PuY:5718096010@cluster0.kusse.mongodb.net/Lesson?retryWrites=true&w=majority';

app.use('/blogs', bloggersRoute)
app.use('/posts', postsRoute)
app.use('/users', usersRoute)
app.use('/testing', testingRoute)
app.use('/auth', authRoute)
app.use('/comments', commentsRoute)

app.listen(port, async () => {
    await mongoose.connect(mongoUri)
        .then((res) => console.log('success'))
        .catch((error) => console.log('error'))
    console.log(`Example app listening on port ${port}`)
})