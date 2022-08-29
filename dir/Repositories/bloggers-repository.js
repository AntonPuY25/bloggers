"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloggersRepository = exports.bloggers = void 0;
exports.bloggers = [
    { id: 1, name: 'Anton', youtubeUrl: 'https://www.youtube.com/watch?v=9CL34BQxmEs&t=9717s' },
    { id: 2, name: 'Yana', youtubeUrl: 'https://www.youtube.com/watch?v=9CL34BQxmEs&t=9717s' },
    { id: 3, name: 'Byklya', youtubeUrl: 'https://www.youtube.com/watch?v=9CL34BQxmEs&t=9717s' },
    { id: 4, name: 'Kirill', youtubeUrl: 'https://www.youtube.com/watch?v=9CL34BQxmEs&t=9717s' },
    { id: 5, name: 'Bob', youtubeUrl: 'https://www.youtube.com/watch?v=9CL34BQxmEs&t=9717s' },
];
exports.bloggersRepository = {
    getBloggers: () => exports.bloggers,
    createBlogger: ({ youtubeUrl, name }) => {
        const newBlogger = {
            id: +(new Date()),
            name,
            youtubeUrl,
        };
        exports.bloggers.push(newBlogger);
        return newBlogger;
    },
    getCurrentBlogger: (bloggerId) => {
        const currentBlogger = exports.bloggers.find(({ id }) => id === bloggerId);
        if (currentBlogger) {
            return currentBlogger;
        }
    },
    updateBlogger: ({ bloggerId, name, youtubeUrl }) => {
        const currentBloggerId = exports.bloggers.findIndex(({ id }) => id === bloggerId);
        if (currentBloggerId) {
            const currentBlogger = exports.bloggers[currentBloggerId];
            const newBlogger = {
                id: currentBlogger.id,
                name,
                youtubeUrl,
            };
            return exports.bloggers.splice(currentBloggerId, 1, newBlogger);
        }
    },
    deleteBlogger: (bloggerId) => {
        const currentBloggerId = exports.bloggers.findIndex(({ id }) => id === bloggerId);
        if (currentBloggerId) {
            return exports.bloggers.splice(currentBloggerId, 1);
        }
    },
};
//# sourceMappingURL=bloggers-repository.js.map