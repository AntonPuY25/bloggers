"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const bloggers_route_1 = require("./Routes/bloggers-route");
const body_parser_1 = __importDefault(require("body-parser"));
const posts_route_1 = require("./Routes/posts-route");
const testing_route_1 = require("./Routes/testing-route");
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use((0, body_parser_1.default)());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/bloggers', bloggers_route_1.bloggersRoute);
app.use('/posts', posts_route_1.postsRoute);
app.use('/testing', testing_route_1.testingRoute);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map