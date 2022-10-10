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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortDirectionData = exports.getSortCreatedData = exports.getPagesCountData = exports.getSkipCountData = exports.getUsersData = exports.getPostsData = exports.getNewResponseBlogger = exports.getBloggersData = exports.getGeneratedHashPassword = exports.getCurrentFieldError = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const getCurrentFieldError = (field, message) => {
    return {
        "errorsMessages": [
            {
                "message": message,
                "field": field
            }
        ]
    };
};
exports.getCurrentFieldError = getCurrentFieldError;
const getGeneratedHashPassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, salt);
});
exports.getGeneratedHashPassword = getGeneratedHashPassword;
const getBloggersData = ({ pageSize, sortBy, sortDirection, pageNumber, searchNameTerm }) => ({
    pageSize: pageSize ? Number(pageSize) : 10,
    pageNumber: pageNumber ? Number(pageNumber) : 1,
    sortBy: sortBy,
    sortDirection: sortDirection,
    searchNameTerm: searchNameTerm
});
exports.getBloggersData = getBloggersData;
const getNewResponseBlogger = (currentBlogger) => ({
    id: currentBlogger.id,
    name: currentBlogger.name,
    youtubeUrl: currentBlogger.youtubeUrl,
    createdAt: currentBlogger.createdAt,
});
exports.getNewResponseBlogger = getNewResponseBlogger;
const getPostsData = ({ pageSize, pageNumber, sortDirection, sortBy }) => ({
    pageSize: pageSize ? Number(pageSize) : 10,
    pageNumber: pageNumber ? Number(pageNumber) : 1,
    sortBy: sortBy,
    sortDirection: sortDirection,
});
exports.getPostsData = getPostsData;
const getUsersData = ({ pageSize, sortBy, sortDirection, searchEmailTerm, searchLoginTerm, pageNumber }) => ({
    pageNumber: pageNumber ? Number(pageNumber) : 1,
    pageSize: pageSize ? Number(pageSize) : 10,
    sortBy: sortBy ? sortBy : 'createdAt',
    sortDirection: sortDirection ? sortDirection : 'desc',
    searchLoginTerm: searchLoginTerm || '',
    searchEmailTerm: searchEmailTerm || '',
});
exports.getUsersData = getUsersData;
const getSkipCountData = (pageNumber, pageSize) => (pageNumber - 1) * pageSize;
exports.getSkipCountData = getSkipCountData;
const getPagesCountData = (totalCount, pageSize) => Math.ceil(Number(totalCount) / pageSize) || 0;
exports.getPagesCountData = getPagesCountData;
const getSortCreatedData = (sortBy) => sortBy ? sortBy : 'createdAt';
exports.getSortCreatedData = getSortCreatedData;
const getSortDirectionData = (sortDirection) => sortDirection === 'asc' ? 1 : -1;
exports.getSortDirectionData = getSortDirectionData;
//# sourceMappingURL=helpers.js.map