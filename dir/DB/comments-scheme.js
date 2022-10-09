"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const commentsSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    userLogin: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    }
}, { timestamps: true });
exports.CommentsModel = mongoose_1.default.model('Comments', commentsSchema);
//# sourceMappingURL=comments-scheme.js.map