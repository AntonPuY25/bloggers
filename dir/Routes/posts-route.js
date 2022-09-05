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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoute = void 0;
const express_1 = require("express");
const middleWares_1 = require("../middleWares/middleWares");
const helpers_1 = require("../helpers/helpers");
const posts_service_1 = require("../services/posts-service");
const query_posts_repository_1 = require("../Repositories/queryReposotories/query-posts-repository");
exports.postsRoute = (0, express_1.Router)({});
exports.postsRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield query_posts_repository_1.queryPostsRepository.getPosts());
}));
exports.postsRoute.post('/', middleWares_1.authorizationMiddleWare, middleWares_1.titleValidator, middleWares_1.descriptionValidator, middleWares_1.contentValidator, middleWares_1.bloggerIdValidator, middleWares_1.errorMiddleWAre, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPost = yield posts_service_1.postsService.createPost(req.body);
    if (currentPost) {
        res.status(201).send(currentPost);
    }
    else {
        res.status(400).send((0, helpers_1.getCurrentFieldError)('bloggerId', 'This blogger not found'));
    }
}));
exports.postsRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const currentPost = yield query_posts_repository_1.queryPostsRepository.getCurrentPost(postId);
    if (currentPost) {
        res.send(currentPost);
    }
    else {
        res.send(404);
    }
}));
exports.postsRoute.put('/:id', middleWares_1.authorizationMiddleWare, middleWares_1.titleValidator, middleWares_1.descriptionValidator, middleWares_1.contentValidator, middleWares_1.bloggerIdValidator, middleWares_1.errorMiddleWAre, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const currentPost = yield posts_service_1.postsService.updatePost(Object.assign(Object.assign({}, req.body), { postId }));
    if (currentPost) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.postsRoute.delete('/:id', middleWares_1.authorizationMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const currentPost = yield posts_service_1.postsService.deletedPost(postId);
    if (currentPost) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
//# sourceMappingURL=posts-route.js.map