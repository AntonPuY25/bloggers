"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloggersRoute = void 0;
const express_1 = require("express");
const bloggers_repository_1 = require("../Repositories/bloggers-repository");
const middleWares_1 = require("../middleWares/middleWares");
exports.bloggersRoute = (0, express_1.Router)({});
exports.bloggersRoute.get('/', (req, res) => {
    res.send(bloggers_repository_1.bloggersRepository.getBloggers());
});
exports.bloggersRoute.post('/', middleWares_1.nameValidator, middleWares_1.urlValidator, middleWares_1.errorMiddleWAre, (req, res) => {
    const { name, youtubeUrl } = req.body;
    const currentBlogger = bloggers_repository_1.bloggersRepository.createBlogger({ name, youtubeUrl });
    res.status(201).send(currentBlogger);
});
exports.bloggersRoute.get('/:id', (req, res) => {
    const bloggerId = Number(req.params.id);
    const currentBlogger = bloggers_repository_1.bloggersRepository.getCurrentBlogger(bloggerId);
    if (currentBlogger && bloggerId) {
        res.status(200).send(currentBlogger);
    }
    else {
        res.send(404);
    }
});
exports.bloggersRoute.put('/:id', middleWares_1.nameValidator, middleWares_1.urlValidator, middleWares_1.errorMiddleWAre, (req, res) => {
    const bloggerId = Number(req.params.id);
    const { name, youtubeUrl } = req.body;
    const currentBlogger = bloggers_repository_1.bloggersRepository.updateBlogger({ bloggerId, name, youtubeUrl });
    if (currentBlogger && bloggerId) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.bloggersRoute.delete('/:id', (req, res) => {
    const bloggerId = Number(req.params.id);
    const currentBlogger = bloggers_repository_1.bloggersRepository.deleteBlogger(bloggerId);
    if (currentBlogger && bloggerId) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
//# sourceMappingURL=bloggers-route.js.map