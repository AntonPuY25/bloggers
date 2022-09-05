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
exports.postsRepositories = void 0;
const bloggers_repository_1 = require("./bloggers-repository");
const post_scheme_1 = require("../DB/post-scheme");
exports.postsRepositories = {
    getPosts: () => __awaiter(void 0, void 0, void 0, function* () {
        return post_scheme_1.PostsModel.find()
            .then((result) => result)
            .catch(() => null);
    }),
    createPost: (post) => __awaiter(void 0, void 0, void 0, function* () {
        const currentBlogger = yield bloggers_repository_1.bloggersRepository.getCurrentBlogger(post.bloggerId);
        if (currentBlogger) {
            post.bloggerName = currentBlogger.name;
            const currentPost = new post_scheme_1.PostsModel(post);
            return currentPost.save()
                .then((result) => result)
                .catch(() => null);
        }
    }),
    getCurrentPost: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        return post_scheme_1.PostsModel.findOne({ id: postId })
            .then((result) => result)
            .catch((error) => null);
    }),
    updatePost: (post, postId) => __awaiter(void 0, void 0, void 0, function* () {
        const currentBlogger = yield bloggers_repository_1.bloggersRepository.getCurrentBlogger(post.bloggerId);
        if (currentBlogger) {
            const currentPost = yield exports.postsRepositories.getCurrentPost(postId);
            if (currentPost) {
                post.bloggerName = currentBlogger.name;
                return post_scheme_1.PostsModel.updateOne({ id: postId }, {
                    $set: {
                        title: post.title,
                        shortDescription: post.shortDescription,
                        content: post.content
                    }
                })
                    .then((result) => result)
                    .catch((error) => null);
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }),
    deletedPost: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        const currentPost = yield exports.postsRepositories.getCurrentPost(postId);
        if (currentPost) {
            return post_scheme_1.PostsModel.deleteOne({ id: postId })
                .then((result) => result)
                .catch((error) => null);
        }
    }),
};
//# sourceMappingURL=posts-repository.js.map