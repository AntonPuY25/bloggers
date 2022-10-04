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
exports.usersRepository = void 0;
const users_scheme_1 = require("../DB/users-scheme");
const bcrypt_1 = __importDefault(require("bcrypt"));
const helpers_1 = require("../helpers/helpers");
exports.usersRepository = {
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield (0, helpers_1.getGeneratedHashPassword)(newUser.password, passwordSalt);
            console.log(passwordHash, 'passwordHash');
            const currentUser = new users_scheme_1.UsersModel(Object.assign(Object.assign({}, newUser), { password: passwordHash, salt: passwordSalt }));
            return currentUser.save()
                .then((result) => {
                if (result) {
                    return {
                        id: result.id,
                        email: result.email,
                        login: result.login,
                        createdAt: result.createdAt,
                    };
                }
            })
                .catch(() => null);
        });
    },
    getCurrentUser(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_scheme_1.UsersModel.find({ login })
                .then((result) => result[0])
                .catch(() => null);
        });
    }
};
//# sourceMappingURL=users-repository.js.map