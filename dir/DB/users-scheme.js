"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const usersSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    userData: {
        login: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    emailConfirmation: {
        confirmationCode: {
            type: String,
            required: true,
        },
        expirationDate: {
            type: String,
            required: true,
        },
        isConfirmed: {
            type: Boolean,
            required: true
        }
    }
}, { timestamps: true });
exports.UsersModel = mongoose_1.default.model('Users', usersSchema);
//# sourceMappingURL=users-scheme.js.map