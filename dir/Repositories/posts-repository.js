"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepositories = void 0;
const store_1 = require("../DB/store");
exports.postsRepositories = {
    getPosts: () => store_1.posts,
    createPost: ({ content, bloggerId, shortDescription, title }) => {
        const currentBlogger = store_1.bloggers.find(({ id }) => id === bloggerId);
        if (currentBlogger) {
            const newPost = {
                id: Number(new Date()).toString(),
                title,
                shortDescription,
                content,
                bloggerId: bloggerId.toString(),
                bloggerName: currentBlogger.name
            };
            store_1.posts.push(newPost);
            return newPost;
        }
    },
    getCurrentPost: (postId) => {
        const currentPost = store_1.posts.find(({ id }) => id === postId);
        if (currentPost) {
            return currentPost;
        }
    },
    updatePost: ({ content, bloggerId, shortDescription, title, postId }) => {
        const currentBlogger = store_1.bloggers.find(({ id }) => id === bloggerId);
        if (currentBlogger) {
            const currentPostId = store_1.posts.findIndex(({ id }) => id === postId);
            if (currentPostId !== -1) {
                const newPost = {
                    id: postId.toString(),
                    title,
                    shortDescription,
                    content,
                    bloggerId: bloggerId.toString(),
                    bloggerName: currentBlogger.name
                };
                return store_1.posts.splice(currentPostId, 1, newPost);
            }
        }
    },
    deletedPost: (postId) => {
        const currentPostId = store_1.posts.findIndex(({ id }) => id === postId);
        if (currentPostId !== -1) {
            return store_1.posts.splice(currentPostId, 1);
        }
    },
};
//# sourceMappingURL=posts-repository.js.map