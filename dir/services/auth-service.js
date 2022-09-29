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
exports.authService = void 0;
const users_repository_1 = require("../Repositories/users-repository");
const helpers_1 = require("../helpers/helpers");
exports.authService = {
    authUser({ login, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield users_repository_1.usersRepository.getCurrentUser(login);
            if (currentUser) {
                const passwordSalt = currentUser.salt;
                const passwordHash = yield (0, helpers_1.getGeneratedHashPassword)(password, passwordSalt);
                if (passwordHash === currentUser.password) {
                    return currentUser;
                }
                return null;
            }
            else {
                return null;
            }
        });
    }
};
//# sourceMappingURL=auth-service.js.map