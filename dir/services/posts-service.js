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
exports.postsService = void 0;
const posts_repository_1 = require("../Repositories/posts-repository");
exports.postsService = {
    getPosts: () => __awaiter(void 0, void 0, void 0, function* () { return yield posts_repository_1.postsRepositories.getPosts(); }),
    createPost: ({ content, bloggerId, shortDescription, title }) => __awaiter(void 0, void 0, void 0, function* () {
        const newPost = {
            id: Number(new Date()).toString(),
            title,
            shortDescription,
            content,
            bloggerId: bloggerId.toString(),
        };
        return yield posts_repository_1.postsRepositories.createPost(newPost);
    }),
    updatePost: ({ content, bloggerId, shortDescription, title, postId }) => __awaiter(void 0, void 0, void 0, function* () {
        const newPost = {
            id: Number(new Date()).toString(),
            title,
            shortDescription,
            content,
            bloggerId: bloggerId.toString(),
        };
        return yield posts_repository_1.postsRepositories.updatePost(newPost, postId);
    }),
    getCurrentPost: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield posts_repository_1.postsRepositories.getCurrentPost(postId);
    }),
    deletedPost: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield posts_repository_1.postsRepositories.deletedPost(postId);
    }),
};
//# sourceMappingURL=posts-service.js.map