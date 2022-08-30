"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepositories = void 0;
const bloggers_repository_1 = require("./bloggers-repository");
const posts = [];
exports.postsRepositories = {
    getPosts: () => posts,
    createPost: ({ content, bloggerId, shortDescription, title }) => {
        const currentBlogger = bloggers_repository_1.bloggers.find(({ id }) => id === Number(bloggerId));
        if (currentBlogger) {
            const newPost = {
                id: Number(new Date()),
                title,
                shortDescription,
                content,
                bloggerId: Number(bloggerId),
                bloggerName: currentBlogger.name
            };
            posts.push(newPost);
            return newPost;
        }
    },
    getCurrentPost: (postId) => {
        const currentPost = posts.find(({ id }) => id === postId);
        if (currentPost) {
            return currentPost;
        }
    },
    updatePost: ({ content, bloggerId, shortDescription, title, postId }) => {
        const currentBlogger = bloggers_repository_1.bloggers.find(({ id }) => id === Number(bloggerId));
        if (currentBlogger) {
            const currentPostId = posts.findIndex(({ id }) => id === postId);
            if (currentPostId !== -1) {
                const newPost = {
                    id: postId,
                    title,
                    shortDescription,
                    content,
                    bloggerId: Number(bloggerId),
                    bloggerName: currentBlogger.name
                };
                return posts.splice(currentPostId, 1, newPost);
            }
        }
    },
    deletedPost: (postId) => {
        console.log(postId, 'postId');
        const currentPostId = posts.findIndex(({ id }) => id === postId);
        console.log(currentPostId, 'currentPostId');
        if (currentPostId !== -1) {
            return posts.splice(currentPostId, 1);
        }
    },
};
//# sourceMappingURL=posts-repository.js.map