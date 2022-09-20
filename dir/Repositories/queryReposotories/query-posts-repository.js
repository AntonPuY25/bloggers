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
exports.queryPostsRepository = void 0;
const post_scheme_1 = require("../../DB/post-scheme");
exports.queryPostsRepository = {
    getPosts: () => __awaiter(void 0, void 0, void 0, function* () {
        return post_scheme_1.PostsModel.find()
            .then((result) => {
            if (result) {
                return result.reduce((acc, item) => {
                    const newPost = {
                        bloggerId: item.bloggerId.toString(),
                        bloggerName: item.bloggerName,
                        content: item.content,
                        createdAt: item.createdAt,
                        id: item.id,
                        shortDescription: item.shortDescription,
                        title: item.title,
                    };
                    acc.push(newPost);
                    return acc;
                }, []);
            }
            else {
                return null;
            }
        })
            .catch(() => null);
    }),
    getCurrentPost: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        return post_scheme_1.PostsModel.findOne({ id: postId })
            .then((result) => {
            if (result) {
                const responsePost = {
                    id: result.id,
                    createdAt: result.createdAt,
                    content: result.content,
                    shortDescription: result.shortDescription,
                    title: result.title,
                    bloggerName: result.bloggerName,
                    bloggerId: result.bloggerId.toString(),
                };
                return responsePost;
            }
            else {
                return null;
            }
        })
            .catch((error) => null);
    }),
};
//# sourceMappingURL=query-posts-repository.js.map