"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloggersRepository = void 0;
const store_1 = require("../DB/store");
exports.bloggersRepository = {
    getBloggers: () => store_1.bloggers,
    createBlogger: ({ youtubeUrl, name }) => {
        const newBlogger = {
            id: new Date().toString(),
            name,
            youtubeUrl,
        };
        store_1.bloggers.push(newBlogger);
        return newBlogger;
    },
    getCurrentBlogger: (bloggerId) => {
        const currentBlogger = store_1.bloggers.find(({ id }) => id === bloggerId);
        if (currentBlogger) {
            return currentBlogger;
        }
    },
    updateBlogger: ({ bloggerId, name, youtubeUrl }) => {
        const currentBloggerId = store_1.bloggers.findIndex(({ id }) => id === bloggerId);
        if (currentBloggerId !== -1) {
            const currentBlogger = store_1.bloggers[currentBloggerId];
            const newBlogger = {
                id: currentBlogger.id,
                name,
                youtubeUrl,
            };
            return store_1.bloggers.splice(currentBloggerId, 1, newBlogger);
        }
    },
    deleteBlogger: (bloggerId) => {
        const currentBloggerId = store_1.bloggers.findIndex(({ id }) => id === bloggerId);
        if (currentBloggerId !== -1) {
            return store_1.bloggers.splice(currentBloggerId, 1);
        }
    },
};
//# sourceMappingURL=bloggers-repository.js.map