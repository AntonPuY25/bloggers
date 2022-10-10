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
exports.testingRepository = void 0;
const bloggers_scheme_1 = require("../DB/bloggers-scheme");
const post_scheme_1 = require("../DB/post-scheme");
const users_scheme_1 = require("../DB/users-scheme");
const comments_scheme_1 = require("../DB/comments-scheme");
exports.testingRepository = {
    allClear: () => __awaiter(void 0, void 0, void 0, function* () {
        yield bloggers_scheme_1.BloggersModel.deleteMany({});
        yield post_scheme_1.PostsModel.deleteMany({});
        yield users_scheme_1.UsersModel.deleteMany({});
        yield comments_scheme_1.CommentsModel.deleteMany({});
        return {
            success: true
        };
    })
};
//# sourceMappingURL=testing-repository.js.map