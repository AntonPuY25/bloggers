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
exports.usersRepository = void 0;
const users_scheme_1 = require("../DB/users-scheme");
exports.usersRepository = {
    createUser(userDb) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new users_scheme_1.UsersModel(userDb);
            try {
                const result = yield user.save();
                if (result) {
                    return userDb;
                }
            }
            catch (e) {
                return null;
            }
        });
    },
    getCurrentUser(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_scheme_1.UsersModel.find({ login })
                .then((result) => result[0])
                .catch(() => null);
        });
    },
    getCurrentUserByCode({ code }) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_scheme_1.UsersModel.find({ 'emailConfirmation.confirmationCode': code })
                .then((result) => result[0])
                .catch(() => null);
        });
    },
    getCurrentUserByEmail({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_scheme_1.UsersModel.find({ 'userData.email': email })
                .then((result) => result[0])
                .catch(() => null);
        });
    },
    confirmEmail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_scheme_1.UsersModel.updateOne({ id }, {
                $set: {
                    'emailConfirmation.isConfirmed': true
                }
            })
                .then((result) => result)
                .catch(() => null);
        });
    },
};
//# sourceMappingURL=users-repository.js.map