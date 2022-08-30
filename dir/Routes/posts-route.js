"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoute = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../Repositories/posts-repository");
const middleWares_1 = require("../middleWares/middleWares");
const helpers_1 = require("../helpers/helpers");
exports.postsRoute = (0, express_1.Router)({});
exports.postsRoute.get('/', (req, res) => {
    res.send(posts_repository_1.postsRepositories.getPosts());
});
exports.postsRoute.post('/', middleWares_1.authorizationMiddleWare, middleWares_1.titleValidator, middleWares_1.descriptionValidator, middleWares_1.contentValidator, middleWares_1.bloggerIdValidator, middleWares_1.errorMiddleWAre, (req, res) => {
    const currentPost = posts_repository_1.postsRepositories.createPost(req.body);
    if (currentPost) {
        res.status(201).send(currentPost);
    }
    else {
        res.status(400).send((0, helpers_1.getCurrentFieldError)('bloggerId', 'This blogger not found'));
    }
});
exports.postsRoute.get('/:id', (req, res) => {
    const postId = Number(req.params.id);
    const currentPost = posts_repository_1.postsRepositories.getCurrentPost(postId);
    if (currentPost) {
        res.send(currentPost);
    }
    else {
        res.send(404);
    }
});
exports.postsRoute.put('/:id', middleWares_1.authorizationMiddleWare, middleWares_1.titleValidator, middleWares_1.descriptionValidator, middleWares_1.contentValidator, middleWares_1.bloggerIdValidator, middleWares_1.errorMiddleWAre, (req, res) => {
    const postId = Number(req.params.id);
    const currentPost = posts_repository_1.postsRepositories.updatePost(Object.assign(Object.assign({}, req.body), { postId }));
    if (currentPost === -1) {
        res.status(400).send((0, helpers_1.getCurrentFieldError)('bloggerId', 'Not found this blogger'));
    }
    if (currentPost) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.postsRoute.delete('/:id', middleWares_1.authorizationMiddleWare, (req, res) => {
    const postId = Number(req.params.id);
    const currentPost = posts_repository_1.postsRepositories.deletedPost(postId);
    if (currentPost) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
//# sourceMappingURL=posts-route.js.map