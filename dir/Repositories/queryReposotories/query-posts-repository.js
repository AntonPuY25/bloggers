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
exports.queryPostsRepository = void 0;
const post_scheme_1 = require("../../DB/post-scheme");
exports.queryPostsRepository = {
    getPosts: ({ blogId, sortBy, sortDirection, pageNumber = 1, pageSize = 10 }) => __awaiter(void 0, void 0, void 0, function* () {
        const postsFilterData = blogId ? { blogId: blogId } : {};
        const skipCount = (pageNumber - 1) * pageSize;
        console.log(sortDirection, 'sortDirection');
        const skipData = pageNumber ? skipCount : 0;
        const limitData = pageSize;
        const totalCount = yield post_scheme_1.PostsModel.find(postsFilterData).count();
        const pagesCount = Math.ceil(Number(totalCount) / pageSize) || 0;
        const sortCreateData = sortBy ? sortBy : 'createdAt';
        const sortDirectionData = sortDirection === 'asc' ? 1 : -1;
        return post_scheme_1.PostsModel.find(postsFilterData).skip(skipData).limit(limitData).sort({
            [sortCreateData]: sortDirectionData
        })
            .then((result) => {
            if (result.length) {
                const items = result.reduce((acc, item) => {
                    const newPost = {
                        id: item.id,
                        title: item.title,
                        shortDescription: item.shortDescription,
                        content: item.content,
                        blogId: item.blogId.toString(),
                        blogName: item.blogName,
                        createdAt: item.createdAt,
                    };
                    acc.push(newPost);
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
            else {
                return null;
            }
        })
            .catch(() => null);
    }),
    getCurrentPost: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        return post_scheme_1.PostsModel.findOne({ id: postId })
            .then((result) => {
            if (result) {
                const responsePost = {
                    id: result.id,
                    createdAt: result.createdAt,
                    content: result.content,
                    shortDescription: result.shortDescription,
                    title: result.title,
                    blogName: result.blogName,
                    blogId: result.blogId.toString(),
                };
                return responsePost;
            }
            else {
                return null;
            }
        })
            .catch((error) => null);
    }),
};
//# sourceMappingURL=query-posts-repository.js.map