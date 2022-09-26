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
exports.bloggersRoute = void 0;
const express_1 = require("express");
const middleWares_1 = require("../middleWares/middleWares");
const bloggers_service_1 = require("../services/bloggers-service");
const query_bloggers_repository_1 = require("../Repositories/queryReposotories/query-bloggers-repository");
const posts_service_1 = require("../services/posts-service");
const query_posts_repository_1 = require("../Repositories/queryReposotories/query-posts-repository");
exports.bloggersRoute = (0, express_1.Router)({});
exports.bloggersRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = req.query;
    res.send(yield query_bloggers_repository_1.queryBloggersRepository.getBloggers({
        pageSize: pageSize ? Number(pageSize) : 10,
        pageNumber: pageNumber ? Number(pageNumber) : 1,
        sortBy: sortBy,
        sortDirection: sortDirection,
        searchNameTerm: searchNameTerm
    }));
}));
exports.bloggersRoute.post('/', middleWares_1.authorizationMiddleWare, middleWares_1.nameValidator, middleWares_1.urlValidator, middleWares_1.errorMiddleWAre, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, youtubeUrl } = req.body;
    const currentBlogger = yield bloggers_service_1.bloggersService.createBlogger({ name, youtubeUrl });
    if (currentBlogger) {
        const newBlogger = {
            id: currentBlogger.id,
            name: currentBlogger.name,
            youtubeUrl: currentBlogger.youtubeUrl,
            createdAt: currentBlogger.createdAt,
        };
        res.status(201).send(newBlogger);
    }
    else {
        res.send(404);
    }
}));
exports.bloggersRoute.post('/:blogId/posts', middleWares_1.authorizationMiddleWare, middleWares_1.titleValidator, middleWares_1.descriptionValidator, middleWares_1.contentValidator, middleWares_1.errorMiddleWAre, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const currentBlogger = yield posts_service_1.postsService.createPost(Object.assign(Object.assign({}, req.body), { blogId }));
    if (currentBlogger) {
        res.status(201).send(currentBlogger);
    }
    else {
        res.send(404);
    }
}));
exports.bloggersRoute.get('/:blogId/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const { pageNumber, pageSize, sortBy, sortDirection } = req.query;
    const currentBlogger = yield query_posts_repository_1.queryPostsRepository.getPosts({
        pageSize: pageSize ? Number(pageSize) : 10,
        pageNumber: pageNumber ? Number(pageNumber) : 1,
        sortBy: sortBy,
        sortDirection: sortDirection,
        blogId: blogId
    });
    if (currentBlogger) {
        res.status(200).send(currentBlogger);
    }
    else {
        res.send(404);
    }
}));
exports.bloggersRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const currentBlogger = yield query_bloggers_repository_1.queryBloggersRepository.getCurrentBlogger(blogId);
    if (currentBlogger && blogId) {
        const newBlogger = {
            id: currentBlogger.id,
            name: currentBlogger.name,
            youtubeUrl: currentBlogger.youtubeUrl,
            createdAt: currentBlogger.createdAt,
        };
        res.status(200).send(newBlogger);
    }
    else {
        res.send(404);
    }
}));
exports.bloggersRoute.put('/:id', middleWares_1.authorizationMiddleWare, middleWares_1.nameValidator, middleWares_1.urlValidator, middleWares_1.errorMiddleWAre, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const { name, youtubeUrl } = req.body;
    const currentBlogger = yield bloggers_service_1.bloggersService.updateBlogger({ blogId, name, youtubeUrl });
    if (currentBlogger && blogId) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.bloggersRoute.delete('/:id', middleWares_1.authorizationMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const currentBlogger = yield bloggers_service_1.bloggersService.deleteBlogger(blogId);
    if (currentBlogger && blogId) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
//# sourceMappingURL=bloggers-route.js.map