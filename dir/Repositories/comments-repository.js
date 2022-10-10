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
exports.commentsRepository = void 0;
const comments_scheme_1 = require("../DB/comments-scheme");
const helpers_1 = require("../helpers/helpers");
exports.commentsRepository = {
    createComment({ content, userId, postId, userLogin }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentComment = {
                id: Number(new Date()).toString(),
                content,
                userId,
                userLogin,
                postId,
            };
            const currentBlogger = new comments_scheme_1.CommentsModel(currentComment);
            try {
                const result = yield currentBlogger.save();
                return {
                    id: result.id,
                    userId: result.userId,
                    content: result.content,
                    userLogin: result.userLogin,
                    createdAt: result.createdAt,
                };
            }
            catch (e) {
                return null;
            }
        });
    },
    getCommentsForCurrentPost({ postId, sortBy, sortDirection, pageNumber, pageSize }) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipCount = (0, helpers_1.getSkipCountData)(pageNumber, pageSize);
            const sortCreateData = (0, helpers_1.getSortCreatedData)(sortBy);
            const sortDirectionData = (0, helpers_1.getSortDirectionData)(sortDirection);
            const totalCount = yield comments_scheme_1.CommentsModel.find({ postId: postId }).count();
            const pagesCount = (0, helpers_1.getPagesCountData)(totalCount, pageSize);
            try {
                const result = yield comments_scheme_1.CommentsModel.find({ postId: postId }).skip(skipCount)
                    .limit(pageSize)
                    .sort({ [sortCreateData]: sortDirectionData });
                if (result.length) {
                    const items = result.reduce((acc, item) => {
                        const newComment = {
                            id: item.id,
                            userId: item.userId,
                            content: item.content,
                            userLogin: item.userLogin,
                            createdAt: item.createdAt
                        };
                        acc.push(newComment);
                        return acc;
                    }, []);
                    return {
                        pagesCount,
                        page: Number(pageNumber),
                        pageSize: Number(pageSize),
                        totalCount: Number(totalCount),
                        items,
                    };
                }
                else {
                    return null;
                }
            }
            catch (e) {
                return null;
            }
        });
    },
    getCurrentComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield comments_scheme_1.CommentsModel.find({ id: commentId });
                if (result.length) {
                    const { id, userId, content, userLogin, createdAt } = result[0];
                    return {
                        id,
                        userId,
                        content,
                        userLogin,
                        createdAt
                    };
                }
                else {
                    return null;
                }
            }
            catch (e) {
                return null;
            }
        });
    },
    updateCurrentComment(commentId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return comments_scheme_1.CommentsModel.updateOne({ id: commentId }, {
                    $set: {
                        content: content,
                    }
                });
            }
            catch (e) {
                return null;
            }
        });
    },
    deleteCurrentComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return comments_scheme_1.CommentsModel.deleteOne({ id: commentId });
            }
            catch (e) {
                return null;
            }
        });
    }
};
//# sourceMappingURL=comments-repository.js.map