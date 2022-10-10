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
const helpers_1 = require("../../helpers/helpers");
exports.queryBloggersRepository = {
    getBloggers: ({ searchNameTerm, pageNumber, pageSize, sortBy, sortDirection }) => __awaiter(void 0, void 0, void 0, function* () {
        const findOptions = searchNameTerm ? {
            $or: [{ name: { $regex: searchNameTerm } },
                { name: { $regex: searchNameTerm.toLowerCase() } }]
        }
            : {};
        const skipCount = (0, helpers_1.getSkipCountData)(pageNumber, pageSize);
        const skipData = pageNumber ? skipCount : 0;
        const limitData = pageSize;
        const totalCount = yield bloggers_scheme_1.BloggersModel.find(findOptions).count();
        const pagesCount = (0, helpers_1.getPagesCountData)(totalCount, pageSize);
        const sortCreateData = (0, helpers_1.getSortCreatedData)(sortBy);
        const sortDirectionData = (0, helpers_1.getSortDirectionData)(sortDirection);
        return bloggers_scheme_1.BloggersModel.find(findOptions).skip(skipData).limit(limitData).sort({
            [sortCreateData]: sortDirectionData
        })
            .then((result) => {
            if (result) {
                const items = result.reduce((acc, item) => {
                    const newBlogger = {
                        id: item.id,
                        name: item.name,
                        youtubeUrl: item.youtubeUrl,
                        createdAt: item.createdAt,
                    };
                    acc.push(newBlogger);
                    return acc;
                }, []);
                return {
                    pagesCount,
                    page: pageNumber,
                    pageSize: pageSize,
                    totalCount: Number(totalCount),
                    items,
                };
            }
        })
            .catch(() => null);
    }),
    getCurrentBlogger: (blogId) => __awaiter(void 0, void 0, void 0, function* () {
        return bloggers_scheme_1.BloggersModel.findOne({ id: blogId })
            .then((result) => result)
            .catch(() => null);
    }),
};
//# sourceMappingURL=query-bloggers-repository.js.map