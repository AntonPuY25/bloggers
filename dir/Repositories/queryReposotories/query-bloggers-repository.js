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
    getBloggers: ({ searchNameTerm, pageNumber = 1, pageSize = 10, sortBy, sortDirection }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(searchNameTerm, 'searchNameTerm');
        const findOptions = searchNameTerm ? {
            "$or": [{ name: { $regex: searchNameTerm } },
                { name: { $regex: searchNameTerm.toLowerCase() } }]
        }
            : {};
        const skipCount = (pageNumber - 1) * pageSize;
        const skipData = pageNumber ? skipCount : 0;
        const limitData = pageSize;
        const totalCount = yield bloggers_scheme_1.BloggersModel.find(findOptions).count();
        const pagesCount = Math.ceil(Number(totalCount) / pageSize) || 0;
        const sortCreateData = sortBy ? sortBy : 'createdAt';
        const sortDirectionData = sortDirection === 'asc' ? 1 : -1;
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
                    page: Number(pageNumber),
                    pageSize: Number(pageSize),
                    totalCount: Number(totalCount),
                    items,
                };
            }
        })
            .catch((error) => null);
    }),
    getCurrentBlogger: (blogId) => __awaiter(void 0, void 0, void 0, function* () {
        return bloggers_scheme_1.BloggersModel.findOne({ id: blogId })
            .then((result) => result)
            .catch((error) => null);
    }),
};
//# sourceMappingURL=query-bloggers-repository.js.map