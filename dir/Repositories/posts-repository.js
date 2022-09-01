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
                id: Number(new Date()),
                title,
                shortDescription,
                content,
                bloggerId: Number(bloggerId),
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
                    id: postId,
                    title,
                    shortDescription,
                    content,
                    bloggerId: Number(bloggerId),
                    bloggerName: currentBlogger.name
                };
                return store_1.posts.splice(currentPostId, 1, newPost);
            }
        }
        else {
            return -1;
        }
    },
    deletedPost: (postId) => {
        console.log(postId, 'postId');
        const currentPostId = store_1.posts.findIndex(({ id }) => id === postId);
        console.log(currentPostId, 'currentPostId');
        if (currentPostId !== -1) {
            return store_1.posts.splice(currentPostId, 1);
        }
    },
};
//# sourceMappingURL=posts-repository.js.map