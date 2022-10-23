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
exports.registerUsersRepository = void 0;
const register_user_scheme_1 = require("../DB/register-user-scheme");
exports.registerUsersRepository = {
    registerUser(userDb) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new register_user_scheme_1.UsersModel(userDb);
            try {
                const result = yield user.save();
                if (result) {
                    return result;
                }
            }
            catch (e) {
                return null;
            }
        });
    },
};
//# sourceMappingURL=register-repository.js.map