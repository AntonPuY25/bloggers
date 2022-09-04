"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloggersModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bloggersSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    youtubeUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    }
}, { timestamps: true });
exports.BloggersModel = mongoose_1.default.model('Bloggers', bloggersSchema);
//# sourceMappingURL=bloggers-scheme.js.map