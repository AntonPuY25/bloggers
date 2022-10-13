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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const bloggers_route_1 = require("./Routes/bloggers-route");
const body_parser_1 = __importDefault(require("body-parser"));
const posts_route_1 = require("./Routes/posts-route");
const testing_route_1 = require("./Routes/testing-route");
const mongoose_1 = __importDefault(require("mongoose"));
const usersRoute_1 = require("./Routes/usersRoute");
const auth_route_1 = require("./Routes/auth-route");
const settings_1 = require("./settings/settings");
const comments_route_1 = require("./Routes/comments-route");
const email_router_1 = require("./Routes/email-router");
const test_route_1 = require("./Routes/test-route");
const express = require('express');
exports.app = express();
const port = settings_1.settings.MONGO_URI;
exports.app.use((0, cors_1.default)());
exports.app.use((0, body_parser_1.default)());
exports.app.get('/', (req, res) => {
    res.send('Hello World!');
});
const mongoUri = 'mongodb+srv://PuY:5718096010@cluster0.kusse.mongodb.net/Lesson?retryWrites=true&w=majority';
exports.app.use('/blogs', bloggers_route_1.bloggersRoute);
exports.app.use('/posts', posts_route_1.postsRoute);
exports.app.use('/users', usersRoute_1.usersRoute);
exports.app.use('/testing', testing_route_1.testingRoute);
exports.app.use('/auth', auth_route_1.authRoute);
exports.app.use('/comments', comments_route_1.commentsRoute);
exports.app.use('/email', email_router_1.emailRouter);
exports.app.use('/test', test_route_1.testRouter);
exports.app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(mongoUri)
        .then((res) => console.log('success'))
        .catch((error) => console.log('error'));
    console.log(`Example app listening on port ${port}`);
}));
//# sourceMappingURL=index.js.map