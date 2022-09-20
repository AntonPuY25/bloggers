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
exports.queryBloggersRepository = void 0;
const bloggers_scheme_1 = require("../../DB/bloggers-scheme");
exports.queryBloggersRepository = {
    getBloggers: () => __awaiter(void 0, void 0, void 0, function* () {
        return bloggers_scheme_1.BloggersModel.find().sort({ "name": -1 })
            .then((result) => {
            if (result) {
                return result.reduce((acc, item) => {
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
        })
            .catch((error) => null);
    }),
    getCurrentBlogger: (bloggerId) => __awaiter(void 0, void 0, void 0, function* () {
        return bloggers_scheme_1.BloggersModel.findOne({ id: bloggerId })
            .then((result) => result)
            .catch((error) => null);
    }),
};
//# sourceMappingURL=query-bloggers-repository.js.map