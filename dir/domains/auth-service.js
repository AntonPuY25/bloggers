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
exports.authService = void 0;
const users_repository_1 = require("../Repositories/users-repository");
const helpers_1 = require("../helpers/helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const email_manager_1 = require("../managers/email-manager");
const email_adapter_1 = require("../adapters/email-adapter");
exports.authService = {
    registerUser({ email, login, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield (0, helpers_1.getGeneratedHashPassword)(password, passwordSalt);
            const userDb = {
                id: (0, uuid_1.v4)(),
                userData: {
                    login,
                    password: passwordHash,
                    salt: passwordSalt,
                    email,
                },
                emailConfirmation: {
                    confirmationCode: (0, uuid_1.v4)(),
                    expirationDate: (0, date_fns_1.add)(new Date(), {
                        hours: 1
                    }),
                    isConfirmed: false,
                }
            };
            const currentUser = yield users_repository_1.usersRepository.createUser(userDb);
            if (currentUser) {
                const email = yield email_manager_1.emailManager.getRecoveryMessageEmail(currentUser);
                const sentEmail = yield email_adapter_1.emailAdapter.sendEmail(email);
                if (sentEmail) {
                    return {
                        message: 'Hello'
                    };
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        });
    },
    confirmEmail({ code }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield users_repository_1.usersRepository.getCurrentUserByCode({ code });
            if (currentUser) {
                if (currentUser.emailConfirmation.isConfirmed)
                    return (0, helpers_1.isConfirmedEmailError)('code');
                if (currentUser.emailConfirmation.expirationDate < new Date())
                    return {
                        isError: true,
                        message: (0, helpers_1.isConfirmedEmailError)('code')
                    };
                const updatedUser = yield users_repository_1.usersRepository.confirmEmail(currentUser.id);
                if (updatedUser) {
                    return {
                        isError: false,
                        message: ''
                    };
                }
            }
            else {
                return {
                    isError: true,
                    message: ''
                };
            }
        });
    },
    resendEmail({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield users_repository_1.usersRepository.getCurrentUserByEmail({ email });
            if (currentUser) {
                if (currentUser.emailConfirmation.isConfirmed)
                    return (0, helpers_1.isConfirmedEmailError)('email');
                const email = yield email_manager_1.emailManager.getRecoveryMessageEmail(currentUser);
                const sentEmail = yield email_adapter_1.emailAdapter.sendEmail(email);
                if (sentEmail) {
                    return {
                        isError: false,
                        message: '',
                    };
                }
            }
            else {
                return {
                    isError: true,
                    message: '',
                };
            }
        });
    },
    authUser({ login, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield users_repository_1.usersRepository.getCurrentUser(login);
            if (!currentUser)
                return null;
            const passwordSalt = currentUser.userData.salt;
            const passwordHash = yield (0, helpers_1.getGeneratedHashPassword)(password, passwordSalt);
            if (passwordHash === currentUser.userData.password)
                return currentUser;
            return null;
        });
    }
};
//# sourceMappingURL=auth-service.js.map