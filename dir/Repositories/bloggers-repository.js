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
exports.bloggersRepository = void 0;
const bloggers_scheme_1 = require("../DB/bloggers-scheme");
exports.bloggersRepository = {
    getBloggers: () => __awaiter(void 0, void 0, void 0, function* () {
        return bloggers_scheme_1.BloggersModel.find()
            .then((result) => result)
            .catch((error) => null);
    }),
    createBlogger: (newBlogger) => __awaiter(void 0, void 0, void 0, function* () {
        const currentBlogger = new bloggers_scheme_1.BloggersModel(newBlogger);
        return currentBlogger.save()
            .then((result) => result)
            .catch(() => null);
    }),
    getCurrentBlogger: (bloggerId) => __awaiter(void 0, void 0, void 0, function* () {
        return bloggers_scheme_1.BloggersModel.findOne({ id: bloggerId })
            .then((result) => result)
            .catch((error) => null);
    }),
    updateBlogger: ({ bloggerId, name, youtubeUrl }) => __awaiter(void 0, void 0, void 0, function* () {
        const currentBlogger = yield exports.bloggersRepository.getCurrentBlogger(bloggerId);
        if (currentBlogger) {
            return bloggers_scheme_1.BloggersModel.updateOne({ id: bloggerId }, {
                $set: {
                    name,
                    youtubeUrl
                }
            })
                .then((result) => result)
                .catch((error) => null);
        }
        else {
            return null;
        }
    }),
    deleteBlogger: (bloggerId) => __awaiter(void 0, void 0, void 0, function* () {
        const currentBlogger = yield exports.bloggersRepository.getCurrentBlogger(bloggerId);
        if (currentBlogger) {
            return bloggers_scheme_1.BloggersModel.deleteOne({ id: bloggerId })
                .then((result) => result)
                .catch((error) => null);
        }
        else {
            return null;
        }
    }),
};
//# sourceMappingURL=bloggers-repository.js.map