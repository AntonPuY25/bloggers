"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const postsSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    bloggerId: {
        type: Number,
        required: true,
    },
    bloggerName: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.PostsModel = mongoose_1.default.model('Posts', postsSchema);
//# sourceMappingURL=post-scheme.js.map