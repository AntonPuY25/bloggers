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
exports.bloggersService = void 0;
const bloggers_repository_1 = require("../Repositories/bloggers-repository");
exports.bloggersService = {
    getBloggers: () => __awaiter(void 0, void 0, void 0, function* () {
        const bloggers = yield bloggers_repository_1.bloggersRepository.getBloggers();
        if (bloggers) {
            return bloggers.reduce((acc, item) => {
                const newBlogger = {
                    id: item.id,
                    name: item.name,
                    youtubeUrl: item.youtubeUrl,
                    createdAt: item.createdAt,
                };
                acc.push(newBlogger);
                return acc;
            }, []);
        }
        else {
            return null;
        }
    }),
    createBlogger: ({ youtubeUrl, name }) => __awaiter(void 0, void 0, void 0, function* () {
        const newBlogger = {
            id: Number(new Date()).toString(),
            name,
            youtubeUrl,
        };
        return yield bloggers_repository_1.bloggersRepository.createBlogger(newBlogger);
    }),
    getCurrentBlogger: (bloggerId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield bloggers_repository_1.bloggersRepository.getCurrentBlogger(bloggerId);
    }),
    updateBlogger: ({ bloggerId, name, youtubeUrl }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield bloggers_repository_1.bloggersRepository.updateBlogger({ bloggerId, name, youtubeUrl });
    }),
    deleteBlogger: (bloggerId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield bloggers_repository_1.bloggersRepository.deleteBlogger(bloggerId);
    }),
};
//# sourceMappingURL=bloggers-service.js.map