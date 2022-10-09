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
exports.commentsRoute = void 0;
const express_1 = require("express");
const middleWares_1 = require("../middleWares/middleWares");
const comments_repository_1 = require("../Repositories/comments-repository");
exports.commentsRoute = (0, express_1.Router)({});
exports.commentsRoute.get('/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const currentComment = yield comments_repository_1.commentsRepository.getCurrentComment(commentId);
    if (currentComment) {
        res.status(200).send(currentComment);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.commentsRoute.put('/:commentId', middleWares_1.authMiddleWare, middleWares_1.contentCommentValidator, middleWares_1.errorMiddleWAre, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const { commentId } = req.params;
    const currentComment = yield comments_repository_1.commentsRepository.getCurrentComment(commentId);
    if (currentComment) {
        const result = yield comments_repository_1.commentsRepository.updateCurrentComment(commentId, content);
        if (result) {
            res.sendStatus(204);
        }
        else {
            res.sendStatus(404);
        }
    }
    else {
        res.sendStatus(403);
    }
}));
exports.commentsRoute.delete('/:commentId', middleWares_1.authMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const currentComment = yield comments_repository_1.commentsRepository.getCurrentComment(commentId);
    if (currentComment) {
        const result = yield comments_repository_1.commentsRepository.deleteCurrentComment(commentId);
        if (result) {
            res.sendStatus(204);
        }
        else {
            res.sendStatus(403);
        }
    }
    else {
        res.sendStatus(404);
    }
}));
//# sourceMappingURL=comments-route.js.map