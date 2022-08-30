import cors from "cors";
import {Request,Response} from "express";
import {bloggersRoute} from "./Routes/bloggers-route";
import bodyParser from "body-parser";
import {postsRoute} from "./Routes/posts-route";
import {testingRoute} from "./Routes/testing-route";

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser())

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})

app.use('/bloggers',bloggersRoute)
app.use('/posts',postsRoute)
app.use('/testing',testingRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})