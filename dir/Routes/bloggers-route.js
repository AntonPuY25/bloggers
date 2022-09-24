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
exports.bloggersRoute = (0, express_1.Router)({});
exports.bloggersRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = req.query;
    res.send(yield query_bloggers_repository_1.queryBloggersRepository.getBloggers({
        pageSize: Number(pageSize),
        pageNumber: Number(pageNumber),
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
exports.bloggersRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bloggerId = req.params.id;
    const currentBlogger = yield query_bloggers_repository_1.queryBloggersRepository.getCurrentBlogger(bloggerId);
    if (currentBlogger && bloggerId) {
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
    const bloggerId = req.params.id;
    const { name, youtubeUrl } = req.body;
    const currentBlogger = yield bloggers_service_1.bloggersService.updateBlogger({ bloggerId, name, youtubeUrl });
    if (currentBlogger && bloggerId) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.bloggersRoute.delete('/:id', middleWares_1.authorizationMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bloggerId = req.params.id;
    const currentBlogger = yield bloggers_service_1.bloggersService.deleteBlogger(bloggerId);
    if (currentBlogger && bloggerId) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
//# sourceMappingURL=bloggers-route.js.map