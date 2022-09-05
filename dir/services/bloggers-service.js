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
    createBlogger: ({ youtubeUrl, name }) => __awaiter(void 0, void 0, void 0, function* () {
        const newBlogger = {
            id: Number(new Date()).toString(),
            name,
            youtubeUrl,
        };
        return yield bloggers_repository_1.bloggersRepository.createBlogger(newBlogger);
    }),
    updateBlogger: ({ bloggerId, name, youtubeUrl }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield bloggers_repository_1.bloggersRepository.updateBlogger({ bloggerId, name, youtubeUrl });
    }),
    deleteBlogger: (bloggerId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield bloggers_repository_1.bloggersRepository.deleteBlogger(bloggerId);
    }),
};
//# sourceMappingURL=bloggers-service.js.map